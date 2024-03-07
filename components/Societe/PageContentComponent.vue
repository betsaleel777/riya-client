<script setup lang="ts">
import { storeToRefs } from "pinia";
import { Societe } from "~/types/societe";
import { useSocieteStore } from "@/store/societe";
import { Field, Form } from "vee-validate";

const props = defineProps<{ societe: Societe }>();
const { getAction } = useSocieteStore();
const { count } = storeToRefs(useSocieteStore());
const action = getAction(props.societe);
const { onSubmit } = useSubmitForm(action);
const url = ref(props.societe.logo);
const fichier = ref();
const onInput = () => {
  const [file] = fichier.value.files;
  if (file) url.value = URL.createObjectURL(file);
};
</script>
<template>
  <div class="row">
    <div class="col-xl-4">
      <div class="card overflow-hidden">
        <div class="bg-primary bg-soft">
          <div class="row">
            <div class="col-7">
              <div class="text-primary p-3">
                <h5 class="text-primary">Bienvenue !</h5>
                <p>Configuration de la société</p>
              </div>
            </div>
            <div class="col-5 align-self-end">
              <img src="/images/profile-img.png" alt="" class="img-fluid" />
            </div>
          </div>
        </div>
        <div class="card-body pt-0">
          <div class="row">
            <div class="col-sm-10">
              <div class="avatar-md profile-user-wid mb-4">
                <el-image
                  style="width: 75px; height: 75px"
                  fit="fill"
                  :preview-src-list="[props.societe.logo]"
                  lazy
                  v-if="props.societe.logo"
                  :src="props.societe.logo"
                  alt="logo"
                  class="rounded-circle bg-transparent"
                />
                <img
                  v-else
                  src="/images/users/avatar.jpg"
                  alt="logo-empty"
                  class="img-thumbnail rounded-circle"
                />
              </div>
              <h5 class="font-size-15 text-truncate">{{ props.societe.raison_sociale }}</h5>
              <p class="text-muted mb-0 text-truncate">{{ props.societe.slogan }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-body">
          <h4 class="card-title mb-4">Informations Générales</h4>

          <p class="text-muted mb-4">
            {{ props.societe.description }}
          </p>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <b>Forme juridique: </b>
              <span class="">{{ props.societe.forme_juridique }}</span>
            </li>
            <li class="list-group-item">
              <b>Registre: </b>
              <span class=""> {{ props.societe.registre }}</span>
            </li>
            <li class="list-group-item">
              <b>Boîte Postale: </b>
              <span class=""> {{ props.societe.boite_postale }}</span>
            </li>
            <li class="list-group-item">
              <b>Contact: </b>
              <span class=""> {{ props.societe.contact }}</span>
            </li>
            <li class="list-group-item">
              <b>Email: </b>
              <span class=""> {{ props.societe.email }}</span>
            </li>
            <li class="list-group-item">
              <b>Siège: </b>
              <span class=""> {{ props.societe.siege }}</span>
            </li>
          </ul>
        </div>
      </div>
      <!-- end card -->
      <!-- end card -->
    </div>

    <div class="col-xl-8">
      <div class="row">
        <div class="col-md-4">
          <div class="card mini-stats-wid">
            <div class="card-body">
              <div class="d-flex">
                <div class="flex-grow-1">
                  <p class="text-muted fw-medium mb-2">Nombres de Clients</p>
                  <h4 class="mb-0">{{ count?.clients }}</h4>
                </div>

                <div class="flex-shrink-0 align-self-center">
                  <div class="mini-stat-icon avatar-sm rounded-circle bg-primary">
                    <span class="avatar-title">
                      <i class="bx bx-check-circle font-size-24"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card mini-stats-wid">
            <div class="card-body">
              <div class="d-flex">
                <div class="flex-grow-1">
                  <p class="text-muted fw-medium mb-2">Nombre de Proprietaires</p>
                  <h4 class="mb-0">{{ count?.proprietaires }}</h4>
                </div>

                <div class="flex-shrink-0 align-self-center">
                  <div class="avatar-sm mini-stat-icon rounded-circle bg-primary">
                    <span class="avatar-title">
                      <i class="bx bx-user-circle font-size-24"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card mini-stats-wid">
            <div class="card-body">
              <div class="d-flex">
                <div class="flex-grow-1">
                  <p class="text-muted fw-medium mb-2">Nombre de Biens</p>
                  <h4 class="mb-0">{{ count?.biens }}</h4>
                </div>
                <div class="flex-shrink-0 align-self-center">
                  <div class="avatar-sm mini-stat-icon rounded-circle bg-primary">
                    <span class="avatar-title">
                      <i class="bx bx-home font-size-24"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-body">
          <h4 class="card-title mb-4">Formulaire</h4>
          <div class="container">
            <Form
              class="form-horizontal"
              @submit="onSubmit"
              :initial-values="societe"
              v-slot="{ errors, isSubmitting }"
            >
              <div
                class="row"
                v-loading="isSubmitting"
                element-loading-text="traitement en cours ..."
                element-loading-background="rgba(122, 122, 122, 0.9)"
              >
                <div class="col-md-5">
                  <div class="block">
                    <el-avatar :size="150" :src="url" />
                  </div>
                </div>
                <div class="col-md-7">
                  <div class="mb-3">
                    <label for="description" class="form-label">Description</label>
                    <Field
                      name="description"
                      type="text"
                      class="form-control"
                      id="description"
                      as="textarea"
                      cols="30"
                      rows="5"
                    />
                  </div>
                </div>
                <div class="col-md-5">
                  <Field name="image" v-slot="{ handleChange, handleBlur }">
                    <label for="formFile" class="form-label">Logo de la societe</label>
                    <input
                      ref="fichier"
                      class="form-control"
                      type="file"
                      id="formFile"
                      @input="onInput"
                      @change="handleChange($event, true)"
                      @blur="handleBlur"
                      :class="{ 'is-invalid': errors.image }"
                    />
                    <div class="invalid-feedback" v-if="errors.image">
                      {{ errors.image }}
                    </div>
                  </Field>
                </div>
                <div class="col-md-7">
                  <label for="frais_dossier" class="form-label">Frais de dossier</label>
                  <Field
                    name="frais_dossier"
                    type="text"
                    class="form-control"
                    id="frais_dossier"
                    :class="{ 'is-invalid': errors.frais_dossier }"
                  />
                  <div class="invalid-feedback" v-if="errors.frais_dossier">
                    {{ errors.frais_dossier }}
                  </div>
                </div>
              </div>
              <div class="row mt-5">
                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="raison_sociale" class="form-label">Raison Sociale</label>
                    <Field
                      name="raison_sociale"
                      type="text"
                      class="form-control"
                      id="raison_sociale"
                      :class="{ 'is-invalid': errors.raison_sociale }"
                    />
                    <div class="invalid-feedback" v-if="errors.raison_sociale">
                      {{ errors.raison_sociale }}
                    </div>
                  </div>
                  <div class="mb-3">
                    <label for="slogan" class="form-label">Slogan</label>
                    <Field
                      name="slogan"
                      type="text"
                      class="form-control"
                      id="slogan"
                      :class="{ 'is-invalid': errors.slogan }"
                    />
                    <div class="invalid-feedback" v-if="errors.slogan">
                      {{ errors.slogan }}
                    </div>
                  </div>
                  <div class="mb-3">
                    <label for="forme_juridique" class="form-label">Forme juridique</label>
                    <Field
                      name="forme_juridique"
                      type="text"
                      class="form-control"
                      id="forme_juridique"
                      :class="{ 'is-invalid': errors.forme_juridique }"
                    />
                    <div class="invalid-feedback" v-if="errors.forme_juridique">
                      {{ errors.forme_juridique }}
                    </div>
                  </div>
                  <div class="mb-3">
                    <label for="registre" class="form-label">Registre de commerce</label>
                    <Field
                      name="registre"
                      type="text"
                      class="form-control"
                      id="registre"
                      :class="{ 'is-invalid': errors.registre }"
                    />
                    <div class="invalid-feedback" v-if="errors.registre">
                      {{ errors.registre }}
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="contact" class="form-label">Contact</label>
                    <Field
                      name="contact"
                      type="text"
                      class="form-control"
                      id="contact"
                      :class="{ 'is-invalid': errors.contact }"
                    />
                    <div class="invalid-feedback" v-if="errors.contact">
                      {{ errors.contact }}
                    </div>
                  </div>
                  <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <Field
                      name="email"
                      type="text"
                      class="form-control"
                      id="email"
                      :class="{ 'is-invalid': errors.email }"
                    />
                    <div class="invalid-feedback" v-if="errors.email">
                      {{ errors.email }}
                    </div>
                  </div>
                  <div class="mb-3">
                    <label for="boite_postale" class="form-label">Boite postale</label>
                    <Field
                      name="boite_postale"
                      type="text"
                      class="form-control"
                      id="boite_postale"
                      :class="{ 'is-invalid': errors.boite_postale }"
                    />
                    <div class="invalid-feedback" v-if="errors.boite_postale">
                      {{ errors.boite_postale }}
                    </div>
                  </div>
                  <div class="mb-3">
                    <label for="siege" class="form-label">Siège</label>
                    <Field
                      name="siege"
                      type="text"
                      class="form-control"
                      id="siege"
                      :class="{ 'is-invalid': errors.siege }"
                    />
                    <div class="invalid-feedback" v-if="errors.siege">
                      {{ errors.siege }}
                    </div>
                  </div>
                </div>
                <div class="d-flex flex-row-reverse bd-highlight">
                  <button class="btn btn-primary bd-highlight" type="submit">enregistrer</button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
