<script lang="ts" setup>
import { Depense } from "~/types/depense";
const props = defineProps<{ depense: Depense }>();
</script>

<template>
  <el-descriptions direction="horizontal" :column="2" size="large">
    <el-descriptions-item label="Titre:">{{ props.depense?.titre }} </el-descriptions-item>
    <el-descriptions-item label="Date:">{{ props.depense?.created_at }} </el-descriptions-item>
    <el-descriptions-item label="Montant :">{{ props.depense?.montant }} FCFA</el-descriptions-item>
    <el-descriptions-item label="Type de dépense :">{{
      props.depense?.type.nom
    }}</el-descriptions-item>
  </el-descriptions>
  <h5 class="text-center">Description</h5>
  <p>{{ props.depense?.description }}</p>
</template>

<style scoped></style>
