<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

defineProps<{
  models: string[];
  modelValue: string;
}>();

defineEmits(["update:model-value"]);
</script>

<template>
  <Select
    :model-value="modelValue"
    @update:model-value="$emit('update:model-value', $event)"
  >
    <SelectTrigger>
      <SelectValue placeholder="Select a model" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem v-for="model in models" :value="model">{{
          model
        }}</SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
