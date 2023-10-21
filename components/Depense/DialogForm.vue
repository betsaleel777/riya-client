<script setup lang="ts">
import { storeToRefs } from "pinia";
import { Field } from "vee-validate";
import { useTypeDepenseStore } from "~/store/depense";

const props = defineProps<{ errors: any }>();
let dialog = reactive({ type: false });
const { types, loading } = storeToRefs(useTypeDepenseStore());
const { getAll } = useTypeDepenseStore();
getAll();
</script>

<template>
  <div class="row" v-loading="loading.index">
    <Field name="id" hidden />
    <div class="mb-2">
      <label for="titre" class="form-label">Titre</label>
      <Field
        name="titre"
        id="titre"
        class="form-control"
        :class="{ 'is-invalid': props.errors.titre }"
      />
      <div class="invalid-feedback" v-if="errors.titre">
        {{ props.errors.titre }}
      </div>
    </div>
    <div class="mb-2">
      <label for="montant" class="form-label">Montant</label>
      <Field
        name="montant"
        id="montant"
        class="form-control"
        :class="{ 'is-invalid': props.errors.montant }"
      />
      <div class="invalid-feedback" v-if="errors.montant">
        {{ props.errors.montant }}
      </div>
    </div>
    <div class="mb-2">
      <label for="type_depense" class="form-label">Type de dépense</label>
      <Field name="type_depense_id" v-slot="{ value, handleChange }">
        <el-row :gutter="5">
          <el-col :span="22">
            <el-select
              id="type_depense"
              filterable
              :model-value="value"
              @update:model-value="handleChange"
              style="width: 100%"
              clearable
              :class="{ 'is-invalid': props.errors.type_depense_id }"
            >
              <template #append><i class="bx bx-plus" /></template>
              <el-option
                v-for="(item, key) in types"
                :key="key"
                :label="item.nom"
                :value="item.id!"
              />
            </el-select>
            <div class="invalid-feedback" v-if="errors.type_depense_id">
              {{ props.errors.type_depense_id }}
            </div>
          </el-col>
          <el-col :span="2">
            <el-tooltip content="Créer un type de dépense" placement="top">
              <el-button @click="dialog.type = true" style="width: 100%" plain
                ><i class="bx bx-plus"
              /></el-button>
            </el-tooltip>
            <DepenseTypeCreateModal v-model="dialog.type" />
          </el-col>
        </el-row>
      </Field>
    </div>
    <div class="mb-2">
      <label for="description" class="form-label">Description</label>
      <Field
        name="description"
        class="form-control"
        id="description"
        as="textarea"
        cols="30"
        rows="5"
        :class="{ 'is-invalid': props.errors.description }"
      />
      <div class="invalid-feedback" v-if="errors.description">
        {{ props.errors.description }}
      </div>
    </div>
  </div>
</template>

<style scoped></style>
