<script lang="ts" setup>
import { Dette } from "~/types/dette";
const props = defineProps<{ dette: Dette }>();
</script>

<template>
  <el-descriptions direction="horizontal" :column="2" size="large">
    <el-descriptions-item v-if="props.dette?.code" label="Code:"
      >{{ props.dette?.code }}
    </el-descriptions-item>
    <el-descriptions-item v-if="props.dette?.montant" label="Montant:"
      >{{ useCurrency(props.dette?.montant) }}
    </el-descriptions-item>
    <el-descriptions-item v-if="props.dette?.origine_type" label="Dette sur:"
      >{{ props.dette?.origine_type }}
    </el-descriptions-item>
    <el-descriptions-item v-if="props.dette?.created_at" label="Date:"
      >{{ props.dette?.created_at }}
    </el-descriptions-item>
    <el-descriptions-item v-if="props.dette?.contrat" label="Debut du contrat:"
      >{{ props.dette?.contrat?.debut }}
    </el-descriptions-item>
    <el-descriptions-item v-if="props.dette?.contrat" label="Commission:"
      >{{ props.dette?.contrat?.commission }} %
    </el-descriptions-item>
  </el-descriptions>
  <DetteInformationsComplementaire :type="dette?.origine_type" :origine="dette.origine?.id" />
</template>

<style scoped></style>
