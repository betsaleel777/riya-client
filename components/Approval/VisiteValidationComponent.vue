<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useVisiteStore } from "~/store/visite";
const { pending, loading } = storeToRefs(useVisiteStore());
const { getPending } = useVisiteStore();
getPending();
const { search, filterCardData: visites } = useVisiteValidationFilter(pending);
const { runShowModal, show } = useShowModal();
</script>

<template>
  <div class="container-fluid">
    <div v-loading="loading.index">
      <div class="d-flex align-items-baseline mb-2">
        <h5 class="w-75">Visites</h5>
        <el-input
          v-model="search"
          class="25"
          :suffix-icon="ElIconSearch"
          placeholder="rechercher"
        />
      </div>
      <el-scrollbar v-if="visites.length > 0">
        <div class="row flex-row flex-nowrap">
          <div class="col-xl-4 col-sm-6" v-for="(visite, key) in visites" :key="key">
            <div class="card">
              <div class="card-body p-3">
                <div class="d-flex">
                  <div class="flex-shrink-0 me-4">
                    <div class="avatar-md">
                      <span
                        class="avatar-title badge-primary-subtle rounded-circle text-danger font-size-16"
                      >
                        <el-tooltip
                          v-if="visite?.avatar"
                          :content="visite?.personne"
                          placement="top"
                        >
                          <el-avatar :src="visite?.avatar" size="large" />
                        </el-tooltip>
                        <el-tooltip v-else :content="visite?.personne" placement="top">
                          <el-avatar class="bg-transparent" size="large">{{
                            visite?.personne.substring(0, 2)
                          }}</el-avatar>
                        </el-tooltip>
                      </span>
                    </div>
                  </div>
                  <div class="flex-grow-1 overflow-hidden">
                    <h5 class="text-truncate font-size-15 text-dark">
                      {{ visite?.code + "-" + visite?.montant }} FCFA
                    </h5>
                    <el-tooltip :content="visite?.bien" placement="right">
                      <span class="text-muted text-truncate mb-0">{{ visite?.bien }}</span
                      ><br />
                    </el-tooltip>
                    <p class="headline mb-0">{{ visite?.created_at }}</p>
                  </div>
                </div>
              </div>
              <div class="d-flex border-top justify-content-center px-1 py-1">
                <el-button @click="runShowModal(visite?.id!)" class="w-100" type="primary" plain
                  >consulter et valider</el-button
                >
              </div>
            </div>
          </div>
          <LazyVisiteShowModal
            :id="show.id"
            v-if="show.enable"
            v-model="show.enable"
            :from-validation-page="true"
          />
        </div>
      </el-scrollbar>
      <el-empty v-else :image-size="80">
        <template #description>
          <el-text class="headline">aucune visite à valider</el-text>
        </template>
      </el-empty>
    </div>
  </div>
</template>

<style scoped></style>
