<script lang="ts" setup>
import { useLoyerStore } from "~/store/loyer";
import { Form } from "vee-validate";
const props = withDefaults(
  defineProps<{ modelValue: boolean; id: number; fromValidationPage?: boolean }>(),
  { fromValidationPage: false }
);
const emit = defineEmits<{ (event: "update:modelValue", payload: boolean): void }>();
const { dialog } = useDialogModelValue(props, emit);
const { cashed } = useLoyerStore();
const { onSubmit } = useSubmitForm(cashed, dialog);
</script>

<template>
  <Form
    class="form-horizontal"
    @submit="onSubmit"
    v-slot="{ isSubmitting, errors, values }"
    :initial-values="{ id: props.id }"
  >
    <el-dialog v-model="dialog" title="Montant du loyer" width="40%" destroy-on-close center>
      <LoyerAmountForm :id="props.id" :errors="errors" />
      <pre>{{ values }}</pre>
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
