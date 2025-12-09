<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useSocieteStore } from "@/store/societe";
useHead({ title: "Sociéte" });
definePageMeta({
  middleware: ["auth", "nuxt-permissions"],
  roles: [rolesNames.admin],
});
const { getOne, getCount } = useSocieteStore();
const { societe, loading } = storeToRefs(useSocieteStore());
onMounted(async () => {
  await getOne();
  await getCount();
});
</script>

<template>
  <div class="page-content">
    <div class="container-fluid">
      <!-- start page title -->
      <div class="row">
        <div class="col-12">
          <div class="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 class="mb-sm-0 font-size-18">Société</h4>

            <div class="page-title-right">
              <ol class="breadcrumb m-0">
                <li class="breadcrumb-item"><nuxt-link to="/">Accueil</nuxt-link></li>
                <li class="breadcrumb-item active">Sociéte</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <!-- end page title -->

      <div v-loading="loading" element-loading-text="Chargement en cours ..."
        element-loading-background="rgba(122, 122, 122, 0.9)">
        <SocietePageContentComponent v-if="!loading" :societe="societe" />
      </div>
      <!-- end row -->
    </div>
    <!-- container-fluid -->
  </div>
</template>

<style scoped></style>
