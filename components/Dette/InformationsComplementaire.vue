<script lang="ts" setup>
import { useVisiteStore } from "~/store/visite";
import { usePaiementStore } from "~/store/paiement";
import { useProprietaireStore } from "~/store/proprietaire";
import { storeToRefs } from "pinia";

const props = defineProps<{ origine: number; type: string }>();
const { getOne: getVisite } = useVisiteStore();
const { visite, loading: visiteLoading } = storeToRefs(useVisiteStore());
const { getOne: getPaiement } = usePaiementStore();
const { paiement, loading: paiementLoading } = storeToRefs(usePaiementStore());
const { getOne: getProprietaire } = useProprietaireStore();
const { proprietaire, loading: ownerLoading } = storeToRefs(useProprietaireStore());
const isOrigineVisite = computed<boolean>(() => props.type === "Visite");
isOrigineVisite.value ? getVisite(props.origine) : getPaiement(props.origine);
</script>

<template>
  <div v-if="isOrigineVisite" v-loading="visiteLoading.edit">
    <el-collapse accordion class="my-4">
      <el-collapse-item title="Informations de la visite" name="visite">
        <VisiteDescriptionComponent :visite="visite!" />
      </el-collapse-item>
      <el-collapse-item title="Informations sur le bien" name="bien">
        <BienDescriptionComponent :bien="visite?.appartement!" />
      </el-collapse-item>
      <el-collapse-item title="Informations sur le client" name="client">
        <PersonneDescriptionComponent :personne="visite?.personne!" />
      </el-collapse-item>
      <el-collapse-item name="proprietaire">
        <template #title>
          <el-button
            v-if="!proprietaire"
            @click="getProprietaire(visite?.appartement?.proprietaire_id!)"
            :loading="ownerLoading.edit"
            type="primary"
            text
            >Charger les données du propriétaire</el-button
          >
          <span v-else>Informations sur le propriétaire</span>
        </template>
        <ProprietaireDescriptionComponent :proprietaire="proprietaire" />
      </el-collapse-item>
    </el-collapse>
  </div>
  <div v-else v-loading="paiementLoading.edit">
    <PaiementDescriptionComponent :paiement="paiement" />
  </div>
</template>

<style scoped></style>
