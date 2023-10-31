<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useDetteStore } from "~/store/dette";

const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    id: number;
    fromValidationPage?: boolean;
  }>(),
  { fromValidationPage: false }
);
const emit = defineEmits<{ (event: "update:modelValue", payload: boolean): void }>();
const { dialog } = useDialogModelValue(props, emit);

const { dette, loading } = storeToRefs(useDetteStore());
const { getOne, valider } = useDetteStore();
await getOne(props.id);
const handleValidate = () => {
  ElMessageBox.confirm(
    `Cette action est irréversible, voulez réelement valider la dette ${dette.value?.code}?`,
    "Attention",
    {
      confirmButtonText: "Confirmer",
      cancelButtonText: "Abandonner",
      type: "warning",
    }
  ).then(() => {
    valider(dette.value?.id!, props.fromValidationPage).then((message) => {
      ElNotification.success({ title: "succès", message });
      dialog.value = false;
    });
  });
};
</script>

<template>
  <el-dialog v-model="dialog" title="Détails de dette" width="40%" destroy-on-close center>
    <div v-loading="loading.edit">
      <div class="d-flex flex-row-reverse">
        <el-button
          v-if="dette?.status === statusValidable.wait"
          @click="handleValidate"
          type="primary"
          text
          >valider cette dette</el-button
        >
      </div>
      <el-scrollbar :max-height="400">
        <el-divider class="mt-0" />
        <DetteDescriptionComponent :dette="dette" />
      </el-scrollbar>
    </div>
  </el-dialog>
</template>

<style scoped></style>
