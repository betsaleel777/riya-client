<script setup lang="ts">
import { Field } from "vee-validate";
import { usePersonneStore } from "~/store/personne";
import { useAppartementStore } from "~/store/appartement";
import { storeToRefs } from "pinia";
import { numberConfig } from "~/utils/constante";
import type { Appartements } from "~/types/appartement";
import { useVisiteStore } from "~/store/visite";

const props = defineProps<{ errors: any }>();

const dialog = reactive({ personne: false, appartement: false });
const { personnes } = storeToRefs(usePersonneStore());
const { libres: appartementsLibres } = storeToRefs(useAppartementStore());
const { visite } = storeToRefs(useVisiteStore());
const appartements = computed<Appartements>(() => {
  let list = appartementsLibres.value ? [...appartementsLibres.value] : [];
  const current = visite.value?.appartement;
  if (current && !list.some(a => a.id === current.id)) {
    list.push(current);
  }
  return list;
});
const { getAll: getPersonnes } = usePersonneStore();
getPersonnes();
const { getAll: getAppartements } = useAppartementStore();
getAppartements();
</script>

<template>
  <div class="container">
    <Field name="id" hidden />
    <div class="mb-3">
      <label for="client" class="form-label">Client</label>
      <Field name="personne_id" v-slot="{ value, handleChange }">
        <el-row :gutter="5">
          <el-col :span="21">
            <el-select id="client" filterable :model-value="value" @update:model-value="handleChange"
              :class="{ 'is-invalid': props.errors.personne_id }" class="w-100">
              <template #append><i class="bx bx-plus" /></template>
              <el-option v-for="(item, key) in personnes" :key="key" :label="item.nom_complet" :value="item.id!" />
            </el-select>
            <div class="invalid-feedback" v-if="props.errors.personne_id">
              {{ props.errors.personne_id }}
            </div>
          </el-col>
          <el-col :span="3">
            <el-tooltip content="Créer un client" placement="bottom">
              <el-button class="w-100" @click="dialog.personne = true" plain><i class="bx bx-plus" /></el-button>
            </el-tooltip>
          </el-col>
        </el-row>
        <PersonneCreateModal v-model="dialog.personne" />
      </Field>
      <div class="invalid-feedback" v-if="errors.personne_id">{{ props.errors.personne_id }}</div>
    </div>
    <div class="mb-3">
      <label for="montant" class="form-label">Montant</label>
      <Field name="montant" v-slot="{ value, handleChange }">
        <vue-number id="montant" class="form-control" v-bind="numberConfig" :model-value="value ?? 0"
          @update:model-value="handleChange" :class="{ 'is-invalid': props.errors.montant }" />
        <div class="invalid-feedback" v-if="props.errors.montant">
          {{ props.errors.montant }}
        </div>
      </Field>
    </div>
    <div class="mb-3">
      <label for="montant" class="form-label">Frais de dossier</label>
      <Field name="frais_dossier" v-slot="{ value, handleChange }">
        <vue-number id="frais_dossier" class="form-control" v-bind="numberConfig" :model-value="value ?? 0"
          @update:model-value="handleChange" :class="{ 'is-invalid': props.errors.frais_dossier }" />
        <div class="invalid-feedback" v-if="props.errors.frais_dossier">
          {{ props.errors.frais_dossier }}
        </div>
      </Field>
    </div>
    <div class="mb-3">
      <label for="visite_date" class="form-label">Date de visite</label>
      <Field name="visite_date" v-slot="{ value, handleChange }">
        <el-date-picker id="visite_date" :model-value="value" @update:modelValue="handleChange" type="date"
          format="DD-MM-YYYY" value-format="YYYY-MM-DD" :class="{ 'is-invalid': props.errors.visite_date }"
          style="width: 100%" />
        <div class="invalid-feedback" v-if="props.errors.visite_date">
          {{ props.errors.visite_date }}
        </div>
      </Field>
    </div>
    <div class="mb-3">
      <label for="appartement" class="form-label">Appartement</label>
      <Field name="appartement_id" v-slot="{ value, handleChange }">
        <el-row :gutter="5">
          <el-col :span="21">
            <el-select id="appartement" filterable :model-value="value" @update:model-value="handleChange"
              :class="{ 'is-invalid': props.errors.appartement_id }" class="w-100">
              <template #append><i class="bx bx-plus" /></template>
              <el-option v-for="(item, key) in appartements" :key="key" :label="item.nom" :value="item.id!" />
            </el-select>
            <div class="invalid-feedback" v-if="props.errors.appartement_id">
              {{ props.errors.appartement_id }}
            </div>
          </el-col>
          <el-col :span="3">
            <el-tooltip content="Créer un appartement" placement="bottom">
              <el-button class="w-100" @click="dialog.appartement = true" plain><i class="bx bx-plus" /></el-button>
            </el-tooltip>
          </el-col>
        </el-row>
        <AppartementCreateModal v-model="dialog.appartement" />
      </Field>
      <div class="invalid-feedback" v-if="errors.bien_id">{{ props.errors.bien_id }}</div>
    </div>
  </div>
</template>

<style scoped></style>
