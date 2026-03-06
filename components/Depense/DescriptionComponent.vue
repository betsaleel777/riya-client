<script lang="ts" setup>
import type { Depense } from "~/types/depense";
import { useCurrency } from "~/composables/numeral";

const props = defineProps<{ depense: Depense | undefined }>();
</script>

<template>
  <el-descriptions direction="horizontal" :column="2" size="large">
    <el-descriptions-item v-if="props.depense?.titre" label="Titre:">{{ props.depense?.titre }}
    </el-descriptions-item>
    <el-descriptions-item v-if="props.depense?.type" label="Type de dépense :">{{
      props.depense?.type.nom
    }}</el-descriptions-item>
    <el-descriptions-item v-if="props.depense?.montant" label="Montant :">{{
      useCurrency(props.depense?.montant)
    }}</el-descriptions-item>
    <el-descriptions-item v-if="props.depense?.date_depense" label="Date:">
      {{ $dayjs(props.depense?.date_depense).format('DD-MM-YYYY') }}
    </el-descriptions-item>
  </el-descriptions>
  <div v-if="props.depense?.description">
    <h5 class="text-center">Description</h5>
    <p>{{ props.depense?.description }}</p>
  </div>
</template>

<style scoped></style>
