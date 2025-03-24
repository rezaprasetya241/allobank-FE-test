<template>
  <div>
    <v-text-field
      :model-value="props.modelValue"
      :placeholder="props.placeholder"
      :height="props.height"
      :color="props.color"
      :outlined="props.outlined"
      :flat="props.flat"
      :dense="props.dense"
      :width="props.width"
      hide-details
      solo
      @input="debounceInput"
    >
      <template #prepend-inner>
        <v-icon class="mt-1">mdi-magnify</v-icon>
      </template>
    </v-text-field>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "Search...",
  },
  height: {
    type: String,
    default: "44px",
  },
  color: {
    type: String,
    default: "#667085",
  },
  outlined: {
    type: Boolean,
    default: true,
  },
  flat: {
    type: Boolean,
    default: true,
  },
  dense: {
    type: Boolean,
    default: true,
  },
  width: {
    type: String,
    default: "300px",
  },
  debounceTime: {
    type: Number,
    default: 300,
  },
});

const emit = defineEmits(["update:modelValue"]);

let timeout: ReturnType<typeof setTimeout>;

const debounceInput = (event: Event) => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    const target = event.target as HTMLInputElement;
    emit("update:modelValue", target.value);
  }, props.debounceTime);
};
</script>
