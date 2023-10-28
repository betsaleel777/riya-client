<script setup>
useHead({ title: "Validations" });
definePageMeta({ middleware: "auth" });
</script>

<template>
  <div class="page-content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 class="mb-sm-0 font-size-18">Validations</h4>
            <div class="page-title-right">
              <ol class="breadcrumb m-0">
                <li class="breadcrumb-item"><nuxt-link to="/">Acceuil</nuxt-link></li>
                <li class="breadcrumb-item active">Validations</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex flex-column validations">
        <ApprovalDepenseValidationComponent />
        <ApprovalVisiteValidationComponent />
        <ApprovalDetteValidationComponent />
      </div>
    </div>
  </div>
</template>

<style scoped>
.validations {
  gap: 10px;
}
</style>
