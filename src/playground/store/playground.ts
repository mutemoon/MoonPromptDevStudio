import OpenAI from "openai";
import { defineStore } from "pinia";

export type Message = OpenAI.Chat.Completions.ChatCompletionMessageParam;

export type Record = {
  model: string;
  messages: Message[];
  temperature: number;
  max_tokens: number;
  top_p: number;
  createTime: number;
};

export const usePlayground = defineStore("playground", {
  state() {
    return {
      baseURL: "https://api.siliconflow.cn/v1",
      apiKey: "sk-uorpustzcmbizkckpdnqqnfcpxqtfhnjoyzikkwraxgekqlp",
      models: ["Qwen/Qwen2-7B-Instruct"],
      currentModel: "Qwen/Qwen2-7B-Instruct",
      messages: [
        {
          role: "system",
          content: "What models do you want to use?",
        },
      ] as Message[],
      temperature: 0.9,
      max_tokens: 128,
      top_p: 0.9,
      records: [] as Record[],
    };
  },
  getters: {
    client: ({ baseURL, apiKey }) =>
      new OpenAI({ baseURL, apiKey, dangerouslyAllowBrowser: true }),
  },
  actions: {
    async chat() {
      const res = await this.client.chat.completions.create({
        model: this.currentModel,
        messages: this.messages as any,
        temperature: this.temperature,
        max_tokens: this.max_tokens,
        top_p: this.top_p,
      });

      const content = res.choices[0].message.content;

      this.messages.push(res.choices[0].message);

      this.records.push({
        model: this.currentModel,
        messages: JSON.parse(JSON.stringify(this.messages)),
        temperature: this.temperature,
        max_tokens: this.max_tokens,
        top_p: this.top_p,
        createTime: new Date().getTime(),
      });

      return content;
    },
    deleteRecord(index: number) {
      this.records.splice(index, 1);
    },
    clearRecords() {
      this.records = [];
    },
  },
  persist: true,
});
