<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useDepenseStore } from "~/store/depense";
const { pending, loading } = storeToRefs(useDepenseStore());
const { getPending } = useDepenseStore();
getPending();
const { search, filterCardData: depenses } = useDepenseValidationFilter(pending);
const { runShowModal, show } = useShowModal();
</script>

<template>
  <div class="container-fluid">
    <div v-loading="loading.index">
      <div class="d-flex align-items-baseline mb-2">
        <h5 class="w-75">Dépenses</h5>
        <el-input
          v-model="search"
          class="25"
          :suffix-icon="ElIconSearch"
          placeholder="rechercher"
        />
      </div>
      <el-scrollbar v-if="depenses.length > 0">
        <div class="row flex-row flex-nowrap">
          <div class="col-xl-4 col-sm-6" v-for="(depense, key) in depenses" :key="key">
            <div class="card">
              <div class="card-body p-3">
                <div class="d-flex">
                  <div class="flex-shrink-0 me-4">
                    <div class="avatar-md">
                      <span
                        class="avatar-title badge-primary-subtle rounded-circle text-danger font-size-16"
                      >
                        <el-tooltip content="nom du créateur de la dépense" placement="top">
                          <el-avatar class="bg-transparent" size="large">RE</el-avatar>
                        </el-tooltip>
                      </span>
                    </div>
                  </div>
                  <div class="flex-grow-1 overflow-hidden">
                    <h5 class="text-truncate font-size-15 text-dark">
                      {{ depense?.montant }} FCFA
                    </h5>
                    <el-tooltip :content="depense?.titre" placement="right">
                      <span class="text-muted text-truncate mb-0">{{ depense?.titre }}</span
                      ><br />
                    </el-tooltip>
                    <p class="headline mb-0">{{ depense?.created_at }}</p>
                    <el-tooltip :content="depense?.type" placement="right">
                      <el-text class="w-200px headline text-uppercase text-primary" truncated>{{
                        depense?.type
                      }}</el-text>
                    </el-tooltip>
                  </div>
                </div>
              </div>
              <div class="d-flex border-top justify-content-center px-1 py-1">
                <el-button @click="runShowModal(depense?.id!)" class="w-100" color="#556ee6" plain
                  >consulter et valider</el-button
                >
              </div>
            </div>
          </div>
          <LazyDepenseShowModal
            :id="show.id"
            v-if="show.enable"
            v-model="show.enable"
            :from-validation-page="true"
          />
        </div>
      </el-scrollbar>
      <el-empty v-else class="bg-white" :image-size="80">
        <template #description>
          <el-text class="text-dark headline">aucune dépense à valider</el-text>
        </template>
      </el-empty>
    </div>
  </div>
</template>

<style scoped></style>
