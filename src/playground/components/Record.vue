<template>
  <Card class="w-full">
    <CardHeader class="flex flex-row items-center justify-between">
      <Badge>{{ new Date(record.createTime).toLocaleString() }}</Badge>
      <Button variant="link" size="icon" @click="$emit('delete', record)">
        <XIcon :size="16"></XIcon>
      </Button>
    </CardHeader>
    <CardContent class="space-y-2">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Prompt</AccordionTrigger>
          <AccordionContent>
            <pre
              class="p-3 rounded-md bg-secondary text-wrap"
              style="overflow-wrap: anywhere"
              >{{ record.prompt }}</pre
            >
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <pre
        class="p-3 rounded-md bg-foreground text-background text-wrap"
        style="overflow-wrap: anywhere"
        >{{ record.output }}</pre
      >
    </CardContent>
    <CardFooter class="space-x-2">
      <Badge>temperature: {{ record.temperatue }}</Badge>
      <Badge>max_tokens: {{ record.max_tokens }}</Badge>
      <Badge>top_p: {{ record.top_p }}</Badge>
    </CardFooter>
  </Card>
</template>

<script setup lang="ts">
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { XIcon } from "lucide-vue-next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TRecord } from "../machine";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

defineEmits(["delete"]);
defineProps<{ record: TRecord }>();
</script>

<style></style>
