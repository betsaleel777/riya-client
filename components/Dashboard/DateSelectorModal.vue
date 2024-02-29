<script lang="ts" setup>
import { Form } from "vee-validate";
const props = defineProps<{ modelValue: boolean }>();
const emit = defineEmits<{ (event: "update:modelValue", payload: boolean): void }>();
const { dialog } = useDialogModelValue(props, emit);
</script>

<template>
  <Form class="form-horizontal" @submit="" v-slot="{ isSubmitting, errors }">
    <el-dialog v-model="dialog" title="Selection de date" width="35%" destroy-on-close center>
      <DashboardDateForm :errors="errors" />
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
