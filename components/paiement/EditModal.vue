<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { Form } from "vee-validate";
import { usePaiementStore } from "~/store/paiement";

const props = defineProps<{ modelValue: boolean; id: number }>();
const emit = defineEmits<{ (event: "update:modelValue", payload: boolean): void }>();
const { dialog } = useDialogModelValue(props, emit);

const { updateDirect, getOne } = usePaiementStore();
const { paiement, loading } = storeToRefs(usePaiementStore());
await getOne(props.id);
const { onSubmit } = useSubmitForm(updateDirect, dialog);
</script>

<template>
  <Form class="form-horizontal" @submit="onSubmit" :initial-values="paiement" v-slot="{ isSubmitting, errors }">
    <el-dialog v-model="dialog" title="Modifier le paiement" width="35%" destroy-on-close center>
      <div v-loading="loading.edit || isSubmitting">
        <PaiementDialogForm :errors="errors" />
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="danger" :disabled="isSubmitting" @click="dialog = false" plain>Annuler</el-button>
          <el-button type="primary" :disabled="isSubmitting" native-type="submit">
            modifier
          </el-button>
        </span>
      </template>
    </el-dialog>
  </Form>
</template>

<style scoped></style>
