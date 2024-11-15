<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAchatStore } from "~/store/achat";
import { NuxtLink } from "#components";

useHead({ title: "Achats" });
definePageMeta({
  middleware: ["auth", "nuxt-permissions"],
  roles: [rolesNames.employee, rolesNames.admin],
});
const links = [
  { path: "/", title: "Acceuil" },
  { path: "#", title: "Achats" },
];
const { getAll, trash } = useAchatStore();
const { achats, loading } = storeToRefs(useAchatStore());
getAll();
const { filterTableData, setPage, search, total, pageSize } = usePurchaseFilterPagination(achats);
const { handleDelete, modal } = useHandleCrudButtons(trash);
</script>

<template>
  <div class="page-content">
    <div class="container-fluid">
      <!-- start page title -->
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <StructurePageHeader :breadcrumbs="links" title="Achats">
                <template #options>
                  <el-button @click="modal.create = true" plain type="primary">Ajouter</el-button>
                </template>
                <el-input
                  v-model="search"
                  class="w-50 mt-1 mb-2"
                  placeholder="Code, client, bien"
                />
                <el-table
                  v-loading="loading.index"
                  :data="filterTableData"
                  style="width: 100%"
                  empty-text="aucun achat"
                >
                  <el-table-column prop="code" label="Code" width="120" />
                  <el-table-column prop="personne" label="Client" />
                  <el-table-column show-overflow-tooltip prop="bien" label="Bien" />
                  <el-table-column
                    show-overflow-tooltip
                    prop="total"
                    label="Payé"
                    width="150"
                    sortable
                  >
                    <template #default="scope">
                      {{ useCurrency(scope.row.total) }}
                    </template>
                  </el-table-column>
                  <el-table-column prop="reste" label="Reste" width="150" sortable>
                    <template #default="scope">
                      {{ useCurrency(scope.row.reste) }}
                    </template>
                  </el-table-column>
                  <el-table-column prop="created_at" label="Date" width="110" sortable />
                  <el-table-column width="150" align="right">
                    <template #header>
                      <span>Option</span>
                    </template>
                    <template #default="scope">
                      <el-button
                        :tag="NuxtLink"
                        :to="`/operation/purchase/${scope.row.id}`"
                        type="info"
                        plain
                        circle
                        ><i class="bx bx-show"
                      /></el-button>
                      <el-button
                        type="danger"
                        v-role="rolesNames.admin"
                        @click="
                          handleDelete(
                            scope.row,
                            `Voulez vous réelement supprimer l'achat ${scope.row.code}`
                          )
                        "
                        plain
                        circle
                        ><i class="bx bx-trash"
                      /></el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <el-pagination
                  small
                  background
                  layout="prev, pager, next"
                  :total="total"
                  class="mt-4"
                  justify="center"
                  v-model:page-size="pageSize"
                  @current-change="setPage"
                  hide-on-single-page
                />
              </StructurePageHeader>
              <AchatCreateModal v-model="modal.create" />
              <LazyAchatShowModal
                :id="modal.show.id"
                v-if="modal.show.dialog"
                v-model="modal.show.dialog"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- end page title -->
    </div>
    <!-- container-fluid -->
  </div>
</template>

<style scoped></style>
