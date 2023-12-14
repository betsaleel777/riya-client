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
        <h5 class="w-75">Remboursements</h5>
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
                      <span
                        class="avatar-title badge-primary-subtle rounded-circle text-danger font-size-16"
                      >
                        <el-tooltip
                          v-if="dette?.audit"
                          :content="`L'utilisateur: ${dette?.audit.user.name}`"
                          placement="top"
                        >
                          <el-image
                            class="bg-transparent"
                            style="width: 70px; height: 70px"
                            fit="fill"
                            :src="dette?.audit.user.photo"
                            :preview-src-list="[dette?.audit.user.photo]"
                            lazy
                          ></el-image>
                        </el-tooltip>
                        <el-tooltip
                          v-else
                          :content="`L'utilisateur: ${dette?.audit.user.name}`"
                          placement="top"
                        >
                          <el-avatar class="bg-transparent" size="large">
                            {{ dette?.audit.user.name.substring(0, 2).toUpperCase() }}</el-avatar
                          >
                        </el-tooltip>
                      </span>
                    </div>
                  </div>
                  <div class="flex-grow-1 overflow-hidden">
                    <h5 class="text-truncate font-size-15 text-dark">
                      {{ useCurrency(dette?.montant) }}
                    </h5>
                    <p class="text-muted mb-0">{{ dette?.code }}</p>
                    <p class="headline mb-2">{{ dette?.created_at }}</p>
                    <el-tag size="small">{{ dette?.origine }}</el-tag>
                  </div>
                </div>
              </div>
              <div class="d-flex border-top justify-content-center px-1 py-1">
                <el-button @click="runShowModal(dette?.id!)" class="w-100" type="primary" plain
                  >consulter et valider</el-button
                >
              </div>
            </div>
          </div>
          <LazyDetteShowModal
            :id="show.id"
            v-model="show.enable"
            v-if="show.enable"
            :from-validation-page="true"
          />
        </div>
      </el-scrollbar>
      <el-empty v-else class="bg-white" :image-size="80">
        <template #description>
          <el-text class="text-dark headline">aucun remboursement à valider</el-text>
        </template>
      </el-empty>
    </div>
  </div>
</template>

<style scoped></style>
