<template>
  <div id="app" class="account-pages my-5 pt-sm-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6 col-xl-5">
          <div class="card overflow-hidden">
            <div class="bg-primary bg-soft">
              <div class="row">
                <div class="col-7">
                  <div class="text-primary p-4">
                    <h5 class="text-primary">Bienvenue dans Riya Immobiler</h5>
                    <p>Connectez vous à Riya</p>
                  </div>
                </div>
                <div class="col-5 align-self-end">
                  <img src="/images/profile-img.png" alt="" class="img-fluid" />
                </div>
              </div>
            </div>
            <div class="card-body pt-0">
              <div class="auth-logo">
                <nuxt-link to="/" class="auth-logo-light">
                  <div class="avatar-md profile-user-wid mb-4">
                    <span class="avatar-title rounded-circle bg-light">
                      <img src="/images/logo-light.jpg" alt="" class="rounded-circle" height="34" />
                    </span>
                  </div>
                </nuxt-link>

                <nuxt-link to="/" class="auth-logo-dark">
                  <div class="avatar-md profile-user-wid mb-4">
                    <span class="avatar-title rounded-circle bg-light">
                      <img src="/images/logo-dark.jpg" alt="" class="rounded-circle" height="34" />
                    </span>
                  </div>
                </nuxt-link>
              </div>
              <div class="p-2">
                <Form class="form-horizontal" @submit="onSubmit">
                  <div class="mb-3">
                    <label for="username" class="form-label">Utilisateur</label>
                    <Field
                      name="email"
                      type="text"
                      class="form-control"
                      id="username"
                      placeholder="Email"
                      :class="{ 'is-invalid': errors.email }"
                    />
                    <div class="invalid-feedback" v-if="errors.email">{{ errors.email }}</div>
                  </div>

                  <div class="mb-3">
                    <label class="form-label">Mot de passe</label>
                    <div class="input-group auth-pass-inputgroup">
                      <Field
                        name="password"
                        type="password"
                        class="form-control"
                        placeholder="mot de passe"
                        aria-label="Password"
                        aria-describedby="password-addon"
                        :class="{ 'is-invalid': errors.password }"
                      />
                      <div class="invalid-feedback" v-if="errors.password">
                        {{ errors.password }}
                      </div>
                    </div>
                  </div>

                  <!-- remember me -->

                  <div class="mt-3 d-grid">
                    <button class="btn btn-primary waves-effect waves-light" type="submit">
                      Se connecter
                    </button>
                  </div>

                  <!-- sign with -->
                  <!-- <span v-if="loading">en cours</span> -->
                  <!-- forgot password -->
                </Form>
              </div>
            </div>
          </div>
          <div class="mt-5 text-center">
            <div>
              <p>
                ©{{ $dayjs().format("YYYY") }} Riya-Immobiler with
                <i class="mdi mdi-heart text-danger"></i> by
                <a href="https://syitech-group.com" target="_blank" rel="noopener">syitech-group</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useForm, Field, Form } from "vee-validate";

useHead({ title: "Se connecter" });
definePageMeta({ layout: false });

const { $sanctumAuth } = useNuxtApp();
const { errors, setErrors, resetForm } = useForm();
const onSubmit = async (values: any) => {
  resetForm();
  await $sanctumAuth.login(values).catch((err) => {
    if (err.errors) setErrors(err.errors);
    else ElNotification({ title: "Erreur", message: err.message, type: "error" });
  });
};
</script>

<style scoped></style>
