<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { usePersonneStore } from "~/store/personne";

const props = defineProps<{ modelValue: boolean; id: number }>();
const emit = defineEmits<{ (event: "update:modelValue", payload: boolean): void }>();
const { dialog } = useDialogModelValue(props, emit);

const { client, loading } = storeToRefs(usePersonneStore());
const { getOne } = usePersonneStore();
getOne(props.id);
</script>

<template>
  <el-dialog v-model="dialog" title="Détails du client" width="50%" destroy-on-close center>
    <div v-loading="loading.edit">
      <PersonneDescriptionComponent :personne="client" />
    </div>
  </el-dialog>
</template>

<style scoped></style>
