<script lang="ts" setup>
import { Achat } from "~/types/achat";
const props = defineProps<{
  achat?: Achat;
}>();
</script>

<template>
  <el-descriptions direction="horizontal" :column="2" size="large">
    <el-descriptions-item label="Code:">{{ props.achat?.code }} </el-descriptions-item>
    <el-descriptions-item label="Date:">{{ props.achat?.created_at }} </el-descriptions-item>
    <el-descriptions-item label="Client :">{{
      props.achat?.personne.nom_complet
    }}</el-descriptions-item>
    <el-descriptions-item label="Bien :">{{ props.achat?.bien.nom }}</el-descriptions-item>
    <el-descriptions-item label="Montant Versé :">{{ props.achat?.total }}</el-descriptions-item>
    <el-descriptions-item label="Reste à Payer :">{{ props.achat?.reste }}</el-descriptions-item>
  </el-descriptions>
</template>

<style scoped></style>
