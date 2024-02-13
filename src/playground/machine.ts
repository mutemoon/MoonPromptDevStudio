import { assign, enqueueActions, fromPromise, setup } from "xstate";
import { OpenAI } from "openai";
import { produce } from "immer";

export const client = new OpenAI({
  baseURL: "http://47.116.115.158:9098/v1",
  apiKey: "YOUR_API_KEY",
  dangerouslyAllowBrowser: true,
});

export type TRecord = {
  prompt: string;
  output: string;

  temperatue: number;
  max_tokens: number;
  top_p: number;

  createTime: number;
};

type IConfig = {
  models: string[];
  selectedModel: string;
  temperature: number;
  max_tokens: number;
  top_p: number;
};

type IContext = {
  prompt: string;
  records: TRecord[];
} & IConfig;

export default setup({
  types: {
    events: {} as
      | ({ type: "user.config.set" } & Partial<IConfig>)
      | { type: "user.prompt.input"; value: string }
      | { type: "user.result.delete"; index: number }
      | { type: "user.result.delete.all" }
      | { type: "user.submit" },
    context: {} as IContext,
  },
  actions: {
    setPrompt: assign({
      prompt: ({ context, event }) =>
        event.type == "user.prompt.input" ? event.value : context.prompt,
    }),
  },
  actors: {
    chat: fromPromise<TRecord, IContext>(async ({ input }) => {
      const models = await client.models.list()
      const startTime = Date.now();
      const res = await client.completions.create({
        model: input.selectedModel,
        prompt: input.prompt,
        max_tokens: input.max_tokens,
        temperature: input.temperature,
        top_p: input.top_p,
        stop: "<|im_end|>",
      });
      let output = res.choices[0].text;
      const endTime = Date.now();
      console.log(`Time elapsed: ${(endTime - startTime) / 1000}`);
      // console.log((res.usage?.completion_tokens || 0) / ((endTime - startTime) / 1000));

      return {
        prompt: input.prompt,
        output,
        createTime: Date.now(),
        temperatue: input.temperature,
        max_tokens: input.max_tokens,
        top_p: input.top_p,
      };
    }),
  },
  guards: {
    shouldSend: ({ context }) => {
      return context.selectedModel !== "" && context.prompt !== "";
    },
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QAcA2BDAnlATgewFcA7CAYgNjBwDoc4DUAXaiMVMRsAbQAYBdRCjywAloxF4igkAA9EAFgCcPagA4AbD3XrFAJnXyeARg0B2ADQhMiXT13UArEZ4BmRS4fblblwF9flmhYuIQk5JQ0dLAMzKzsnNToqKi8AkggyMJiElLpcgjyqiry6h4uqrq6pp5G8pbWCM6m1LoOTorqpqou8u3q-oEY2PjEZBRU1ADGkgBmIlDUlIyp0pmi4pLS+Q48KlqlHS7OqkYOivWIRroDGUMho9SMmMhg1ER4jAAET8giRFDhCbIfAAW2QzD+yAIy34qyyG1yoHyujcaiuO0qphcLh4pl0FwQ1Qcjj0Lm0Thxp36AVuwRGJEez1e7y+Pz+APGNGiACMQWIVuk1tlNnkbKiTq07FVsbj8VZEJ4VEcXFiKoUsdobkFhqEIIyXvr2YCaMC8GCIUQoTC0kJ1jktgodNRyroitUTuojIoHAT1EVqKYvYpVIp5LpvaZFEYtXd6Xqfq82f9SDJYIx0Al0DNODgABTOXYASlI2vuDIThv+AttwsRskQ6k8jgceIqxm9SlUBK69iOpnUrV0Yc9WJjdN1+teAHd0Nl-p8opkiJRSBBJK8-gA3PAAa1epbjk+oM7nUAXcCXlAQW7wkwzOVS1Yy8PtosJBgDWPkKsbFI8BOUFRKnKT1ySxFExx1B4KxPcR50XSQV1TdNM2zKh812IsS1jCcYNnOCzwQ5duFhQUXxFJFEFMQM1B4Ep3C8E4NAJeR5CMag2NqVpFHcNsHEgst4yZSsAWQjNXizHMMKwg9cOEpMoC4IwbWfO0KPrBBlWoXYvTxHpTgcDR1F9IwXGoIxagHAyqTo-waXeVh4EFHDRjhNS63yABaL0CX0dQA0bbRXF-YNWgEw8Ezc2sHQQcMCQ8eRtNUVQHG-IxI1MHhQ3CuSDRZb5nnZKKERi6iAJ4VRP3DFxdFqMkjE6HLoPkwr-mK19KIQHYzJROjND0ft3DqeVCX9RRqhMKycSOaMaVk5qDVg9lz1gS8wHa9T8ijFQdEjWoWw8fZu3kZpUtcOxDP7K5qX8IA */
  id: "playground",
  context: {
    models: ["/app/MiniCPM-2B-dpo-bf16-vllm", "internlm2-chat-1_8b", "internlm2-chat-7b"],
    selectedModel: "internlm2-chat-1_8b",
    prompt: "",
    temperature: 0.9,
    max_tokens: 128,
    top_p: 0.9,
    records: [],
  },
  on: {
    "user.result.delete": {
      actions: assign({
        records: ({ context, event }) =>
          produce(context.records, (draft) => {
            draft.splice(event.index, 1);
          }),
      }),
    },
    "user.result.delete.all": {
      actions: assign({
        records: [],
      }),
    },
    "user.config.set": {
      actions: assign(({ context, event }) =>
        produce(context, (draft) => {
          draft.temperature = event.temperature ?? context.temperature;
          draft.max_tokens = event.max_tokens ?? context.max_tokens;
          draft.top_p = event.top_p ?? context.top_p;
          draft.selectedModel = event.selectedModel ?? context.selectedModel;
          draft.models = event.models ?? context.models;
        })
      ),
    },
  },
  states: {
    type: {
      states: {
        "not typing": {
          on: {
            "user.prompt.input": {
              target: "typing",
              actions: "setPrompt",
            },

            "user.submit": "waiting response",
          },
        },

        typing: {
          on: {
            "user.prompt.input": {
              target: "typing",
              actions: "setPrompt",
              reenter: true,
            },
          },
          after: {
            1000: [
              {
                target: "waiting response",
                guard: "shouldSend",
              },
              {
                target: "not typing",
              },
            ],
          },
        },

        "waiting response": {
          invoke: {
            src: "chat",

            onDone: {
              target: "not typing",
              actions: assign({
                records: ({ context, event }) => {
                  return [event.output, ...context.records];
                },
              }),
            },

            input: ({ context }) => context,
          },
          after: {
            10000: "not typing",
          },
        },
      },

      initial: "not typing",
    },
  },
  type: "parallel",
});
