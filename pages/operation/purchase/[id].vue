<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useAchatStore } from "~/store/achat";

definePageMeta({ middleware: "auth" });
const { getOne } = useAchatStore();
const { achat, loading } = storeToRefs(useAchatStore());
onMounted(async () => {
  await getOne(Number(useRoute().params.id));
  useHead({ title: "Achat " + achat?.value?.code });
});
</script>

<template>
  <div class="page-content" v-loading="loading.edit">
    <div class="container-fluid" v-if="!loading.edit">
      <div class="row">
        <div class="col-12">
          <div class="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 class="mb-sm-0 font-size-18">Détails Achat {{ achat?.code }}</h4>
            <div class="page-title-right">
              <ol class="breadcrumb m-0">
                <li class="breadcrumb-item"><nuxt-link to="/">Acceuil</nuxt-link></li>
                <li class="breadcrumb-item">
                  <nuxt-link to="/operation/purchase">Achats</nuxt-link>
                </li>
                <li class="breadcrumb-item active">{{ achat?.code }}</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-xl-7">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title mb-4">Détails du clients</h4>
              <PersonneDescriptionComponent :personne="achat?.personne!" />
            </div>
          </div>
        </div>

        <div class="col-xl-5">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title mb-4">Détails du Biens</h4>
              <BienDescriptionComponent :bien="achat?.bien!" />
            </div>
          </div>
        </div>
      </div>
      <!-- end row -->

      <div class="row">
        <div class="col-xl-7">
          <div class="card">
            <div class="card-body">
              <div class="table-responsive">
                <AchatPaiementTableComponent :paiements="achat?.paiements!" />
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-5">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title mb-4">Détails de l'achat</h4>
              <el-descriptions direction="horizontal" :column="2" size="large">
                <el-descriptions-item label="Montant versé:"
                  >{{ achat?.total }} FCFA
                </el-descriptions-item>
                <el-descriptions-item label="Reste à payer :"
                  >{{ achat?.reste }} FCFA</el-descriptions-item
                >
                <el-descriptions-item label="Date :">{{ achat?.created_at }}</el-descriptions-item>
              </el-descriptions>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
