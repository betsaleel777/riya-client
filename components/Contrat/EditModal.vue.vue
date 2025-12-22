<script lang="ts" setup>
import { Form } from "vee-validate";
import { useContratStore } from "~/store/contrat";
const { edit } = useContratStore();

const props = defineProps<{
  modelValue: boolean;
  id: number;
}>();

const emit = defineEmits<{
  (event: "update:modelValue", payload: boolean): void;
  (e: "contratUpdated"): void;
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
  return edit(values)
    .then((message) => {
      ElNotification.success({ title: "succès", message });
      if (dialog !== undefined) dialog.value = false;
      emit("contratUpdated");
    })
    .catch((err) => {
      if (err.data.errors) actions.setErrors(err.data.errors);
      if (err.response.status === 419) navigateTo("/login");
    });
};
</script>

<template>
  <Form class="form-horizontal" @submit="onSubmit" v-slot="{ isSubmitting, errors }">
    <el-dialog v-model="dialog" title="Modifier le contrat" width="30%" destroy-on-close center scrollable>
      <ContratEditForm v-loading="isSubmitting" :errors="errors" :contrat-id="props.id" />
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
