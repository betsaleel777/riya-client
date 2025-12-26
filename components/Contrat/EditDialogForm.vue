<script setup lang="ts">
import { storeToRefs } from "pinia";
import { Field, useField } from "vee-validate";
import { useContratStore } from "~/store/contrat";
const { contrat } = storeToRefs(useContratStore());
const props = defineProps<{ errors: any; contratId: number }>();
const { value: id } = useField("id");
const { value: montant } = useField("montant");
id.value = props.contratId;
montant.value = contrat.value?.operation_type === typeContrat.achat ? contrat.value?.cout_achat : contrat.value?.montant_location;
</script>

<template>
  <div class="container">
    <Field name="id" hidden />
    <el-form label-position="top">
      <div class="mb-3">
        <label for="montant" class="form-label">Nouveau montant</label>
        <Field name="montant" type="text" class="form-control" id="montant"
          :class="{ 'is-invalid': props.errors.montant }" />
        <div class="invalid-feedback" v-if="props.errors.montant">
          {{ props.errors.montant }}
        </div>
      </div>
    </el-form>
  </div>
</template>

<style scoped></style>
