<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { Form } from "vee-validate";
import { useTypeTerrainStore } from "~/store/terrain";

const props = defineProps<{ modelValue: boolean; id: number }>();
const emit = defineEmits<{ (event: "update:modelValue", payload: boolean): void }>();
const { dialog } = useDialogModelValue(props, emit);

const { update, getOne } = useTypeTerrainStore();
const { type, loading } = storeToRefs(useTypeTerrainStore());
getOne(props.id);
const { onSubmit } = useSubmitForm(update, dialog);
</script>

<template>
  <Form
    class="form-horizontal"
    @submit="onSubmit"
    :initial-values="type"
    v-slot="{ isSubmitting, errors }"
  >
    <el-dialog
      v-model="dialog"
      title="Modifier le type de terrain"
      width="35%"
      destroy-on-close
      center
    >
      <StructureTypeForm v-loading="loading.edit || isSubmitting" :errors="errors" />
      <template #footer>
        <span class="dialog-footer">
          <el-button type="danger" :disabled="isSubmitting" @click="dialog = false" plain
            >Annuler</el-button
          >
          <el-button type="primary" :disabled="isSubmitting" native-type="submit">
            modifier
          </el-button>
        </span>
      </template>
    </el-dialog>
  </Form>
</template>

<style scoped></style>
