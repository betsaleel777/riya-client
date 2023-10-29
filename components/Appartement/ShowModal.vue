<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useAppartementStore } from "~/store/appartement";

const props = defineProps<{ modelValue: boolean; id: number }>();
const emit = defineEmits<{ (event: "update:modelValue", payload: boolean): void }>();
const { dialog } = useDialogModelValue(props, emit);

const { appartement, loading } = storeToRefs(useAppartementStore());
const { getOne } = useAppartementStore();
getOne(props.id);
</script>

<template>
  <el-dialog v-model="dialog" title="Détails d'appartement" width="50%" destroy-on-close center>
    <div v-loading="loading.edit">
      <AppartementDescriptionComponent :appartement="appartement" />
    </div>
  </el-dialog>
</template>

<style scoped></style>
