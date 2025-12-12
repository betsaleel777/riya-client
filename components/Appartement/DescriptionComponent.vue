<script lang="ts" setup>
import type { Appartement } from "~/types/appartement";

const props = defineProps<{ appartement: Appartement | undefined }>();
</script>

<template>
  <BienDescriptionComponent :bien="props.appartement" class="mb-0" />
  <el-descriptions direction="horizontal" :column="2" size="large">
    <el-descriptions-item v-if="props.appartement?.cours_commune" label="Cour commune:">
      <input class="form-check-input" type="checkbox" onclick="return false"
        :checked="props.appartement?.cours_commune" />
    </el-descriptions-item>
    <el-descriptions-item v-if="props.appartement?.placard" label="Placard:">
      <input class="form-check-input" type="checkbox" onclick="return false" :checked="props.appartement?.placard" />
    </el-descriptions-item>
    <el-descriptions-item v-if="props.appartement?.etage" label="Etage:">
      <input class="form-check-input" type="checkbox" onclick="return false" :checked="props.appartement?.etage" />
    </el-descriptions-item>
    <el-descriptions-item v-if="props.appartement?.garage" label="Garage:">
      <input class="form-check-input" type="checkbox" onclick="return false" :checked="props.appartement?.garage" />
    </el-descriptions-item>
    <el-descriptions-item v-if="props.appartement?.toilette" label="Toilette:">
      <input class="form-check-input" type="checkbox" onclick="return false" :checked="props.appartement?.toilette" />
    </el-descriptions-item>
    <el-descriptions-item v-if="props.appartement?.cuisine" label="Cuisine:">
      <input class="form-check-input" type="checkbox" onclick="return false" :checked="props.appartement?.cuisine" />
    </el-descriptions-item>
    <el-descriptions-item v-if="props.appartement?.parking" label="Parking:">
      <input class="form-check-input" type="checkbox" onclick="return false" :checked="props.appartement?.parking" />
    </el-descriptions-item>
    <el-descriptions-item v-if="props.appartement?.cie" label="Courant:">
      <input class="form-check-input" type="checkbox" onclick="return false" :checked="props.appartement?.cie" />
    </el-descriptions-item>
    <el-descriptions-item v-if="props.appartement?.socdeci" label="Eau:">
      <input class="form-check-input" type="checkbox" onclick="return false" :checked="props.appartement?.socdeci" />
    </el-descriptions-item>
    <el-descriptions-item v-if="props.appartement?.cloture" label="Clôture:">
      <input class="form-check-input" type="checkbox" onclick="return false" :checked="props.appartement?.cloture" />
    </el-descriptions-item>
    <el-descriptions-item v-if="props.appartement?.type" label="Type d'appartement:">
      {{ props.appartement?.type }}
    </el-descriptions-item>
    <el-descriptions-item v-if="props.appartement?.observation" label="Observations:">
      {{ props.appartement?.observation }}
    </el-descriptions-item>
  </el-descriptions>
</template>

<style scoped></style>
