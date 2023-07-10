<script lang="ts" setup>
import { Appartement } from "~/types/appartement";
import { Terrain } from "~/types/terrain";

const props = defineProps<{
  bien: Appartement | Terrain;
}>();
</script>

<template>
  <el-descriptions direction="horizontal" :column="2" size="large">
    <el-descriptions-item label="Nom:">{{ props.bien?.nom }} </el-descriptions-item>
    <el-descriptions-item label="Pays :">{{ props.bien?.pays }}</el-descriptions-item>
    <el-descriptions-item label="Ville :">{{ props.bien?.ville }}</el-descriptions-item>
    <el-descriptions-item label="Quartier :">{{ props.bien?.quartier }}</el-descriptions-item>
    <el-descriptions-item label="Coût d'achat:"
      >{{ props.bien?.cout_achat }} FCFA</el-descriptions-item
    >
    <el-descriptions-item label="Loyer:"
      >{{ props.bien?.montant_location }} FCFA</el-descriptions-item
    >
    <el-descriptions-item label="Montant investit:"
      >{{ props.bien?.montant_investit }} FCFA</el-descriptions-item
    >
    <el-descriptions-item label="Superficie:">{{ props.bien?.superficie }} m²</el-descriptions-item>
  </el-descriptions>
</template>

<style scoped></style>
