<script setup lang="ts">
import type { Operation } from "~/types/visite";
import { useVisiteStore } from "~/store/visite";
import { Form } from "vee-validate";

const { visite } = useVisiteStore();
const { getOperationAction } = useVisiteStore();
const frais = computed<Operation>(() => visite?.fraisObject!);
const loyer = computed<number>(() => visite?.appartement?.montant_location!);

const initials = {
  id: visite?.fraisObject?.id,
  mois: visite?.fraisObject?.mois,
  visite_id: visite?.id,
};
const action = getOperationAction(frais.value);
const { onSubmit } = useSubmitFormSimple(action);
</script>
<template>
  <Form class="form-horizontal" @submit="onSubmit" :initial-values="initials" v-slot="{ isSubmitting, errors }">
    <VisiteFraisForm v-loading="isSubmitting" :errors="errors" :loyer="loyer" />
    <el-button style="float: right" class="my-2" type="primary" :disabled="isSubmitting" native-type="submit">
      enregistrer</el-button>
  </Form>
</template>

<style scoped></style>
