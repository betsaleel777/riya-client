<script lang="ts" setup>

import { storeToRefs } from "pinia";
import { Form } from "vee-validate";
import { useContratStore } from "~/store/contrat";

const props = defineProps<{ modelValue: boolean; id: number }>();
const emit = defineEmits<{ (event: "update:modelValue", payload: boolean): void }>();
const { dialog } = useDialogModelValue(props, emit);
const { update, getOne } = useContratStore();
const { loading } = storeToRefs(useContratStore());
await getOne(props.id);
const { onSubmit } = useSubmitForm(update, dialog);
</script>

<template>
  <Form class="form-horizontal" @submit="onSubmit" v-slot="{ isSubmitting, errors }">
    <el-dialog v-model="dialog" title="Modifier le contrat" width="30%" destroy-on-close center scrollable>
      <ContratEditDialogForm :errors="errors" v-loading="isSubmitting || loading.edit" :contrat-id="props.id" />
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
