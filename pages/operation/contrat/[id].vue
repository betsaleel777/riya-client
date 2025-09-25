<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useContratStore } from "~/store/contrat";

definePageMeta({
  middleware: ["auth", "nuxt-permissions"],
  roles: [rolesNames.employee, rolesNames.admin],
});
const { getOne } = useContratStore();
const { contrat, loading } = storeToRefs(useContratStore());
getOne(Number(useRoute().params.id)).then(() => {
  useHead({ title: "Contrat " + contrat?.value?.code });
});
</script>

<template>
  <div class="page-content" v-loading="loading.edit">
    <div class="container-fluid" v-if="!loading.edit">
      <div class="row">
        <div class="col-12">
          <div class="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 class="mb-sm-0 font-size-18">Détails Contrat {{ contrat?.code }}</h4>
            <div class="page-title-right">
              <ol class="breadcrumb m-0">
                <li class="breadcrumb-item"><nuxt-link to="/">Acceuil</nuxt-link></li>
                <li class="breadcrumb-item">
                  <nuxt-link to="/operation/contrat">Contrats</nuxt-link>
                </li>
                <li class="breadcrumb-item active">{{ contrat?.code }}</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <LazyContratVisitePrint
          v-if="!loading.edit && contrat?.operation_type === typeContrat.visite"
          :contrat="contrat"
        />
        <el-empty
          v-if="!loading.edit && contrat?.operation_type === typeContrat.achat"
          description="Aucun exemplaire de contrat n'as été fournit pour l'instant."
        ></el-empty>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
