<script setup lang="ts">
import { Field, useField } from "vee-validate";
const props = defineProps<{
  errors: any;
  paiementId?: number;
  operationId: number;
  type: string;
}>();
const { value: operationId } = useField("operation_id");
const { value: type } = useField("operation_type");
const { value: paiement } = useField("paiement");
paiement.value = props.paiementId;
operationId.value = props.operationId;
type.value = props.type;
</script>

<template>
  <Field name="id" hidden />
  <Field name="operation_id" hidden />
  <Field name="operation_type" hidden />
  <Field name="paiement" hidden />
  <el-form label-position="top">
    <div class="mb-3">
      <label for="commission" class="form-label">Commission propriétaire</label>
      <Field
        name="commission"
        type="text"
        class="form-control"
        id="commission"
        v-maska
        data-maska="##"
        :class="{ 'is-invalid': props.errors.commission }"
      />
      <div class="invalid-feedback" v-if="props.errors.commission">
        {{ props.errors.commission }}
      </div>
    </div>
    <div class="mb-2">
      <Field name="debut" v-slot="{ value, handleChange }">
        <el-form-item label="Debut du contrat">
          <el-date-picker
            :model-value="value"
            @update:modelValue="handleChange"
            id="debut"
            type="date"
            format="DD-MM-YYYY"
            value-format="YYYY-MM-DD"
            style="width: 100%"
            :class="{ 'is-invalid': props.errors.debut }"
          />
          <div class="invalid-feedback" v-if="errors.debut">
            {{ props.errors.debut }}
          </div>
        </el-form-item>
      </Field>
    </div>
  </el-form>
</template>

<style scoped></style>
