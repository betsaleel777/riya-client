<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { Form } from "vee-validate";
import { useVisiteStore } from "~/store/visite";

const props = defineProps<{ modelValue: boolean; id: number }>();
const emit = defineEmits<{ (event: "update:modelValue", payload: boolean): void }>();
const { dialog } = useDialogModelValue(props, emit);

const { update, getOne } = useVisiteStore();
const { visite, loading } = storeToRefs(useVisiteStore());
getOne(props.id);
const { onSubmit } = useSubmitForm(update, dialog);
</script>

<template>
  <Form
    class="form-horizontal"
    @submit="onSubmit"
    :initial-values="visite"
    v-slot="{ isSubmitting, errors }"
  >
    <el-dialog v-model="dialog" title="Modifier la visite" width="35%" destroy-on-close center>
      <VisiteDialogForm v-loading="loading.edit || isSubmitting" :errors="errors" />
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
