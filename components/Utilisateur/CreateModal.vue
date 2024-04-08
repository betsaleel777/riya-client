<script lang="ts" setup>
import { Form } from "vee-validate";
import { useUtilisateurStore } from "~/store/utilisateur";

const { create } = useUtilisateurStore();
const props = defineProps<{ modelValue: boolean }>();
const emit = defineEmits<{ (event: "update:modelValue", payload: boolean): void }>();
const { dialog } = useDialogModelValue(props, emit);
const { onSubmit } = useSubmitForm(create, dialog);
</script>

<template>
  <Form class="form-horizontal" @submit="onSubmit" v-slot="{ isSubmitting, errors }">
    <el-dialog v-model="dialog" title="Créer l'utilisateur" width="35%" destroy-on-close center>
      <UtilisateurDialogForm v-loading="isSubmitting" :errors="errors" />
      <template #footer>
        <span class="dialog-footer">
          <el-button type="danger" :disabled="isSubmitting" @click="dialog = false" plain
            >Annuler</el-button
          >
          <el-button type="primary" :disabled="isSubmitting" native-type="submit">
            enregistrer
          </el-button>
        </span>
      </template>
    </el-dialog>
  </Form>
</template>

<style scoped></style>
