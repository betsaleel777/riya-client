<script setup lang="ts">
import { Field, useField } from "vee-validate";
const props = defineProps<{ errors: any; loyer: number }>();
const { value: mois } = useField<number>(() => "mois");
let montant = ref(0);
watch(mois, (newValue) => {
  montant.value = (newValue || 0) * props.loyer;
});
</script>

<template>
  <div class="container">
    <Field name="id" hidden />
    <Field name="visite_id" hidden />
    <Field name="type" value="cautions" hidden />
    <div class="mb-3">
      <label for="mois" class="form-label">Nombre de mois pour la caution</label>
      <Field
        name="mois"
        class="form-control"
        id="mois"
        placeholder="mois"
        v-maska
        data-maska="#"
        :class="{ 'is-invalid': props.errors.mois }"
      />
      <div class="invalid-feedback" v-if="props.errors.mois">{{ props.errors.mois }}</div>
      <p>{{ montant }} FCFA</p>
    </div>
  </div>
</template>

<style scoped></style>
