<script lang="ts" setup>
import { Form } from "vee-validate";
import { useTypeDepenseStore } from "~/store/depense";

const props = defineProps<{ modelValue: boolean }>();
const emit = defineEmits<{ (event: "update:modelValue", payload: boolean): void }>();
const { dialog } = useDialogModelValue(props, emit);

const { create } = useTypeDepenseStore();
const { onSubmit } = useSubmitForm(create, dialog);
</script>

<template>
  <Form class="form-horizontal" @submit="onSubmit" v-slot="{ isSubmitting, errors }">
    <el-dialog v-model="dialog" title="Créer type de dépense" width="35%" destroy-on-close center>
      <StructureTypeForm :errors="errors" />
      <template #footer>
        <span class="dialog-footer">
          <el-button type="danger" @click="dialog = false" plain>Annuler</el-button>
          <el-button type="primary" native-type="submit" :disabled="isSubmitting">
            enregistrer
          </el-button>
        </span>
      </template>
    </el-dialog>
  </Form>
</template>

<style scoped></style>
