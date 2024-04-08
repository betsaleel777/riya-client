<script setup lang="ts">
import { Field, useField } from "vee-validate";
const props = defineProps<{ fraisPercent: number; loyer: number }>();
const { value: selection } = useField<boolean>(() => "selection");
const { value: montant } = useField<number>(() => "frais_dossier");
watch(selection, (newValue) => {
  montant.value = newValue ? (props.loyer * props.fraisPercent) / 100 : 0;
});
</script>

<template>
  <div class="container">
    <Field name="id" hidden />
    <Field name="frais_dossier" hidden />
    <div class="mb-3">
      <Field name="selection" v-slot="{ value, handleChange }">
        <el-checkbox :model-value="value" @update:model-value="handleChange"
          >Frais de dossier</el-checkbox
        >
      </Field>
      <p>{{ montant }} FCFA</p>
    </div>
  </div>
</template>

<style scoped></style>
