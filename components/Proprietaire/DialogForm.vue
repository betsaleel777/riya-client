<script setup lang="ts">
import { Field } from "vee-validate";
const props = defineProps<{ errors: any }>();
</script>

<template>
  <Field name="id" type="text" hidden />
  <div class="mb-3">
    <label for="nom" class="form-label">Nom complet</label>
    <Field
      name="nom_complet"
      type="text"
      class="form-control"
      id="nom"
      :class="{ 'is-invalid': props.errors.nom_complet }"
    />
    <div class="invalid-feedback" v-if="errors.nom_complet">{{ props.errors.nom_complet }}</div>
  </div>
  <div class="mb-3">
    <label for="telephone" class="form-label">Téléphone</label>
    <Field
      name="telephone"
      type="text"
      class="form-control"
      id="telephone"
      :class="{ 'is-invalid': props.errors.telephone }"
    />
    <div class="invalid-feedback" v-if="errors.telephone">{{ props.errors.telephone }}</div>
  </div>
  <div class="mb-3">
    <label for="email" class="form-label">Email</label>
    <Field
      name="email"
      type="text"
      class="form-control"
      id="email"
      :class="{ 'is-invalid': props.errors.email }"
    />
    <div class="invalid-feedback" v-if="errors.email">{{ props.errors.email }}</div>
  </div>
  <div class="mb-3">
    <label for="cni" class="form-label">Numéro de CNI</label>
    <Field
      name="cni"
      type="text"
      class="form-control"
      id="cni"
      :class="{ 'is-invalid': props.errors.cni }"
    />
    <div class="invalid-feedback" v-if="errors.cni">{{ props.errors.cni }}</div>
  </div>
</template>

<style scoped></style>
