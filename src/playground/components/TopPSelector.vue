<script setup lang="ts">
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

defineProps<{
  modelValue: number;
}>();

defineEmits(["update:model-value"]);
</script>

<template>
  <div class="grid gap-2 pt-2">
    <HoverCard :open-delay="200">
      <HoverCardTrigger as-child>
        <div class="grid gap-4">
          <div class="flex items-center justify-between">
            <Label for="top-p">Top P</Label>
            <span
              class="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border"
            >
              {{ modelValue }}
            </span>
          </div>
          <Slider
            id="top-p"
            :model-value="[modelValue]"
            @update:model-value="$emit('update:model-value', $event?.[0])"
            :max="1"
            :step="0.1"
            class="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
            aria-label="Top P"
          />
        </div>
      </HoverCardTrigger>
      <HoverCardContent align="start" class="w-[260px] text-sm" side="left">
        Control diversity via nucleus sampling: 0.5 means half of all
        likelihood-weighted options are considered.
      </HoverCardContent>
    </HoverCard>
  </div>
</template>
