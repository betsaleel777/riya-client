<script lang="ts" setup>
import { Form } from "vee-validate";
import { useContratStore } from "~/store/contrat";
const { validerContrat } = useContratStore();

const props = defineProps<{
  modelValue: boolean;
  paiementId?: number;
  operationId: number;
  type: string;
}>();

const emit = defineEmits<{
  (event: "update:modelValue", payload: boolean): void;
  (e: "contratCreated"): void;
}>();
const dialog = computed({
  get() {
    return props.modelValue;
  },
  set(newValue: boolean): void {
    emit("update:modelValue", newValue);
  },
});
const onSubmit = async (values: any, actions: any) => {
  return validerContrat(values)
    .then((message) => {
      ElNotification.success({ title: "succès", message });
      if (dialog !== undefined) dialog.value = false;
      emit("contratCreated");
    })
    .catch((err) => {
      if (err.data.errors) actions.setErrors(err.data.errors);
      if (err.response.status === 419) navigateTo("/login");
    });
};
</script>

<template>
  <Form class="form-horizontal" @submit="onSubmit" v-slot="{ isSubmitting, errors }">
    <el-dialog v-model="dialog" title="Créer un contrat" width="30%" destroy-on-close center scrollable>
      <ContratDialogForm v-loading="isSubmitting" :errors="errors" :operation-id="operationId" :paiement-id="paiementId"
        :type="props.type" />
      <template #footer>
        <span class="dialog-footer">
          <el-button type="danger" :disabled="isSubmitting" @click="dialog = false" plain>
            Annuler
          </el-button>
          <el-button type="primary" :disabled="isSubmitting" native-type="submit">
            enregistrer
          </el-button>
        </span>
      </template>
    </el-dialog>
  </Form>
</template>
<style scoped></style>
