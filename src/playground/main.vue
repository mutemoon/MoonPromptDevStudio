<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { CounterClockwiseClockIcon } from "@radix-icons/vue";
import { storeToRefs } from "pinia";
import MaxLengthSelector from "./components/MaxLengthSelector.vue";
import ModelSelector from "./components/ModelSelector.vue";
import PresetActions from "./components/PresetActions.vue";
import PresetSelector from "./components/PresetSelector.vue";
import PromptEditor from "./components/PromptEditor.vue";
import Record from "./components/Record.vue";
import TemperatureSelector from "./components/TemperatureSelector.vue";
import TopPSelector from "./components/TopPSelector.vue";
import { usePlayground } from "./store";

const playground = usePlayground();
const { currentModel, records, temperature, max_tokens, top_p } =
  storeToRefs(playground);
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

  <div class="flex-col h-full md:flex">
    <div class="flex flex-row items-center justify-between px-4 py-2">
      <h2 class="text-lg font-semibold">Moon Prompt Dev Studio</h2>
      <div class="flex space-x-2 sm:justify-end">
        <PresetSelector presets="{presets}" />
        <!-- <div class="hidden space-x-2 sm:flex">
          <PresetSave />
          <CodeViewer />  
          <PresetShare />
        </div> -->
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
            <ModelSelector v-model="currentModel" :models="playground.models" />
            <TemperatureSelector v-model="temperature" />
            <MaxLengthSelector v-model="max_tokens" />
            <TopPSelector v-model="top_p" />
          </div>
          <div class="md:order-1">
            <TabsContent value="complete" class="p-0 mt-0 border-0">
              <div class="flex flex-col h-full space-y-4">
                <Textarea
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
              <div class="flex flex-row space-x-2"></div>
              <div class="flex flex-col space-y-4">
                <div class="flex items-end h-full space-x-2">
                  <div class="grid w-1/2 h-full grid-rows-1 gap-2">
                    <PromptEditor></PromptEditor>
                  </div>
                  <div class="grid w-1/2 h-full grid-rows-1 gap-2">
                    <Button @click="playground.clearRecords()" class="w-fit">
                      Clear
                    </Button>
                    <Record
                      v-for="(record, index) in records"
                      :record="record"
                      @delete="playground.deleteRecord(index)"
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
