<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useDetteStore } from "~/store/dette";

const props = withDefaults(
  defineProps<{ modelValue: boolean; id: number; fromValidationPage?: boolean }>(),
  { fromValidationPage: false }
);
const emit = defineEmits<{ (event: "update:modelValue", payload: boolean): void }>();
const { dialog } = useDialogModelValue(props, emit);
</script>

<template>
  <div>Component: Dette/ShowModal</div>
</template>

<style scoped></style>
