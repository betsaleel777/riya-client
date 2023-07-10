<script setup lang="ts">
import { storeToRefs } from "pinia";
import { Field, useField } from "vee-validate";
import { useAchatStore } from "~/store/achat";
const props = defineProps<{
  errors: any;
}>();
const { achat } = storeToRefs(useAchatStore());
const { value: achatId } = useField("achat_id");
achatId.value = achat.value?.id;
</script>

<template>
  <Field name="id" hidden />
  <Field name="achat_id" hidden />
  <div class="mb-3">
    <label for="montant" class="form-label">Montant</label>
    <Field
      name="montant"
      type="text"
      class="form-control"
      id="montant"
      placeholder="montant"
      :class="{ 'is-invalid': props.errors.montant }"
    />
    <div class="invalid-feedback" v-if="props.errors.montant">{{ props.errors.montant }}</div>
  </div>
</template>

<style scoped></style>
