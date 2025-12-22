<script setup lang="ts">
import { Field, useField } from "vee-validate";
const props = defineProps<{
  errors: any;
  contratId: number;
}>();
const { value: contratId } = useField("id");
contratId.value = props.contratId;
</script>

<template>
  <div class="container">
    <Field name="id" hidden />
    <el-form label-position="top">
      <div class="mb-3">
        <label for="montant" class="form-label">Nouveau montant</label>
        <Field name="montant" type="text" class="form-control" id="montant" v-maska data-maska=""
          :class="{ 'is-invalid': props.errors.montant }" />
        <div class="invalid-feedback" v-if="props.errors.montant">
          {{ props.errors.montant }}
        </div>
      </div>
    </el-form>
  </div>
</template>

<style scoped></style>
