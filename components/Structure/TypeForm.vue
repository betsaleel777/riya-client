<script setup lang="ts">
import { Field } from "vee-validate";
const props = defineProps<{
  errors: any;
}>();
</script>

<template>
  <Field name="id" hidden />
  <div class="mb-3">
    <label for="nom" class="form-label">Nom</label>
    <Field
      name="nom"
      type="text"
      class="form-control"
      id="nom"
      placeholder="nom"
      :class="{ 'is-invalid': props.errors.nom }"
    />
    <div class="invalid-feedback" v-if="props.errors.nom">{{ props.errors.nom }}</div>
  </div>
</template>

<style scoped></style>
