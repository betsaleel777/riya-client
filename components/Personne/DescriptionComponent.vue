<script lang="ts" setup>
import { Client } from "~/types/personne";

const props = defineProps<{ personne: Client }>();
</script>

<template>
  <div class="d-flex justify-content-around align-items-center mb-4">
    <el-avatar
      v-if="props.personne?.avatar"
      :src="props.personne?.avatar"
      :size="110"
      shape="circle"
      alt="avatar du client"
    ></el-avatar>
    <el-avatar
      v-if="props.personne?.piece"
      :src="props.personne?.piece"
      :size="110"
      shape="circle"
      alt="piece du client"
    ></el-avatar>
  </div>
  <el-descriptions direction="horizontal" :column="2" size="large">
    <el-descriptions-item v-if="props.personne?.nom_complet" label="Nom & prénom:"
      >{{ props?.personne?.civilite }} {{ props.personne?.nom_complet }}
    </el-descriptions-item>
    <el-descriptions-item v-if="props.personne?.nationalite" label="Nationalité:">{{
      props.personne?.nationalite
    }}</el-descriptions-item>
    <el-descriptions-item v-if="props.personne?.cni" label="Numéro CNI :">{{
      props.personne?.cni
    }}</el-descriptions-item>
    <el-descriptions-item v-if="props.personne?.pays" label="Pays de Résidence :">{{
      props.personne?.pays
    }}</el-descriptions-item>
    <el-descriptions-item v-if="props.personne?.ville" label="Ville :">{{
      props.personne?.ville
    }}</el-descriptions-item>
    <el-descriptions-item v-if="props.personne?.quartier" label="Quartier:">{{
      props.personne?.quartier
    }}</el-descriptions-item>
    <el-descriptions-item v-if="props.personne?.email" label="Email:"
      >{{ props.personne?.email }}
    </el-descriptions-item>
    <el-descriptions-item v-if="props.personne?.fonctions" label="Fonctions:">{{
      props.personne?.fonctions
    }}</el-descriptions-item>
    <el-descriptions-item v-if="props.personne?.date_naissance" label="Date de naissance:"
      >{{ props.personne?.date_naissance }}
    </el-descriptions-item>
    <el-descriptions-item v-if="props.personne?.lieu_naissance" label="Lieu de naissance:"
      >{{ props.personne?.lieu_naissance }}
    </el-descriptions-item>
    <el-descriptions-item v-if="props.personne?.type" label="Type de client:"
      >{{ props.personne?.type }}
    </el-descriptions-item>
    <el-descriptions-item v-if="props.personne?.animal" label="Animal de compagnie:"
      >{{ props.personne?.animal }}
    </el-descriptions-item>
  </el-descriptions>
</template>

<style scoped></style>
