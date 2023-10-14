<script lang="ts" setup>
import { Proprietaire } from "~/types/proprietaire";
const props = defineProps<{
  proprietaire: Proprietaire;
}>();
</script>

<template>
  <el-descriptions direction="horizontal" :column="2" size="large">
    <el-descriptions-item label="Code CNI:">{{ props.proprietaire?.cni }}</el-descriptions-item>
    <el-descriptions-item label="Nom & Prénoms:">{{ props.proprietaire?.nom_complet }}</el-descriptions-item>
    <el-descriptions-item label="Email:">{{ props.proprietaire?.email }}</el-descriptions-item>
    <el-descriptions-item label="Telephone:">{{ props.proprietaire?.telephone }}</el-descriptions-item>
    <el-descriptions-item label="Date de creéation:">{{ props.proprietaire?.created_at }}</el-descriptions-item>
  </el-descriptions>
</template>

<style scoped></style>
