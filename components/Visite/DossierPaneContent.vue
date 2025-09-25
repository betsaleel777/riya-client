<script lang="ts" setup>
import { useVisiteStore } from "~/store/visite";
import { useSocieteStore } from "~/store/societe";
import { Form } from "vee-validate";
import { storeToRefs } from "pinia";

const { visite } = useVisiteStore();
const { societe, loading } = storeToRefs(useSocieteStore());
const { getOne } = useSocieteStore();
getOne();
const loyer = computed<number>(() => visite?.appartement?.montant_location!);
const percent = computed<number>(() => societe.value.frais_dossier);
const initials = reactive({
  id: visite?.id,
  selection: visite?.frais_dossier !== 0,
  frais_dossier: visite?.frais_dossier,
});
const { fraisPatch: action } = useVisiteStore();
const { onSubmit } = useSubmitFormSimple(action);
</script>

<template>
  <Form
    class="form-horizontal"
    @submit="onSubmit"
    :initial-values="initials"
    v-slot="{ isSubmitting }"
  >
    <VisiteDossierForm
      v-loading="loading || isSubmitting"
      :loyer="loyer"
      :frais-percent="percent"
    />
    <el-button
      style="float: right"
      class="my-2"
      type="primary"
      :disabled="isSubmitting"
      native-type="submit"
      >enregistrer</el-button
    >
  </Form>
</template>

<style scoped></style>
