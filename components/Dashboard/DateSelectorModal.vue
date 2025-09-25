<script lang="ts" setup>
import { Form } from "vee-validate";
import { useDashboardStore } from "~/store/dashboard";

const props = defineProps<{ modelValue: boolean }>();
const emit = defineEmits<{ (event: "update:modelValue", payload: boolean): void }>();
const { getSwitch } = useDashboardStore();
const { dialog } = useDialogModelValue(props, emit);
const type = inject<string>("type");
const action = getSwitch(type!);
const { onSubmit } = useSubmitForm(action, dialog);
</script>

<template>
  <Form class="form-horizontal" @submit="onSubmit" v-slot="{ isSubmitting, errors }">
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
