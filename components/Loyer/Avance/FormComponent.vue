<script setup lang="ts">
import { Field, useField } from "vee-validate";
import { storeToRefs } from "pinia";
import { useContratStore } from "~/store/contrat";
import { useLoyerStore } from "~/store/loyer";
import customParseFormat from "dayjs/plugin/customParseFormat";

const props = defineProps<{ errors: any }>();
const { getRentAvanceProcessing } = useContratStore();
const { getLastPaid } = useLoyerStore();
const { contrats, loading } = storeToRefs(useContratStore());
const { loyer } = storeToRefs(useLoyerStore());
getRentAvanceProcessing();
const { value: id } = useField<number>("contrat_id");
const disabledDate = computed(() => !Boolean(id.value));
const onSelected = () => {
  if (id.value) {
    getLastPaid(id.value);
  }
};
const dayjs = useDayjs();
dayjs.extend(customParseFormat);
const datesValables = computed(() => {
  let date = loyer.value?.mois ? dayjs(loyer.value.mois + "-01") : dayjs().subtract(1, "month");
  const end = dayjs(date).add(13, "months");
  const dates = [];
  let other = date;
  while (other.isBefore(end)) {
    other = date.add(1, "months");
    dates.push(other.format("YYYY-MM-DD"));
    date = other;
  }
  return dates;
});
const disableMonth = (date: Date) => {
  return !datesValables.value.includes(dayjs(date).format("YYYY-MM-DD"));
};
</script>

<template>
  <div class="row" v-loading="loading.index">
    <div class="mb-2">
      <label for="contrat_id" class="form-label">Contrat de bail</label>
      <Field name="contrat_id" v-slot="{ value, handleChange }">
        <el-select id="contrat_id" filterable :model-value="value" @update:model-value="handleChange"
          style="width: 100%" clearable :class="{ 'is-invalid': props.errors.contrat_id }" @change="onSelected()">
          <el-option v-for="(item, key) in contrats" :key="key" :label="item.code" :value="item.id!" />
        </el-select>
        <div class="invalid-feedback" v-if="errors.contrat_id">
          {{ props.errors.contrat_id }}
        </div>
      </Field>
    </div>
    <div class="mb-2">
      <label for="periode" class="form-label">Contrat de bail</label>
      <Field name="periode" v-slot="{ value, handleChange }">
        <el-date-picker id="periode" :model-value="value" @update:model-value="handleChange" style="width: 100%"
          type="monthrange" range-separator="-" start-placeholder="début" end-placeholder="fin" format="MM-YYYY"
          value-format="YYYY-MM-DD" :disabled="disabledDate" :disabled-date="disableMonth"
          :class="{ 'is-invalid': props.errors.periode }" />
        <div class="invalid-feedback" v-if="errors.periode">
          {{ props.errors.periode }}
        </div>
      </Field>
    </div>
  </div>
</template>

<style scoped></style>
