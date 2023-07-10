<script lang="ts" setup>
import { Form } from "vee-validate";
import { useTypeTerrainStore } from "~/store/terrain";

const { create } = useTypeTerrainStore();
const props = defineProps<{
  modelValue: boolean;
}>();
const emit = defineEmits<{
  (event: "update:modelValue", payload: boolean): void;
  (event: "added"): void;
}>();
const dialog = computed({
  get() {
    return props.modelValue;
  },
  set(newValue: boolean): void {
    emit("update:modelValue", newValue);
  },
});
const { onSubmit } = useSubmitForm(create, dialog);
</script>

<template>
  <Form class="form-horizontal" @submit="onSubmit" v-slot="{ isSubmitting, errors }">
    <el-dialog
      v-model="dialog"
      title="Créer de type de terrain"
      width="35%"
      destroy-on-close
      center
    >
      <StructureTypeForm :errors="errors" />
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
