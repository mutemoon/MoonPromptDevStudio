<script setup lang="ts">
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircledIcon } from "@radix-icons/vue";
import { XIcon } from "lucide-vue-next";
import { storeToRefs } from "pinia";
import { usePlayground } from "../store";
import Accordion from "@/components/ui/accordion/Accordion.vue";

const playground = usePlayground();
const { messages } = storeToRefs(playground);

function submit() {
  playground.chat();
}
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
      <Button @click="submit">Submit</Button>
    </div>

    <TabsContent value="instruct">
      <!-- <Textarea
        :model-value="modelValue"
        @update:model-value="$emit('update:model-value', `${$event}`)"
        placeholder="Hello there, can you help me with my order?"
        class="min-h-[300px]"
        :class="{
          'focus-visible:outline-green-400': isIdle,
          'focus-visible:outline-red-400': isWaiting,
          'focus-visible:outline-yellow-400': isTyping,
        }"
      /> -->
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
            <span>{{ index + 1 }}.</span>
            <Badge>{{ message.role }}</Badge>
          </div>
          <Button
            variant="link"
            @click="messages.splice(messages.indexOf(message), 1)"
          >
            <XIcon :size="12" />
          </Button>
        </div>
        <Accordion type="single">
          <AccordionItem>
            <Textarea v-model="message.content"></Textarea>
          </AccordionItem>
        </Accordion>
      </div>
      <div class="flex flex-wrap gap-2">
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
          @click="messages.push({ role: 'assistant', content: '' })"
          ><PlusCircledIcon class="mx-1" />Action Response</Button
        >
        <Button @click="playground.chat()">Submit</Button>
      </div>
    </TabsContent>
  </Tabs>
</template>
