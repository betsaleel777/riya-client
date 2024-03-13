<script lang="ts" setup>
import { Loyer } from "~/types/loyer";
const props = defineProps<{ loyer: Loyer }>();
</script>

<template>
  <PersonneDescriptionComponent :personne="props.loyer?.personne" />
  <el-descriptions direction="horizontal" :column="2" size="large">
    <el-descriptions-item v-if="props.loyer?.code" label="Code:"
      >{{ props.loyer?.code }}
    </el-descriptions-item>
    <el-descriptions-item v-if="props.loyer?.montant" label="Montant:"
      >{{ useCurrency(props.loyer?.montant) }}
    </el-descriptions-item>
    <el-descriptions-item v-if="props.loyer?.status" label="Statut:"
      >{{ props.loyer?.status }}
    </el-descriptions-item>
    <el-descriptions-item v-if="props.loyer?.created_at" label="Date:"
      >{{ props.loyer?.created_at }}
    </el-descriptions-item>
    <el-descriptions-item v-if="props.loyer?.bien" label="Bien :">{{
      props.loyer?.bien.nom
    }}</el-descriptions-item>
    <el-descriptions-item v-if="props.loyer?.paid !== undefined" label="Montant Versé :">{{
      useCurrency(props.loyer?.paid)
    }}</el-descriptions-item>
    <el-descriptions-item
      v-if="props.loyer?.paid !== undefined && props.loyer?.montant !== undefined"
      label="Reste à Payer :"
      >{{ useCurrency(props.loyer?.montant - props.loyer?.paid) }}</el-descriptions-item
    >
  </el-descriptions>
</template>

<style scoped></style>
