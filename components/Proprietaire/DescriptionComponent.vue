<script lang="ts" setup>
import type { Proprietaire } from "~/types/proprietaire";
const props = withDefaults(
  defineProps<{ proprietaire?: Proprietaire; extend?: boolean; id?: number }>(),
  { extend: false },
);
const proprietaireId = computed(() => props.id ?? props.proprietaire?.id);
</script>

<template>
  <el-descriptions direction="horizontal" :column="2" size="large">
    <el-descriptions-item v-if="props.proprietaire?.cni" label="Code CNI:">
      {{ props.proprietaire?.cni }}</el-descriptions-item>
    <el-descriptions-item v-if="props.proprietaire?.nom_complet" label="Nom & Prénoms:">
      {{ props.proprietaire?.nom_complet }}</el-descriptions-item>
    <el-descriptions-item v-if="props.proprietaire?.email" label="Email:">
      {{ props.proprietaire?.email }}</el-descriptions-item>
    <el-descriptions-item v-if="props.proprietaire?.telephone" label="Telephone:">{{
      props.proprietaire?.telephone
      }}</el-descriptions-item>
    <el-descriptions-item v-if="props.proprietaire?.created_at" label="Date de creéation:">{{
      props.proprietaire?.created_at
      }}</el-descriptions-item>
  </el-descriptions>
  <LazyProprietaireListeContrat v-if="props.extend && proprietaireId"
    :proprietaire-name="props.proprietaire?.nom_complet" :id="proprietaireId" />
</template>

<style scoped></style>
