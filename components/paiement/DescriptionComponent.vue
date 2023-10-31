<script lang="ts" setup>
import { Paiement } from "~/types/paiements";

const props = defineProps<{ paiement: Paiement }>();
</script>

<template>
  <el-divider content-position="left">Paiement</el-divider>
  <el-descriptions direction="horizontal" :column="2" size="large">
    <el-descriptions-item v-if="props.paiement?.code" label="Code:"
      >{{ props.paiement?.code }}
    </el-descriptions-item>
    <el-descriptions-item v-if="props.paiement?.montant" label="Montant:"
      >{{ props.paiement?.montant }} FCFA
    </el-descriptions-item>
    <el-descriptions-item v-if="props.paiement?.payable_type" label="paiement sur:"
      >{{ props.paiement?.payable_type }}
    </el-descriptions-item>
    <el-descriptions-item v-if="props.paiement?.created_at" label="Date:"
      >{{ props.paiement?.created_at }}
    </el-descriptions-item>
  </el-descriptions>
  <el-divider content-position="left">{{ props.paiement?.payable_type }}</el-divider>
  <el-descriptions direction="horizontal" :column="2" size="large">
    <el-descriptions-item
      v-if="props.paiement?.payable?.code"
      :label="`Code ${props.paiement?.payable_type}`"
      >{{ props.paiement?.payable?.code }}
    </el-descriptions-item>
    <el-descriptions-item
      v-if="props.paiement?.payable?.created_at"
      :label="`Date ${props.paiement?.payable_type}`"
      >{{ props.paiement?.payable?.created_at }}
    </el-descriptions-item>
    <el-descriptions-item v-if="props.paiement?.payable?.total" label="Déjà Versé:"
      >{{ props.paiement?.payable?.total }} FCFA
    </el-descriptions-item>
    <el-descriptions-item v-if="props.paiement?.payable?.reste !== undefined" label="Reste à payer:"
      >{{ props.paiement?.payable?.reste }} FCFA
    </el-descriptions-item>
  </el-descriptions>
  <el-divider content-position="left">Client</el-divider>
  <el-descriptions direction="horizontal" :column="2" size="large">
    <el-descriptions-item
      v-if="props.paiement?.payable?.personne?.nom_complet"
      label="Nom & prénoms:"
      >{{ props.paiement?.payable?.personne?.nom_complet }}
    </el-descriptions-item>
    <el-descriptions-item v-if="props.paiement?.payable?.personne?.quartier" label="Quartier:"
      >{{ props.paiement?.payable?.personne?.quartier }}
    </el-descriptions-item>
    <el-descriptions-item v-if="props.paiement?.payable?.personne?.telephone" label="Téléphone:"
      >{{ props.paiement?.payable?.personne?.telephone }}
    </el-descriptions-item>
    <el-descriptions-item v-if="props.paiement?.payable?.personne?.ville" label="Ville:"
      >{{ props.paiement?.payable?.personne?.ville }}
    </el-descriptions-item>
  </el-descriptions>
  <el-divider content-position="left">Bien</el-divider>
  <el-descriptions direction="horizontal" :column="2" size="large">
    <el-descriptions-item v-if="props.paiement?.payable?.bien?.nom" label="Nom:"
      >{{ props.paiement?.payable?.bien?.nom }}
    </el-descriptions-item>
    <el-descriptions-item v-if="props.paiement?.payable?.bien?.superficie" label="Superficie:"
      >{{ props.paiement?.payable?.bien?.superficie }} m²
    </el-descriptions-item>
    <el-descriptions-item v-if="props.paiement?.payable?.bien?.cout_achat" label="Coût d'achat:"
      >{{ props.paiement?.payable?.bien?.cout_achat }} FCFA
    </el-descriptions-item>
    <el-descriptions-item v-if="props.paiement?.payable?.bien?.quartier" label="Quartier:"
      >{{ props.paiement?.payable?.bien?.quartier }}
    </el-descriptions-item>
    <el-descriptions-item v-if="props.paiement?.payable?.bien?.montant_location" label="Loyer:"
      >{{ props.paiement?.payable?.bien?.montant_location }} FCFA
    </el-descriptions-item>
  </el-descriptions>
</template>

<style scoped></style>
