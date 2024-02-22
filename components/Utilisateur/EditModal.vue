<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { Form } from "vee-validate";
import { useUtilisateurStore } from "~/store/utilisateur";

const props = defineProps<{ modelValue: boolean; id: number }>();
const emit = defineEmits<{ (event: "update:modelValue", payload: boolean): void }>();
const { dialog } = useDialogModelValue(props, emit);
const { update, getOne } = useUtilisateurStore();
const { utilisateur, loading } = storeToRefs(useUtilisateurStore());
getOne(props.id);
const { onSubmit } = useSubmitForm(update, dialog);
</script>

<template>
  <Form
    class="form-horizontal"
    @submit="onSubmit"
    :initial-values="utilisateur"
    v-slot="{ isSubmitting, errors }"
  >
    <el-dialog v-model="dialog" title="Modifier l'utilisateur" width="35%" destroy-on-close center>
      <div v-loading="loading.edit">
        <UtilisateurDialogForm :errors="errors" />
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="danger" @click="dialog = false" plain>Annuler</el-button>
          <el-button type="primary" :disabled="isSubmitting" native-type="submit">
            modifier
          </el-button>
        </span>
      </template>
    </el-dialog>
  </Form>
</template>

<style scoped></style>
