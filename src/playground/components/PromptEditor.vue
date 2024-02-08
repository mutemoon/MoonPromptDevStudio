<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ref, watch } from "vue";

const props = defineProps<{
  modelValue: string;
  isIdle: boolean;
  isTyping: boolean;
  isWaiting: boolean;

  systemStart: string;
  systemEnd: string;

  userStart: string;
  userEnd: string;

  assistantStart: string;
  assistantEnd: string;
}>();

const emit = defineEmits<{
  submit: [];
  "update:model-value": [value: string];
}>();
type TMessage = { role: "system" | "user" | "assistant"; content: string };
const messages = ref<Array<TMessage>>([]);
function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function extractMessages(value: string) {
  const messageTypes = [
    { role: "system", start: props.systemStart, end: props.systemEnd },
    { role: "user", start: props.userStart, end: props.userEnd },
    { role: "assistant", start: props.assistantStart, end: props.assistantEnd },
  ] as const;

  const tmpMsgs: TMessage[] = [];

  messageTypes.forEach(({ role, start, end }) => {
    const regex = new RegExp(`${escapeRegExp(start)}([\\s\\S]*?)${escapeRegExp(end)}`, "g");
    let match;
    while ((match = regex.exec(value))) {
      tmpMsgs.push({
        role,
        content: match[1],
      });
    }
  });

  return tmpMsgs;
}

watch(
  () => props.modelValue,
  (value) => {
    messages.value = extractMessages(value);
  }
);

watch(
  messages,
  (messages) => {
    const transform = messages.map((message) => {
      if (message.role === "system") {
        return `${props.systemStart}${message.content}${props.systemEnd}`;
      } else if (message.role === "user") {
        return `${props.userStart}${message.content}${props.userEnd}`;
      } else if (message.role === "assistant") {
        return `${props.assistantStart}${message.content}${props.assistantEnd}`;
      }
    });
    emit("update:model-value", transform.join(""));
  },
  {
    deep: true,
  }
);
</script>

<template>
  <Tabs default-value="chat" class="flex-1">
    <div class="flex justify-between">
      <TabsList class="grid grid-cols-2">
        <TabsTrigger value="instruct">Instruct</TabsTrigger>
        <TabsTrigger value="chat">Chat</TabsTrigger>
      </TabsList>
      <div class="flex justify-between">
        <div class="flex items-center space-x-2">
          <Label for="instruct-mode">Chat Mode</Label>
          <Switch id="instruct-mode" />
        </div>
      </div>
      <Button @click="$emit('submit')">Submit</Button>
    </div>

    <TabsContent value="instruct">
      <Textarea
        :model-value="modelValue"
        @update:model-value="$emit('update:model-value', `${$event}`)"
        placeholder="Hello there, can you help me with my order?"
        class="min-h-[300px]"
        :class="{
          'focus-visible:outline-green-400': isIdle,
          'focus-visible:outline-red-400': isWaiting,
          'focus-visible:outline-yellow-400': isTyping,
        }"
      />
    </TabsContent>
    <TabsContent value="chat">
      <div v-for="message in messages">
        <template v-if="message.role === 'system'">
          <Textarea v-model="message.content"></Textarea>
        </template>
        <template v-if="message.role === 'user'">
          <Textarea v-model="message.content"></Textarea>
        </template>
        <template v-if="message.role === 'assistant'">
          <Textarea v-model="message.content"></Textarea>
        </template>
      </div>
    </TabsContent>
  </Tabs>
</template>
