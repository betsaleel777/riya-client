<script lang="ts" setup>
import type { Loyer } from "~/types/loyer";
import { useCurrency } from "~/composables/numeral";

const props = defineProps<{ loyer: Loyer | undefined }>();
</script>

<template>
  <PersonneDescriptionComponent :personne="props.loyer?.personne" />
  <el-divider content-position="center"><el-text type="primary">Détails du propriétaire</el-text></el-divider>
  <LazyProprietaireDescriptionComponent v-if="props.loyer?.proprietaire" :proprietaire="props.loyer?.proprietaire" />
  <el-divider content-position="center"><el-text type="primary">Détails de la dette</el-text></el-divider>
  <el-descriptions direction="horizontal" :column="2" size="large">
    <el-descriptions-item v-if="props.loyer?.code" label="Code:">{{ props.loyer?.code }}
    </el-descriptions-item>
    <el-descriptions-item v-if="props.loyer?.montant" label="Montant:">{{ useCurrency(props.loyer?.montant) }}
    </el-descriptions-item>
    <el-descriptions-item v-if="props.loyer?.status" label="Statut:">{{ props.loyer?.status }}
    </el-descriptions-item>
    <el-descriptions-item v-if="props.loyer?.created_at" label="Date:">{{ props.loyer?.created_at }}
    </el-descriptions-item>
    <el-descriptions-item v-if="props.loyer?.bien" label="Bien :">
      {{ props.loyer?.bien.nom }}
    </el-descriptions-item>
    <el-descriptions-item v-if="props.loyer?.paid !== undefined" label="Montant Versé :">
      {{ useCurrency(props.loyer?.paid) }}
    </el-descriptions-item>
    <el-descriptions-item v-if="props.loyer?.paid !== undefined && props.loyer?.montant !== undefined"
      label="Reste à Payer :">{{ useCurrency(props.loyer?.montant - props.loyer?.paid) }}</el-descriptions-item>
  </el-descriptions>
</template>

<style scoped></style>
