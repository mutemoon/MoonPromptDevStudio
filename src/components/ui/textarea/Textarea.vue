<script setup lang="ts">
import { onMounted, ref, type HTMLAttributes } from "vue";
import { useEventListener, useVModel } from "@vueuse/core";
import { cn } from "@/lib/utils";

const props = defineProps<{
  class?: HTMLAttributes["class"];
  defaultValue?: string | number;
  modelValue?: string | number;
}>();

const emits = defineEmits<{
  (e: "update:modelValue", payload: string | number): void;
}>();

const modelValue = useVModel(props, "modelValue", emits, {
  passive: true,
  defaultValue: props.defaultValue,
});

const textarea = ref<HTMLTextAreaElement>();
onMounted(() => {
  if (textarea.value) {
    textarea.value.style.height = "1px";
    textarea.value.style.height = textarea.value.scrollHeight + "px";
  }
});
useEventListener(textarea, "input", () => {
  if (!textarea.value) return;
  textarea.value.style.height ="1px";
  textarea.value.style.height = textarea.value.scrollHeight + "px";
});
</script>

<template>
  <textarea
    ref="textarea"
    v-model="modelValue"
    :class="
      cn(
        'flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        props.class
      )
    "
  />
</template>
