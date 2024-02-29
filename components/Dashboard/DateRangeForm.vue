<script lang="ts" setup>
import { Field } from "vee-validate";
const props = defineProps<{ errors: any }>();
</script>

<template>
  <div class="mb-2">
    <label for="dates" class="form-label">Dates</label>
    <Field name="dates" v-slot="{ value, handleChange }">
      <el-date-picker
        id="dates"
        :model-value="value"
        @update:model-value="handleChange"
        style="width: 100%"
        type="daterange"
        range-separator="-"
        start-placeholder="début"
        end-placeholder="fin"
        format="DD-MM-YYYY"
        value-format="YYYY-MM-DD"
        :class="{ 'is-invalid': props.errors.dates }"
      />
      <div class="invalid-feedback" v-if="errors.dates">
        {{ props.errors.dates }}
      </div>
    </Field>
  </div>
</template>

<style scoped></style>
