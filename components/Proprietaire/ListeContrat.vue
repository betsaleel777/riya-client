<script setup lang="ts">
import { statusContrat, stateContrat } from "~/utils/constante";
import { storeToRefs } from "pinia";
import { useContratStore } from "~/store/contrat";

const props = defineProps<{ proprietaireName?: string; id: number }>();

const contratStore = useContratStore();
const { details, loading } = storeToRefs(contratStore);
const { getContratsByOwner } = contratStore;
const { filterTableData, setPage, search, total, pageSize } = useOwnerContratFilter(details);

getContratsByOwner(props.id);
watch(() => props.id, (id) => {
  setPage(1);
  getContratsByOwner(id);
});

const classTypeStatus = (status: string): "success" | "danger" => status === statusContrat.notuptodate ? "danger" : "success";
const classTypeEtat = (etat: string): "success" | "warning" => etat === stateContrat.using ? "success" : "warning";
</script>

<template>
  <div class="mt-3">
    <el-divider content-position="left"><el-text type="primary">Détails des biens</el-text></el-divider>
    <div v-if="details.length > 2" class="mb-3 d-flex justify-content-end align-items-center">
      <el-input v-model="search" placeholder="Rechercher un contrat" class="w-25" />
    </div>
    <el-empty v-if="details.length === 0" description="Aucun contrat trouvé" />
    <el-timeline v-loading="loading.index">
      <el-timeline-item v-for="contrat in filterTableData" :key="contrat.id" :timestamp="contrat.debut" placement="top">
        <el-card shadow="hover" class="p-0">
          <div class="d-flex justify-content-between align-items-center mb-1">
            <h6 class="fw-semibold">
              {{ contrat.bien }}
            </h6>
            <div class="d-flex gap-1">
              <el-tag size="small" :type="undefined">{{ contrat.operation_type }}</el-tag>
              <el-tag size="small" :type="classTypeStatus(contrat.status)">
                {{ contrat.status }}
              </el-tag>
              <el-tag size="small" :type="classTypeEtat(contrat.etat)">
                {{ contrat.etat }}
              </el-tag>
            </div>
          </div>

          <div class="mt-1">
            <p class="proprietaire-contrat-card__row d-flex gap-1 mb-0 mt-0">
              <span class="label">Code :</span>
              <span>{{ contrat.code }}</span>
            </p>
            <p class="proprietaire-contrat-card__row d-flex gap-1 mb-0 mt-0">
              <span class="label">Locataire :</span>
              <span class="value">{{ contrat.client }}</span>
            </p>
            <p class="proprietaire-contrat-card__row d-flex gap-1 mb-0 mt-0">
              <span class="label">Période :</span>
              <span class="value">
                {{ contrat.debut }} → {{ contrat.fin }}
              </span>
            </p>
          </div>

          <div class="proprietaire-contrat-card__footer mt-1">
            <span class="footer-text">
              Créé le {{ contrat.created_at }}
            </span>
          </div>
        </el-card>
      </el-timeline-item>
    </el-timeline>
    <div class="d-flex justify-content-center">
      <el-pagination small background layout="prev, pager, next" :total="total" class="mt-4" justify="center"
        v-model:page-size="pageSize" @current-change="setPage" hide-on-single-page />
    </div>
  </div>
</template>

<style scoped>
.proprietaire-contrats-title span {
  color: var(--el-color-primary);
}

.proprietaire-contrats-subtitle {
  color: var(--el-text-color-secondary);
}

.proprietaire-contrat-card__code {
  color: var(--el-text-color-secondary);
}

.proprietaire-contrat-card__code span {
  color: var(--el-text-color-primary);
}

.proprietaire-contrat-card__row .label {
  color: var(--el-text-color-secondary);
}

.proprietaire-contrat-card__row .value {
  color: var(--el-text-color-primary);
}

.proprietaire-contrat-card__footer {
  color: var(--el-text-color-secondary);
}
</style>
