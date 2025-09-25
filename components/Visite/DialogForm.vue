<script setup lang="ts">
import { Field } from "vee-validate";
import { usePersonneStore } from "~/store/personne";
import { useAppartementStore } from "~/store/appartement";
import { storeToRefs } from "pinia";

const props = defineProps<{ errors: any }>();

const dialog = reactive({ personne: false, appartement: false });
const { personnes } = storeToRefs(usePersonneStore());
const { libres: appartements } = storeToRefs(useAppartementStore());

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
            <el-select
              id="client"
              filterable
              :model-value="value"
              @update:model-value="handleChange"
              :class="{ 'is-invalid': props.errors.personne_id }"
              class="w-100"
            >
              <template #append><i class="bx bx-plus" /></template>
              <el-option
                v-for="(item, key) in personnes"
                :key="key"
                :label="item.nom_complet"
                :value="item.id!"
              />
            </el-select>
            <div class="invalid-feedback" v-if="props.errors.personne_id">
              {{ props.errors.personne_id }}
            </div>
          </el-col>
          <el-col :span="3">
            <el-tooltip content="Créer un client" placement="bottom">
              <el-button class="w-100" @click="dialog.personne = true" plain
                ><i class="bx bx-plus"
              /></el-button>
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
    <div class="mb-3">
      <label for="appartement" class="form-label">Appartement</label>
      <Field name="appartement_id" v-slot="{ value, handleChange }">
        <el-row :gutter="5">
          <el-col :span="21">
            <el-select
              id="appartement"
              filterable
              :model-value="value"
              @update:model-value="handleChange"
              :class="{ 'is-invalid': props.errors.appartement_id }"
              class="w-100"
            >
              <template #append><i class="bx bx-plus" /></template>
              <el-option
                v-for="(item, key) in appartements"
                :key="key"
                :label="item.nom"
                :value="item.id!"
              />
            </el-select>
            <div class="invalid-feedback" v-if="props.errors.appartement_id">
              {{ props.errors.appartement_id }}
            </div>
          </el-col>
          <el-col :span="3">
            <el-tooltip content="Créer un appartement" placement="bottom">
              <el-button class="w-100" @click="dialog.appartement = true" plain
                ><i class="bx bx-plus"
              /></el-button>
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
