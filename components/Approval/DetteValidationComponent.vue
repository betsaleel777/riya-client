<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useDetteStore } from "~/store/dette";
const { pendingValidation, loading } = storeToRefs(useDetteStore());
const { getPending } = useDetteStore();
getPending();
const { search, filterCardData: dettes } = useDetteValidationFilter(pendingValidation);
const { runShowModal, show } = useShowModal();
</script>

<template>
  <div class="container-fluid">
    <div v-loading="loading.index">
      <div class="d-flex align-items-baseline mb-2">
        <h5 class="w-75">Dettes</h5>
        <el-input
          v-model="search"
          class="25"
          :suffix-icon="ElIconSearch"
          placeholder="rechercher"
        />
      </div>
      <el-scrollbar v-if="dettes.length > 0">
        <div class="row flex-row flex-nowrap">
          <div class="col-xl-4 col-sm-6" v-for="(dette, key) in dettes" :key="key">
            <div class="card">
              <div class="card-body p-3">
                <div class="d-flex">
                  <div class="flex-shrink-0 align-self-center me-4">
                    <div class="avatar-md">
                      <span class="avatar-title badge-primary-subtle rounded-circle">
                        <el-tooltip content="celui qui a crée la dette" placement="top">
                          <el-avatar class="bg-transparent" size="large">RE</el-avatar>
                        </el-tooltip>
                      </span>
                    </div>
                  </div>
                  <div class="flex-grow-1 overflow-hidden">
                    <h5 class="text-truncate font-size-15 text-dark">{{ dette?.montant }} FCFA</h5>
                    <el-tooltip :content="dette?.bien" placement="right">
                      <span class="text-muted text-truncate mb-0">{{ dette?.bien }}</span
                      ><br />
                    </el-tooltip>
                    <el-tooltip :content="dette?.proprietaire" placement="right">
                      <span class="text-muted text-truncate mb-0">{{ dette?.proprietaire }}</span
                      ><br />
                    </el-tooltip>
                    <p class="text-muted mb-0">{{ dette?.telephone }}</p>
                    <p class="headline mb-0">{{ dette?.created_at }}</p>
                  </div>
                </div>
              </div>
              <div class="d-flex border-top justify-content-center px-1 py-1">
                <el-button @click="runShowModal(dette?.id!)" class="w-100" color="#556ee6" plain
                  >consulter et valider</el-button
                >
              </div>
            </div>
          </div>
          <!-- here put show dette modal -->
        </div>
      </el-scrollbar>
      <el-empty v-else class="bg-white" :image-size="80">
        <template #description>
          <el-text class="text-dark headline">aucune visite à valider</el-text>
        </template>
      </el-empty>
    </div>
  </div>
</template>

<style scoped></style>
