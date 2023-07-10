<script setup lang="ts">
import { Field, useField } from "vee-validate";
import { useVisiteStore } from "~/store/visite";
import * as dayjs from "dayjs";
const { visite } = useVisiteStore();
const props = defineProps<{
  errors: any;
}>();
const { value: debut } = useField<string>("debut");
const { value: fin } = useField<string>("fin");
const { value: operationId } = useField("operation_id");
const { value: type } = useField("operation_type");
operationId.value = visite?.id;
type.value = "Visite";
const autocompleteField = () => {
  if (debut.value) fin.value = dayjs(debut.value).add(1, "year").format("YYYY-MM-DD");
};
</script>

<template>
  <Field name="id" hidden />
  <Field name="operation_id" hidden />
  <Field name="operation_type" hidden />
  <el-form label-position="top">
    <div class="mb-3">
      <label for="commission" class="form-label">Commission propriétaire</label>
      <Field
        name="commission"
        type="text"
        class="form-control"
        id="commission"
        placeholder="commission"
        v-maska
        data-maska="##"
        :class="{ 'is-invalid': props.errors.commission }"
      />
      <div class="invalid-feedback" v-if="props.errors.commission">
        {{ props.errors.commission }}
      </div>
    </div>
    <div class="mb-2">
      <el-form-item>
        <el-row :gutter="5">
          <el-col :span="12">
            <Field name="debut" v-slot="{ value, handleChange }">
              <el-form-item label="Debut du contrat">
                <el-date-picker
                  @change="autocompleteField"
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
          </el-col>
          <el-col :span="12">
            <Field name="fin" v-slot="{ value, handleChange }">
              <el-form-item label="Fin du contrat">
                <el-date-picker
                  :model-value="value"
                  @update:modelValue="handleChange"
                  id="fin"
                  type="date"
                  format="DD-MM-YYYY"
                  value-format="YYYY-MM-DD"
                  style="width: 100%"
                  :class="{ 'is-invalid': props.errors.fin }"
                />
                <div class="invalid-feedback" v-if="errors.fin">
                  {{ props.errors.fin }}
                </div>
              </el-form-item>
            </Field>
          </el-col>
        </el-row>
      </el-form-item>
    </div>
  </el-form>
</template>

<style scoped></style>
