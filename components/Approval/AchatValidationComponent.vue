<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useAchatStore } from "~/store/achat";
const { pendingValidations, loading } = storeToRefs(useAchatStore());
const { getPending } = useAchatStore();
getPending();
const { search, filterCardData: achats } = useAchatValidationFilter(pendingValidations);
const { runShowModal, show } = useShowModal();
</script>

<template>
  <div class="container-fluid">
    <div v-loading="loading.index">
      <div class="d-flex align-items-baseline mb-2">
        <h5 class="w-75">Achats</h5>
        <el-input v-model="search" class="25" :suffix-icon="ElIconSearch" placeholder="rechercher" />
      </div>
      <el-scrollbar v-if="achats.length > 0">
        <div class="row flex-row flex-nowrap">
          <div class="col-xl-4 col-sm-6" v-for="(achat, key) in achats" :key="key">
            <div class="card">
              <div class="card-body p-3">
                <div class="d-flex">
                  <div class="flex-shrink-0 me-4 align-self-center">
                    <div class="avatar-md">
                      <span class="avatar-title badge-primary-subtle rounded-circle text-danger font-size-16">
                        <el-tooltip v-if="achat?.avatar" :content="`Le client: ${achat.personne}`" placement="top">
                          <el-image class="bg-transparent rounded-circle avatar-image" fit="fill"
                            :src="achat?.avatar.url" :preview-src-list="[achat?.avatar.url]" lazy>
                            <template #error>
                              <el-icon size="35" class="text-white">
                                <ElIconUser />
                              </el-icon>
                            </template>
                          </el-image>
                        </el-tooltip>
                        <el-tooltip v-else :content="`Le client: ${achat.personne}`" placement="top">
                          <el-avatar class="bg-transparent" size="large">{{
                            achat.personne.substring(0, 2).toUpperCase()
                            }}</el-avatar>
                        </el-tooltip>
                      </span>
                    </div>
                  </div>
                  <div class="flex-grow-1 overflow-hidden">
                    <el-tooltip content="montant payé par le client à valider" placement="right">
                      <h5 class="text-truncate font-size-15 text-dark">
                        {{ useCurrency(achat.montant) }}
                      </h5>
                    </el-tooltip>
                    <h6>{{ achat?.code }}</h6>
                    <el-tooltip :content="achat?.bien" placement="right">
                      <p class="text-muted text-truncate mb-0">{{ achat?.bien }}</p>
                    </el-tooltip>
                    <p class="headline mb-0">{{ achat?.created_at }}</p>
                    <el-tooltip content="coût total d'achat du bien" placement="right">
                      <el-text class="w-200px headline text-uppercase text-primary" truncated>{{
                        useCurrency(achat?.cout)
                        }}</el-text>
                    </el-tooltip>
                  </div>
                </div>
              </div>
              <div class="d-flex border-top justify-content-center px-1 py-1">
                <el-button @click="runShowModal(achat?.id!)" class="w-100" type="primary" plain>consulter et
                  valider</el-button>
              </div>
            </div>
          </div>
          <LazyAchatShowModal :id="show.id" v-if="show.enable" v-model="show.enable" :from-validation-page="true" />
        </div>
      </el-scrollbar>
      <el-empty v-else :image-size="80">
        <template #description>
          <el-text class="headline">aucune achat à valider</el-text>
        </template>
      </el-empty>
    </div>
  </div>
</template>

<style scoped></style>
