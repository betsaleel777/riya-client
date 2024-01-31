<script setup lang="ts">
import { Field, useField } from "vee-validate";
import { usePersonneStore } from "~/store/personne";
import { useAppartementStore } from "~/store/appartement";
import { useTerrainStore } from "~/store/terrain";
import { storeToRefs } from "pinia";

const props = defineProps<{ errors: any }>();

let type = reactive({ appartement: "Appartement", terrain: "Terrain" });
let showSelect = reactive({ appartement: false, terrain: false });
const dialog = reactive({ personne: false, appartement: false, terrain: false });
const { personnes } = storeToRefs(usePersonneStore());
const { libres: appartements } = storeToRefs(useAppartementStore());
const { libres: terrains } = storeToRefs(useTerrainStore());
const { value: bien } = useField<string>("bien_type");
const { value: bienId } = useField("bien_id");

const { getAll: getPersonnes } = usePersonneStore();
getPersonnes();
const { getAll: getAppartements } = useAppartementStore();
getAppartements();
const { getAll: getTerrains } = useTerrainStore();
getTerrains();

const onChangeSelect = () => {
  bienId.value = null;
};

const toggleSelect = (typeValue: string) => {
  if (typeValue === type.appartement) {
    showSelect.appartement = true;
    showSelect.terrain = false;
  } else {
    showSelect.appartement = false;
    showSelect.terrain = true;
  }
};

watch(bien, (newBien) => {
  toggleSelect(newBien as string);
});
</script>

<template>
  <Field name="id" hidden />
  <div class="mb-3">
    <label for="client" class="form-label">Client</label>
    <Field name="personne_id" v-slot="{ value, handleChange }">
      <el-row :gutter="5">
        <el-col :span="22">
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
        <el-col :span="2">
          <el-tooltip content="Créer un client" placement="bottom">
            <el-button @click="dialog.personne = true" class="w-100" plain
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
    <label for="montant" class="form-label">Apport initial</label>
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
  <div class="mb-2">
    <Field name="bien_type" v-slot="{ handleChange, value }">
      <el-radio-group
        id="type"
        :model-value="value"
        @update:model-value="handleChange"
        class="ml-4"
        @change="onChangeSelect"
      >
        <el-radio :label="type.appartement" size="large">{{ type.appartement }}</el-radio>
        <el-radio :label="type.terrain" size="large">{{ type.terrain }}</el-radio>
      </el-radio-group>
    </Field>
  </div>
  <div class="mb-3" v-show="showSelect.appartement">
    <label for="bien" class="form-label">Bien</label>
    <Field name="bien_id" v-slot="{ value, handleChange }">
      <el-row>
        <el-select
          id="bien"
          filterable
          :model-value="value"
          @update:model-value="handleChange"
          :class="{ 'is-invalid': props.errors.bien_id }"
        >
          <template #append><i class="bx bx-plus" /></template>
          <el-option
            v-for="(item, key) in appartements"
            :key="key"
            :label="item.nom"
            :value="item.id!"
          />
        </el-select>
        <div class="invalid-feedback" v-if="props.errors.bien_id">{{ props.errors.bien_id }}</div>
      </el-row>
    </Field>
    <div class="invalid-feedback" v-if="errors.bien_id">{{ props.errors.bien_id }}</div>
  </div>
  <div class="mb-3" v-show="showSelect.terrain">
    <label for="bien" class="form-label">Bien</label>
    <Field name="bien_id" v-slot="{ value, handleChange }">
      <el-row>
        <el-select
          id="bien"
          filterable
          :model-value="value"
          @update:model-value="handleChange"
          :class="{ 'is-invalid': props.errors.bien_id }"
        >
          <template #append><i class="bx bx-plus" /></template>
          <el-option
            v-for="(item, key) in terrains"
            :key="key"
            :label="item.nom"
            :value="item.id!"
          />
        </el-select>
        <div class="invalid-feedback" v-if="props.errors.bien_id">{{ props.errors.bien_id }}</div>
      </el-row>
    </Field>
    <div class="invalid-feedback" v-if="errors.bien_id">{{ props.errors.bien_id }}</div>
  </div>
</template>

<style scoped></style>
