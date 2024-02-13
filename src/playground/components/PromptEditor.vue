<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ref, watch } from "vue";
import { PlusCircledIcon } from "@radix-icons/vue";
import { Badge } from "@/components/ui/badge";
import { XIcon } from "lucide-vue-next";

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

  actionResponseStart: string;
  actionResponseEnd: string;
}>();

const emit = defineEmits<{
  submit: [];
  "update:model-value": [value: string];
}>();

type TMessage = {
  role: "system" | "user" | "assistant" | "action response";
  content: string;
};

const messages = ref<Array<TMessage>>([]);

function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function extractMessages(value: string) {
  const tmpMsgs: TMessage[] = [];

  const regex = new RegExp(
    `(${escapeRegExp(props.systemStart)}|${escapeRegExp(
      props.userStart
    )}|${escapeRegExp(props.assistantStart)}|${escapeRegExp(
      props.actionResponseStart
    )})([\\s\\S]*?)(${escapeRegExp(props.systemEnd)}|${escapeRegExp(
      props.userEnd
    )}|${escapeRegExp(props.assistantEnd)}|${escapeRegExp(
      props.actionResponseEnd
    )})`,
    "g"
  );
  let match;
  while ((match = regex.exec(value))) {
    tmpMsgs.push({
      role:
        match[1] === props.systemStart
          ? "system"
          : match[1] === props.userStart
          ? "user"
          : match[1] === props.assistantStart
          ? "assistant"
          : "action response",
      content: match[2],
    });
  }
  return tmpMsgs;
}

watch(
  () => props.modelValue,
  (value) => {
    messages.value = extractMessages(value);
  },
  {
    immediate: true,
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
      } else if (message.role === "action response") {
        return `${props.actionResponseStart}${message.content}${props.actionResponseEnd}`;
      }
    });
    let value = transform.join("\n") + props.assistantStart;
    emit("update:model-value", value);
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
    <TabsContent value="chat" class="space-y-2">
      <div v-for="(message, index) in messages" :key="index">
        <!-- <template v-if="message.role === 'system'">
          <Textarea v-model="message.content"></Textarea>
        </template>
        <template v-if="message.role === 'user'">
          <Textarea v-model="message.content"></Textarea>
        </template>
        <template v-if="message.role === 'assistant'">
        </template> -->
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <span>{{ index + 1 }}</span>
            <Badge>{{ message.role }}</Badge>
          </div>
          <Button
            variant="link"
            @click="messages.splice(messages.indexOf(message), 1)"
          >
            <XIcon :size="12" />
          </Button>
        </div>
        <Textarea
          v-model="message.content"
        ></Textarea>
      </div>
      <Button
        variant="outline"
        @click="messages.push({ role: 'system', content: '' })"
        ><PlusCircledIcon class="mx-1" />System Message</Button
      >
      <Button
        variant="outline"
        @click="messages.push({ role: 'user', content: '' })"
        ><PlusCircledIcon class="mx-1" />User Message</Button
      >
      <Button
        variant="outline"
        @click="messages.push({ role: 'assistant', content: '' })"
        ><PlusCircledIcon class="mx-1" />Assistant Message</Button
      >
      <Button
        variant="outline"
        @click="messages.push({ role: 'action response', content: '' })"
        ><PlusCircledIcon class="mx-1" />Action Response</Button
      >
    </TabsContent>
  </Tabs>
</template>
