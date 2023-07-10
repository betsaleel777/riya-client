<script setup lang="ts">
import { Field } from "vee-validate";
import { usePersonneStore } from "~/store/personne";
import { useAppartementStore } from "~/store/appartement";
import { storeToRefs } from "pinia";
import { Visite } from "~/types/visite";

const props = defineProps<{
  errors: any;
  visite?: Visite;
}>();

const dialog = reactive({ personne: false, appartement: false });
const { personnes } = storeToRefs(usePersonneStore());
const { libres: appartements } = storeToRefs(useAppartementStore());

onMounted(async () => {
  const { getAll: getPersonnes } = usePersonneStore();
  await getPersonnes();
  const { getAll: getAppartements } = useAppartementStore();
  await getAppartements();
});
</script>

<template>
  <Field name="id" hidden />
  <div class="mb-3">
    <label for="client" class="form-label">Client</label>
    <Field name="personne_id" v-slot="{ value, handleChange }">
      <el-row>
        <el-col :span="20">
          <el-select
            id="client"
            filterable
            :model-value="value"
            @update:model-value="handleChange"
            :class="{ 'is-invalid': props.errors.personne_id }"
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
        <el-col :span="4">
          <el-tooltip content="Créer un client" placement="bottom">
            <el-button @click="dialog.personne = true" plain><i class="bx bx-plus" /></el-button>
          </el-tooltip>
        </el-col>
      </el-row>
      <PersonneCreateModal v-model="dialog.personne" />
    </Field>
    <div class="invalid-feedback" v-if="errors.personne_id">{{ props.errors.personne_id }}</div>
  </div>
  <div class="mb-3">
    <label for="montant" class="form-label">Montant</label>
    <Field
      name="montant"
      type="text"
      class="form-control"
      id="montant"
      placeholder="montant"
      :class="{ 'is-invalid': props.errors.montant }"
      v-maska
      data-maska="######"
    />
    <div class="invalid-feedback" v-if="props.errors.montant">{{ props.errors.montant }}</div>
  </div>
  <div class="mb-3">
    <label for="appartement" class="form-label">Appartement</label>
    <Field name="appartement_id" v-slot="{ value, handleChange }">
      <el-row>
        <el-col :span="20">
          <el-select
            id="appartement"
            filterable
            :model-value="value"
            @update:model-value="handleChange"
            :class="{ 'is-invalid': props.errors.appartement_id }"
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
        <el-col :span="4">
          <el-tooltip content="Créer un appartement" placement="bottom">
            <el-button @click="dialog.appartement = true" plain><i class="bx bx-plus" /></el-button>
          </el-tooltip>
        </el-col>
      </el-row>
      <AppartementCreateModal v-model="dialog.appartement" />
    </Field>
    <div class="invalid-feedback" v-if="errors.bien_id">{{ props.errors.bien_id }}</div>
  </div>
</template>

<style scoped></style>
