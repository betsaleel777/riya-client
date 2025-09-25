<script lang="ts" setup>
import { Field } from "vee-validate";
const props = defineProps<{ errors: any }>();
</script>

<template>
  <div class="mb-2">
    <label for="date" class="form-label">Date</label>
    <Field name="date" v-slot="{ value, handleChange }">
      <el-date-picker
        id="date"
        :model-value="value"
        @update:model-value="handleChange"
        style="width: 100%"
        format="DD-MM-YYYY"
        value-format="YYYY-MM-DD"
        :class="{ 'is-invalid': props.errors.date }"
      />
      <div class="invalid-feedback" v-if="errors.date">
        {{ props.errors.date }}
      </div>
    </Field>
  </div>
</template>

<style scoped></style>
