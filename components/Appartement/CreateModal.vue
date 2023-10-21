<script lang="ts" setup>
import { Form } from "vee-validate";
import { useAppartementStore } from "~/store/appartement";

const props = defineProps<{ modelValue: boolean }>();
const emit = defineEmits<{ (event: "update:modelValue", payload: boolean): void }>();
const { dialog } = useDialogModelValue(props, emit);
const { create } = useAppartementStore();

const { onSubmit } = useSubmitForm(create, dialog);
</script>

<template>
  <Form class="form-horizontal" @submit="onSubmit" v-slot="{ isSubmitting, errors, values }">
    <el-dialog
      v-model="dialog"
      title="Créer un appartement"
      width="50%"
      destroy-on-close
      center
      scrollable
    >
      <AppartementDialogForm :errors="errors" />
      <!-- <pre>{{ values }}</pre> -->
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
