<script lang="ts" setup>
import { Dette } from "~/types/dette";
import { useVisiteStore } from "~/store/visite";
import { usePaiementStore } from "~/store/paiement";
import { storeToRefs } from "pinia";

const props = defineProps<{ dette: Dette }>();
const { getOne: getVisite } = useVisiteStore();
const { visite, loading: visiteLoading } = storeToRefs(useVisiteStore());
const { getOne: getPaiement } = usePaiementStore();
const { paiement, loading: paiementLoading } = storeToRefs(usePaiementStore());
const isOrigineVisite = computed<boolean>(() => props.dette?.origine_type === "Visite");
isOrigineVisite.value
  ? getVisite(props.dette?.origine?.id!)
  : getPaiement(props.dette?.origine?.id!);
</script>

<template>
  <el-descriptions direction="horizontal" :column="2" size="large">
    <el-descriptions-item v-if="props.dette?.code" label="Code:"
      >{{ props.dette?.code }}
    </el-descriptions-item>
    <el-descriptions-item v-if="props.dette?.montant" label="Montant:"
      >{{ props.dette?.montant }}
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
  <div v-if="isOrigineVisite" v-loading="visiteLoading.edit">
    <el-collapse accordion class="my-4">
      <el-collapse-item title="Informations de la visite" name="visite">
        <VisiteDescriptionComponent :visite="visite!" />
      </el-collapse-item>
      <el-collapse-item title="Informations sur le bien" name="bien">
        <BienDescriptionComponent :bien="visite?.appartement!" />
      </el-collapse-item>
      <!-- <el-collapse-item title="Informations sur le client" name="client">
        <PersonneDescriptionComponent :personne="visite?.personne!" />
      </el-collapse-item> -->
    </el-collapse>
  </div>
  <div v-else v-loading="paiementLoading.edit">
    <PaiementDescriptionComponent :paiement="paiement" />
  </div>
</template>

<style scoped></style>
