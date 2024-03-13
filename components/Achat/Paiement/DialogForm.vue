<script setup lang="ts">
import { storeToRefs } from "pinia";
import { Field, useField } from "vee-validate";
import { useAchatStore } from "~/store/achat";

const props = defineProps<{ errors: any }>();
const { achat } = storeToRefs(useAchatStore());
const { value: payableId } = useField("payable_id");
const { value: payableType } = useField("payable_type");
payableId.value = achat.value?.id;
payableType.value = "Achat";
</script>

<template>
  <Field name="id" hidden />
  <Field name="payable_id" hidden />
  <Field name="payable_type" hidden />
  <div class="mb-3">
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
      <div class="invalid-feedback" v-if="errors.montant">
        {{ props.errors.montant }}
      </div>
    </Field>
  </div>
</template>

<style scoped></style>
