<script lang="ts" setup>
import { Client } from "~/types/personne";

const props = defineProps<{
  personne: Client;
}>();
</script>

<template>
  <el-descriptions direction="horizontal" :column="2" size="large">
    <el-descriptions-item label="Nom & prénom:"
      >{{ props?.personne?.civilite }} {{ props.personne?.nom_complet }}
    </el-descriptions-item>
    <el-descriptions-item label="Nationalité:">{{
      props.personne?.nationalite
    }}</el-descriptions-item>
    <el-descriptions-item label="Numéro CNI :">{{ props.personne?.cni }}</el-descriptions-item>
    <el-descriptions-item label="Pays de Résidence :">{{
      props.personne?.pays
    }}</el-descriptions-item>
    <el-descriptions-item label="Quartier:">{{ props.personne?.quartier }}</el-descriptions-item>
    <el-descriptions-item label="Email:">{{ props.personne?.email }} </el-descriptions-item>
    <el-descriptions-item label="Fonctions:">{{ props.personne?.fonctions }}</el-descriptions-item>
    <el-descriptions-item label="Date de naissance:"
      >{{ props.personne?.date_naissance }}
    </el-descriptions-item>
  </el-descriptions>
</template>

<style scoped></style>
