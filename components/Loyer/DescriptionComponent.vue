<script lang="ts" setup>
import { Loyer } from "~/types/loyer";

const props = defineProps<{ loyer: Loyer }>();
</script>

<template>
  <el-descriptions direction="horizontal" :column="2" size="large">
    <el-descriptions-item v-if="props.loyer?.code" label="Code:"
      >{{ props.loyer?.code }}
    </el-descriptions-item>
    <el-descriptions-item v-if="props.loyer?.montant" label="Montant:"
      >{{ props.loyer?.montant }}
    </el-descriptions-item>
    <el-descriptions-item v-if="props.loyer?.status" label="Dette sur:"
      >{{ props.loyer?.status }}
    </el-descriptions-item>
    <el-descriptions-item v-if="props.loyer?.created_at" label="Date:"
      >{{ props.loyer?.created_at }}
    </el-descriptions-item>
  </el-descriptions>
  <PersonneDescriptionComponent :personne="props.loyer?.personne" />
  <BienDescriptionComponent :bien="props.loyer?.bien" />
</template>

<style scoped></style>
