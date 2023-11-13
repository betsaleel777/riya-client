<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useDepenseStore } from "~/store/depense";

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

const { depense, loading } = storeToRefs(useDepenseStore());
const { getOne, validate } = useDepenseStore();

getOne(props.id);
const handleValidate = () => {
  ElMessageBox.confirm(
    `Cette action est irréversible, voulez réelement valider la dépense ${depense.value?.titre} ?`,
    "Attention",
    {
      confirmButtonText: "Confirmer",
      cancelButtonText: "Abandonner",
      type: "warning",
    }
  ).then(() => {
    validate(depense.value?.id!, props.fromValidationPage).then((message) => {
      ElNotification.success({ title: "succès", message });
      dialog.value = false;
    });
  });
};
</script>

<template>
  <el-dialog v-model="dialog" title="Détails des dépenses" width="45%" destroy-on-close center>
    <div v-loading="loading.edit">
      <div class="d-flex flex-row-reverse">
        <el-button
          v-if="depense?.status === statusValidable.wait"
          @click="handleValidate"
          type="primary"
          text
          >valider cette dépense</el-button
        >
      </div>
      <el-divider class="mt-0" />
      <DepenseDescriptionComponent :depense="depense" />
    </div>
  </el-dialog>
</template>

<style scoped></style>
