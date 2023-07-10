<template>
  <div class="page-content">
    <div class="container-fluid">
      <!-- start page title -->
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <StructurePageHeader
                :breadcrumbs="links"
                title="Dashboard"
                subtitle="riya-immobiler"
                :extra="{ exist: false }"
                @print="onPrint"
              >
              </StructurePageHeader>
            </div>
          </div>
        </div>
      </div>
      <!-- end page title -->
    </div>
    <!-- container-fluid -->
  </div>
</template>

<script setup lang="ts">
useHead({ title: "Dashboard" });
definePageMeta({ middleware: "auth" });
const links = [{ path: "#", title: "Acceuil" }];
const onPrint = () => {
  console.log("printing ...");
};
</script>

<style scoped></style>
