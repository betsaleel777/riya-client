<script setup lang="ts">
import { Operation } from "~/types/visite";
import { useVisiteStore } from "~/store/visite";
import { Form } from "vee-validate";

const { visite } = useVisiteStore();
const { getOperationAction } = useVisiteStore();

const avance = computed<Operation>(() => visite?.avanceObject!);
const loyer = computed<number>(() => visite?.appartement?.montant_location!);

const initials = {
  id: visite?.avanceObject?.id,
  mois: visite?.avanceObject?.mois,
  visite_id: visite?.id,
};
const action = getOperationAction(avance.value);
const { onSubmit } = useSubmitFormSimple(action);
</script>
<template>
  <Form
    class="form-horizontal"
    @submit="onSubmit"
    :initial-values="initials"
    v-slot="{ isSubmitting, errors }"
  >
    <VisiteAvanceForm v-loading="isSubmitting" :errors="errors" :loyer="loyer" />
    <el-button
      style="float: right"
      class="my-2"
      type="primary"
      :disabled="isSubmitting"
      native-type="submit"
    >
      enregistrer</el-button
    >
  </Form>
</template>

<style scoped></style>
