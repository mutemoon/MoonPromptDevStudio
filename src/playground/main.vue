<script setup lang="ts">
import CodeViewer from "./components/CodeViewer.vue";
import MaxLengthSelector from "./components/MaxLengthSelector.vue";
import ModelSelector from "./components/ModelSelector.vue";
import PresetActions from "./components/PresetActions.vue";
import PresetSave from "./components/PresetSave.vue";
import PresetSelector from "./components/PresetSelector.vue";
import PresetShare from "./components/PresetShare.vue";
import TemperatureSelector from "./components/TemperatureSelector.vue";
import TopPSelector from "./components/TopPSelector.vue";

import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { CounterClockwiseClockIcon } from "@radix-icons/vue";

import Record from "./components/Record.vue";
import machine from "./machine";
import { useMachine } from "@xstate/vue";

const localStorageSnapshotJson = localStorage.getItem("snapshot");
const localStorageSnapshot = localStorageSnapshotJson
  ? JSON.parse(localStorageSnapshotJson)
  : undefined;

console.log(localStorageSnapshot?.value);

const { send, snapshot, actorRef } = useMachine(machine, {
  snapshot: localStorageSnapshot,
});

actorRef.subscribe((snapshot) => {
  const snapshotCanJSON: any = snapshot.toJSON();
  snapshotCanJSON.value = { type: "not typing" };
  localStorage.setItem("snapshot", JSON.stringify(snapshotCanJSON));
});

function handleInput(value: string | number) {
  send({ type: "user.prompt.input", value: `${value}` });
}
</script>

<template>
  <div class="md:hidden">
    <VPImage
      alt="Playground"
      width="1280"
      height="1214"
      class="block"
      :image="{
        dark: '/examples/playground-dark.png',
        light: '/examples/playground-light.png',
      }"
    />
  </div>

  <div class="flex-col hidden h-full md:flex">
    <div
      class="container flex flex-col items-start justify-between py-4 space-y-2 sm:flex-row sm:items-center sm:space-y-0 md:h-16"
    >
      <h2 class="text-lg font-semibold">Playground</h2>
      <div class="flex w-full ml-auto space-x-2 sm:justify-end">
        <PresetSelector presets="{presets}" />
        <PresetSave />
        <div class="hidden space-x-2 md:flex">
          <CodeViewer />
          <PresetShare />
        </div>
        <PresetActions />
      </div>
    </div>
    <Separator />
    <Tabs default-value="insert" class="flex-1">
      <div class="container h-full py-6">
        <div
          class="grid h-full items-stretch gap-6 md:grid-cols-[minmax(0,1fr)_200px]"
        >
          <div class="flex-col hidden space-y-4 sm:flex md:order-2">
            <div class="grid gap-2">
              <HoverCard :open-delay="200">
                <HoverCardTrigger as-child>
                  <span
                    class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Mode
                  </span>
                </HoverCardTrigger>
                <HoverCardContent class="w-[320px] text-sm" side="left">
                  Choose the interface that best suits your task. You can
                  provide: a simple prompt to complete, starting and ending text
                  to insert a completion within, or some text with instructions
                  to edit it.
                </HoverCardContent>
              </HoverCard>
              <TabsList class="grid grid-cols-3">
                <TabsTrigger value="complete">
                  <span class="sr-only">Complete</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="none"
                    class="w-5 h-5"
                  >
                    <rect
                      x="4"
                      y="3"
                      width="12"
                      height="2"
                      rx="1"
                      fill="currentColor"
                    />
                    <rect
                      x="4"
                      y="7"
                      width="12"
                      height="2"
                      rx="1"
                      fill="currentColor"
                    />
                    <rect
                      x="4"
                      y="11"
                      width="3"
                      height="2"
                      rx="1"
                      fill="currentColor"
                    />
                    <rect
                      x="4"
                      y="15"
                      width="3"
                      height="2"
                      rx="1"
                      fill="currentColor"
                    />
                    <rect
                      x="8.5"
                      y="11"
                      width="3"
                      height="2"
                      rx="1"
                      fill="currentColor"
                    />
                    <rect
                      x="8.5"
                      y="15"
                      width="3"
                      height="2"
                      rx="1"
                      fill="currentColor"
                    />
                    <rect
                      x="13"
                      y="11"
                      width="3"
                      height="2"
                      rx="1"
                      fill="currentColor"
                    />
                  </svg>
                </TabsTrigger>
                <TabsTrigger value="insert">
                  <span class="sr-only">Insert</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="none"
                    class="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M14.491 7.769a.888.888 0 0 1 .287.648.888.888 0 0 1-.287.648l-3.916 3.667a1.013 1.013 0 0 1-.692.268c-.26 0-.509-.097-.692-.268L5.275 9.065A.886.886 0 0 1 5 8.42a.889.889 0 0 1 .287-.64c.181-.17.427-.267.683-.269.257-.002.504.09.69.258L8.903 9.87V3.917c0-.243.103-.477.287-.649.183-.171.432-.268.692-.268.26 0 .509.097.692.268a.888.888 0 0 1 .287.649V9.87l2.245-2.102c.183-.172.432-.269.692-.269.26 0 .508.097.692.269Z"
                      fill="currentColor"
                    />
                    <rect
                      x="4"
                      y="15"
                      width="3"
                      height="2"
                      rx="1"
                      fill="currentColor"
                    />
                    <rect
                      x="8.5"
                      y="15"
                      width="3"
                      height="2"
                      rx="1"
                      fill="currentColor"
                    />
                    <rect
                      x="13"
                      y="15"
                      width="3"
                      height="2"
                      rx="1"
                      fill="currentColor"
                    />
                  </svg>
                </TabsTrigger>
                <TabsTrigger value="edit">
                  <span class="sr-only">Edit</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="none"
                    class="w-5 h-5"
                  >
                    <rect
                      x="4"
                      y="3"
                      width="12"
                      height="2"
                      rx="1"
                      fill="currentColor"
                    />
                    <rect
                      x="4"
                      y="7"
                      width="12"
                      height="2"
                      rx="1"
                      fill="currentColor"
                    />
                    <rect
                      x="4"
                      y="11"
                      width="3"
                      height="2"
                      rx="1"
                      fill="currentColor"
                    />
                    <rect
                      x="4"
                      y="15"
                      width="4"
                      height="2"
                      rx="1"
                      fill="currentColor"
                    />
                    <rect
                      x="8.5"
                      y="11"
                      width="3"
                      height="2"
                      rx="1"
                      fill="currentColor"
                    />
                    <path
                      d="M17.154 11.346a1.182 1.182 0 0 0-1.671 0L11 15.829V17.5h1.671l4.483-4.483a1.182 1.182 0 0 0 0-1.671Z"
                      fill="currentColor"
                    />
                  </svg>
                </TabsTrigger>
              </TabsList>
            </div>
            <ModelSelector
              :model-value="snapshot.context.selectedModel"
              @update:model-value="
                send({ type: 'user.config.set', selectedModel: $event })
              "
              :models="snapshot.context.models"
            />
            <TemperatureSelector
              :model-value="[snapshot.context.temperature]"
              @update:model-value="
                send({ type: 'user.config.set', temperature: $event[0] })
              "
            />
            <MaxLengthSelector
              :model-value="[snapshot.context.max_tokens]"
              @update:model-value="
                send({ type: 'user.config.set', max_tokens: $event[0] })
              "
            />
            <TopPSelector
              :model-value="[snapshot.context.top_p]"
              @update:model-value="
                send({ type: 'user.config.set', top_p: $event[0] })
              "
            />
          </div>
          <div class="md:order-1">
            <TabsContent value="complete" class="p-0 mt-0 border-0">
              <div class="flex flex-col h-full space-y-4">
                <Textarea
                  @update:model-value="handleInput"
                  :model-value="snapshot.context.prompt"
                  placeholder="Write a tagline for an ice cream shop"
                  class="min-h-[400px] flex-1 p-4 md:min-h-[700px] lg:min-h-[700px]"
                />
                <div class="flex items-center space-x-2">
                  <Button>Submit</Button>
                  <Button variant="secondary">
                    <span class="sr-only">Show history</span>
                    <CounterClockwiseClockIcon class="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="insert" class="p-0 mt-0 space-y-2 border-0">
              <div class="flex flex-row space-x-2">
                <Button @click="send({ type: 'user.submit' })">Submit</Button>
                <Button @click="send({ type: 'user.result.delete.all' })"
                  >Clear</Button
                >
              </div>
              <div class="flex flex-col space-y-4">
                <div class="flex h-full">
                  <div class="grid w-1/2 h-full grid-rows-1 gap-6">
                    <Textarea
                      @update:model-value="handleInput"
                      :model-value="snapshot.context.prompt"
                      placeholder="We're writing to [inset]. Congrats from OpenAI!"
                      class="min-h-[300px]"
                      :class="{
                        'border-green-400': snapshot.matches({
                          type: 'not typing',
                        }),
                      }"
                    />
                  </div>
                  <div class="grid w-1/2 h-full grid-rows-1 gap-6">
                    <Record
                      v-for="(record, index) in snapshot.context.records"
                      :record="record"
                      @delete="send({ type: 'user.result.delete', index })"
                    ></Record>
                  </div>
                </div>
                <!-- <div class="flex items-center space-x-2">
                  <Button variant="secondary">
                    <span class="sr-only">Show history</span>
                    <CounterClockwiseClockIcon class="w-4 h-4" />
                  </Button>
                </div> -->
              </div>
            </TabsContent>
            <TabsContent value="edit" class="p-0 mt-0 border-0">
              <div class="flex flex-col space-y-4">
                <div class="grid h-full gap-6 lg:grid-cols-2">
                  <div class="flex flex-col space-y-4">
                    <div class="flex flex-col flex-1 space-y-2">
                      <Label for="input">Input</Label>
                      <Textarea
                        id="input"
                        placeholder="We is going to the market."
                        class="flex-1 lg:min-h-[580px]"
                      />
                    </div>
                    <div class="flex flex-col space-y-2">
                      <Label for="instructions">Instructions</Label>
                      <Textarea
                        id="instructions"
                        placeholder="Fix the grammar."
                      />
                    </div>
                  </div>
                  <div
                    class="mt-[21px] min-h-[400px] rounded-md border bg-muted lg:min-h-[700px]"
                  />
                </div>
                <div class="flex items-center space-x-2">
                  <Button>Submit</Button>
                  <Button variant="secondary">
                    <span class="sr-only">Show history</span>
                    <CounterClockwiseClockIcon class="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </TabsContent>
          </div>
        </div>
      </div>
    </Tabs>
  </div>
</template>