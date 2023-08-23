<script lang="ts" setup>
import { Form } from "vee-validate";
import { usePaiementStore } from "~/store/paiement";

const { createDirect } = usePaiementStore();
const props = defineProps<{
  modelValue: boolean;
}>();
const emit = defineEmits<{ (event: "update:modelValue", payload: boolean): void }>();
const dialog = computed({
  get() {
    return props.modelValue;
  },
  set(newValue: boolean): void {
    emit("update:modelValue", newValue);
  },
});
const { onSubmit } = useSubmitForm(createDirect, dialog);
</script>

<template>
  <Form class="form-horizontal" @submit="onSubmit" v-slot="{ isSubmitting, errors }">
    <el-dialog
      v-model="dialog"
      title="Créer un nouveau paiement"
      width="35%"
      destroy-on-close
      center
    >
      <PaiementDialogForm :errors="errors" />
      <template #footer>
        <span class="dialog-footer">
          <el-button type="danger" @click="dialog = false" plain>Annuler</el-button>
          <el-button type="primary" :disabled="isSubmitting" native-type="submit">
            enregistrer
          </el-button>
        </span>
      </template>
    </el-dialog>
  </Form>
</template>

<style scoped></style>
