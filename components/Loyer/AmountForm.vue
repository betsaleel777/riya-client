<script lang="ts" setup>
import { Field } from "vee-validate";
const props = defineProps<{ errors: any }>();
</script>

<template>
  <div class="mb-2">
    <Field name="id" hidden />
    <label for="montant" class="form-label">Montant</label>
    <Field name="montant" v-slot="{ value, handleChange }">
      <vue-number
        id="montant"
        class="form-control"
        v-bind="numberConfig"
        :model-value="value ?? 0"
        @update:model-value="handleChange"
        :class="{ 'is-invalid': props.errors.montant }"
      ></vue-number>
      <div class="invalid-feedback" v-if="props.errors.montant">
        {{ props.errors.montant }}
      </div>
    </Field>
  </div>
</template>

<style scoped></style>
