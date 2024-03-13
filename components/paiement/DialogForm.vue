<script setup lang="ts">
import { Field, useField } from "vee-validate";
import { useAchatStore } from "~/store/achat";
import { useLoyerStore } from "~/store/loyer";
import { storeToRefs } from "pinia";

const props = defineProps<{ errors: any }>();

let type = reactive({ loyer: typePaiement.rent, achat: typePaiement.purchase });
let showSelect = reactive({ loyer: false, achat: false });
const { unsales: achats } = storeToRefs(useAchatStore());
const { impayes: loyers } = storeToRefs(useLoyerStore());
const { value: payable } = useField<string>("payable_type");
const { value: payableId } = useField("payable_id");

onMounted(async () => {
  const { getAll: getLoyers } = useLoyerStore();
  await getLoyers();
  const { getAll: getAchats } = useAchatStore();
  await getAchats();
});

const { value: id } = useField<number>("id");
const edit = computed<boolean>(() => id.value !== undefined);
const onChangeSelect = () => {
  payableId.value = null;
};

const toggleSelect = (typeValue: string) => {
  if (typeValue === type.loyer) {
    showSelect.loyer = true;
    showSelect.achat = false;
  } else {
    showSelect.loyer = false;
    showSelect.achat = true;
  }
};

watch(payable, (newPayable) => {
  toggleSelect(newPayable as string);
});
</script>

<template>
  <Field name="id" hidden />
  <div class="mb-2" v-show="!edit">
    <Field name="payable_type" v-slot="{ handleChange, value }">
      <el-radio-group
        id="type"
        :model-value="value"
        @update:model-value="handleChange"
        class="ml-4"
        @change="onChangeSelect"
      >
        <el-radio :label="type.loyer" size="large">{{ type.loyer }}</el-radio>
        <el-radio :label="type.achat" size="large">{{ type.achat }}</el-radio>
      </el-radio-group>
    </Field>
  </div>
  <div class="mb-2" v-show="showSelect.loyer">
    <label for="payable" class="form-label">Contrat de bail</label>
    <Field name="payable_id" v-slot="{ value, handleChange }">
      <el-row>
        <el-select
          id="payable"
          filterable
          :model-value="value"
          @update:model-value="handleChange"
          :class="{ 'is-invalid': props.errors.payable_id }"
          style="width: 100%"
        >
          <template #append><i class="bx bx-plus" /></template>
          <el-option
            v-for="(item, key) in loyers"
            :key="key"
            :label="item.code"
            :value="item.id!"
          />
        </el-select>
        <div class="invalid-feedback" v-if="props.errors.payable_id">
          {{ props.errors.payable_id }}
        </div>
      </el-row>
    </Field>
    <div class="invalid-feedback" v-if="errors.payable_id">{{ props.errors.payable_id }}</div>
  </div>
  <div class="mb-2" v-show="showSelect.achat">
    <label for="payable" class="form-label">Achat</label>
    <Field name="payable_id" v-slot="{ value, handleChange }">
      <el-row>
        <el-select
          id="bien"
          filterable
          :model-value="value"
          @update:model-value="handleChange"
          :class="{ 'is-invalid': props.errors.payable_id }"
          style="width: 100%"
        >
          <template #append><i class="bx bx-plus" /></template>
          <el-option
            v-for="(item, key) in achats"
            :key="key"
            :label="item.code"
            :value="item.id!"
          />
        </el-select>
        <div class="invalid-feedback" v-if="props.errors.payable_id">
          {{ props.errors.payable_id }}
        </div>
      </el-row>
    </Field>
    <div class="invalid-feedback" v-if="errors.bien_id">{{ props.errors.bien_id }}</div>
  </div>
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
      <div class="invalid-feedback" v-if="props.errors.montant">
        {{ props.errors.montant }}
      </div>
    </Field>
  </div>
</template>

<style scoped></style>
