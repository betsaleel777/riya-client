<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useLoyerStore } from "~/store/loyer";
const { pendingValidations, loading } = storeToRefs(useLoyerStore());
const { getPending } = useLoyerStore();
getPending();
const { search, filterCardData: loyers } = useLoyerValidationFilter(pendingValidations);
const { runShowModal, show } = useShowModal();
</script>

<template>
  <div class="container-fluid">
    <div v-loading="loading.index">
      <div class="d-flex align-items-baseline mb-2">
        <h5 class="w-75">Loyers</h5>
        <el-input
          v-model="search"
          class="25"
          :suffix-icon="ElIconSearch"
          placeholder="rechercher selon le code et le nom du bien"
        />
      </div>
      <el-scrollbar v-if="loyers.length > 0">
        <div class="row flex-row flex-nowrap">
          <div class="col-xl-4 col-sm-6" v-for="(loyer, key) in loyers" :key="key">
            <div class="card">
              <div class="card-body p-3">
                <div class="d-flex">
                  <div class="flex-shrink-0 me-4">
                    <div class="avatar-md">
                      <span
                        class="avatar-title badge-primary-subtle rounded-circle text-danger font-size-16"
                      >
                        <el-tooltip
                          v-if="loyer?.avatar"
                          :content="`Le client: ${loyer.personne}`"
                          placement="top"
                        >
                          <el-avatar
                            class="bg-transparent"
                            :src="loyer?.avatar"
                            :size="70"
                          ></el-avatar>
                        </el-tooltip>
                        <el-tooltip :content="`Le client: ${loyer.personne}`" placement="top">
                          <el-avatar class="bg-transparent" size="large">
                            {{ loyer.personne.substring(0, 2).toUpperCase() }}</el-avatar
                          >
                        </el-tooltip>
                      </span>
                    </div>
                  </div>
                  <div class="flex-grow-1 overflow-hidden">
                    <h5 class="text-truncate font-size-15 text-dark">{{ loyer?.montant }} FCFA</h5>
                    <el-tooltip :content="loyer?.bien" placement="right">
                      <p class="text-muted text-truncate mb-0">{{ loyer?.bien }}</p>
                    </el-tooltip>
                    <p class="headline mb-0">{{ loyer?.created_at }}</p>
                  </div>
                </div>
              </div>
              <div class="d-flex border-top justify-content-center px-1 py-1">
                <el-button @click="runShowModal(loyer?.id!)" class="w-100" color="#556ee6" plain
                  >consulter et valider</el-button
                >
              </div>
            </div>
          </div>
          <LazyLoyerShowModal
            :id="show.id"
            v-if="show.enable"
            v-model="show.enable"
            :from-validation-page="true"
          />
        </div>
      </el-scrollbar>
      <el-empty v-else class="bg-white" :image-size="80">
        <template #description>
          <el-text class="text-dark headline">aucun loyer à valider</el-text>
        </template>
      </el-empty>
    </div>
  </div>
</template>

<style scoped></style>
