<script lang="ts" setup>
import { Appartement } from "~/types/appartement";

const props = defineProps<{ appartement: Appartement }>();
</script>

<template>
  <BienDescriptionComponent :bien="props.appartement" class="mb-0" />
  <el-descriptions direction="horizontal" :column="2" size="large">
    <el-descriptions-item v-if="props.appartement?.cours_commune" label="Cour commune:"
      ><el-checkbox disabled :checked="props.appartement?.cours_commune"
    /></el-descriptions-item>
    <el-descriptions-item v-if="props.appartement?.placard" label="Placard:"
      ><el-checkbox disabled :checked="props.appartement?.placard"
    /></el-descriptions-item>
    <el-descriptions-item v-if="props.appartement?.etage" label="Etage:"
      ><el-checkbox disabled :checked="props.appartement?.etage"
    /></el-descriptions-item>
    <el-descriptions-item v-if="props.appartement?.garage" label="Garage:"
      ><el-checkbox disabled :checked="props.appartement?.garage"
    /></el-descriptions-item>
    <el-descriptions-item v-if="props.appartement?.toilette" label="Toilette:"
      ><el-checkbox disabled :checked="props.appartement?.toilette"
    /></el-descriptions-item>
    <el-descriptions-item v-if="props.appartement?.cuisine" label="Cuisine:"
      ><el-checkbox disabled :checked="props.appartement?.cuisine"
    /></el-descriptions-item>
    <el-descriptions-item v-if="props.appartement?.parking" label="Parking:"
      ><el-checkbox disabled :checked="props.appartement?.parking"
    /></el-descriptions-item>
    <el-descriptions-item v-if="props.appartement?.cie" label="Courant:"
      ><el-checkbox disabled :checked="props.appartement?.cie"
    /></el-descriptions-item>
    <el-descriptions-item v-if="props.appartement?.socdeci" label="Eau:"
      ><el-checkbox disabled :checked="props.appartement?.socdeci"
    /></el-descriptions-item>
    <el-descriptions-item v-if="props.appartement?.cloture" label="Clôture:"
      ><el-checkbox disabled :checked="props.appartement?.cloture"
    /></el-descriptions-item>
    <el-descriptions-item v-if="props.appartement?.type" label="Type d'appartement:"
      >{{ props.appartement?.type }}
    </el-descriptions-item>
    <el-descriptions-item v-if="props.appartement?.observation" label="Observations:"
      >{{ props.appartement?.observation }}
    </el-descriptions-item>
  </el-descriptions>
</template>

<style scoped></style>
