<template>
  <div>
    <v-form
      class="text-sm-center"
      v-model="valid"
      ref="form"
      enctype="multipart/form-data"
    >
      <div class="custom-container">
        <v-row>
          <v-col lg="4" md="4" sm="12">
            <v-autocomplete
              v-model="resume.annee"
              :items="listannees"
              :rules="rules.fournisseur_services_idRules"
              outlined
              dense
              label="Année"
              item-text="libelle"
              item-value="libelle"
              @change="changeAnnee"
            >
            </v-autocomplete>
          </v-col>
          <v-col lg="4" md="4" sm="12">
            <v-autocomplete
              v-model="resume.trimestre"
              :items="listmonnaies"
              :rules="rules.fournisseur_services_idRules"
              outlined
              dense
              label="Trimestre"
              item-text="libelle"
              item-value="libelle"
              @change="changeTrimestre"
            >
            </v-autocomplete>
          </v-col>
          <v-col lg="4" md="4" sm="4">
            <v-text-field
              label="Secteur"
              outlined
              dense
              v-model="resume.secteur"
              :rules="rules.numberRules"
              readonly
            ></v-text-field>
          </v-col>
        </v-row>
      </div>
      <div class="custom-container">
        <v-tabs v-model="tab">
          <v-tab class="text-normal"> Cible Révisé - Résultats</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <div class="custom-card-grey">
              <v-card
                class="mx-auto mb-5 pl-10 pt-10 pr-10 pb-5 my-10 border-grey"
              >
                <v-row>
                  <v-col lg="12" md="12" sm="12">
                    <v-text-field
                      label="Ind.1.2 : Nombre d’emplois directs créés ou consolidés dans les chaînes de valeur agricoles et artisanales dont 50% pour les femmes"
                      outlined
                      dense
                      v-model="model.Ind_1_2"
                      :rules="rules.numberRules"
                    ></v-text-field>
                  </v-col>
                  <v-col lg="12" md="12" sm="12">
                    <v-text-field
                      label="Ind.R.1.2.1. : Nombre d’entreprises financées dont 50% pour les femmes"
                      outlined
                      dense
                      v-model="model.Ind_R_1_2_1"
                      :rules="rules.numberRules"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-card>
              <v-card
                class="mx-auto mb-5 pl-10 pt-10 pr-10 pb-5 my-10 border-grey"
              >
                <v-row>
                  <v-col lg="12" md="12" sm="12">
                    <v-text-field
                      label="Ind.R.1.1.2 : Nombre MPME formalisées"
                      outlined
                      dense
                      v-model="model.Ind_R_1_1_2"
                      :rules="rules.numberRules"
                    ></v-text-field>
                  </v-col>
                  <v-col lg="12" md="12" sm="12">
                    <v-text-field
                      label="Ind.R.1.1.1 : Nombre de personnes formées en appui métier et en gestion d’entreprise dont pour 40% pour les femmes"
                      outlined
                      dense
                      v-model="model.Ind_R_1_1_1"
                      :rules="rules.numberRules"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-card>
              <v-card
                class="mx-auto mb-5 pl-10 pt-10 pr-10 pb-5 my-10 border-grey"
              >
                <v-row>
                  <v-col lg="12" md="12" sm="12">
                    <v-text-field
                      label="Ind.2.2 : Nombre d’emplois décents directs créés et/ou consolidés dans les autres secteurs prioritaires dont pour les femmes"
                      outlined
                      dense
                      v-model="model.Ind_2_2"
                      :rules="rules.numberRules"
                    ></v-text-field>
                  </v-col>
                  <v-col lg="12" md="12" sm="12">
                    <v-text-field
                      label="Ind.R.1.2.2 : Volume de financement octroyé (en millions de FCFA) dont 40% destinés aux femmes"
                      outlined
                      dense
                      v-model="model.Ind_R_1_2_2"
                      :rules="rules.numberRules"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-card>
              <v-card
                class="mx-auto mb-5 pl-10 pt-10 pr-10 pb-5 my-10 border-grey"
              >
                <v-row>
                  <v-col lg="12" md="12" sm="12">
                    <v-text-field
                      label="Ind. R.2.2.2 : Volume de financement octroyé (en millions de FCFA) dont 40% destinés aux femmes"
                      outlined
                      dense
                      v-model="model.Ind_R_2_2_2"
                      :rules="rules.numberRules"
                    ></v-text-field>
                  </v-col>
                  <v-col lg="12" md="12" sm="12">
                    <v-text-field
                      label="Ind. R.2.2.1 : Nombre de MPME financées dont 50% pour les femmes"
                      outlined
                      dense
                      v-model="model.Ind_R_2_2_1"
                      :rules="rules.numberRules"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-card>
              <v-card
                class="mx-auto mb-5 pl-10 pt-10 pr-10 pb-5 my-10 border-grey"
              >
                <v-row>
                  <v-col lg="12" md="12" sm="12">
                    <v-text-field
                      label="Ind. R.2.1.1 : Nombre de MPME bénéficiant d’un accompagnement technique dont 50% pour les femmes"
                      outlined
                      dense
                      v-model="model.Ind_R_2_1_1"
                      :rules="rules.numberRules"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-card>
            </div>
          </v-tab-item>
        </v-tabs-items>
      </div>
    </v-form>
    <v-row align="center" justify="space-around">
      <div
        v-if="$hasPermission('rejet')
        "
      >
        <template>
          <v-row>
            <v-dialog v-model="dialog" max-width="800px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="error"
                  v-bind="attrs"
                  v-on="on"
                  depressed
                  outlined
                >
                  <v-icon>mdi-check</v-icon>
                  Rejeter
                </v-btn>
              </template>
              <v-card>
                <v-card-text>
                  <v-container>
                    <v-col lg="12" md="12" sm="12" class="pb-0 pt-10">
                      <v-textarea
                        v-model="model.motif"
                        label="Motif du rejet"
                        dense
                        outlined
                      ></v-textarea>
                      <v-btn
                        :loading="loadingRejet"
                        flat
                        rounded
                        outlined
                        color="error"
                        v-on:click="rejeter()"
                        v-if="
                          $hasPermission('rejet')
                        "
                      >
                        <v-icon left> mdi-check </v-icon>
                        Rejeter
                      </v-btn>
                    </v-col>
                  </v-container>
                </v-card-text>
              </v-card>
            </v-dialog>
          </v-row>
        </template>
      </div>
      <v-btn
        :loading="loading"
        :disabled="!valid"
        class="mr-4 text-white"
        color="primary"
        @click="submitForm"
      >
        Enregistrer
      </v-btn>
      <v-btn
        :loading="loadingValidation"
        flat
        outlined
        color="green"
        v-on:click="valider()"
        v-if="
          ($hasPermission(detailsectoriel.state) ||
            ($hasRole('expert-sectoriel') &&
              detailsectoriel.state == 'INITIER_SECTORIEL')) &&
          $hasPermission('validation')
        "
      >
        <v-icon left> mdi-check </v-icon>
        {{ $hasRole("expert-sectoriel") ? "Valider" : "Valider" }}
      </v-btn>
    </v-row>
  </div>
</template>
 
<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  components: {},
  mounted: function () {
    this.getDetail(this.$nuxt._route.params.id);
    //this.getUser(this.$getUser().id);
    this.$store.dispatch("sous_secteurs/getList");
    this.$store.dispatch("annees/getList");
    this.$store.dispatch("monnaies/getList");
  },
  computed: mapGetters({
    detailsectoriel: "sectoriels/detailsectoriel",
    listsous_secteurs: "sous_secteurs/listsous_secteurs",
    listannees: "annees/listannees",
    listmonnaies: "monnaies/listmonnaies",
    /* listfournisseurs: 'fournisseurs/selectlistfournisseurs',
      liststructures: 'structures/selectliststructures', */
  }),
  data: () => ({
    tab: null,
    loading: false,
    message: null,
    color: null,
    valid: true,
    showFournisseur: false,
    message: null,

    model: {
      Ind_1: "",
      Ind_2: "",
      Ind_1_1: "",
      Ind_2_1: "",
      Ind_R_3_1_1: "",
      Ind_R_3_1_2: "",
      Ind_R_3_2_1: "",
      Ind_R_3_2_2: "",

      Ind_1_2: "",
      Ind_R_1_2_1: "",
      Ind_R_1_1_2: "",
      Ind_R_1_1_1: "",
      Ind_2_2: "",
      Ind_R_1_2_2: "",
      Ind_R_2_2_2: "",
      Ind_R_2_2_1: "",
      Ind_R_1_1_1: "",
      Ind_R_2_1_1: "",
    },
    resume: {
      annee: "",
      trimestre: "",
      secteur: null,
    },
    rules: {
      firstnameRules: [
        (v) => !!v || "Prénom est obligatoire",
        (v) =>
          (v && v.length <= 50) || "Prénom doit etre inférieur à 20 caratères",
      ],
      lastnameRules: [
        (v) => !!v || "Nom est obligatoire",
        (v) =>
          (v && v.length <= 50) || "Nom doit etre inférieur à 10 caratères",
      ],
      emailRules: [
        (v) => !!v || "E-mail est obligatoire",
        (v) => /.+@.+\..+/.test(v) || "E-mail mdoit etre valide",
      ],
      sectorielnameRules: [
        (v) => !!v || "Login est obligatoire",
        (v) =>
          (v && v.length <= 10) || "Nom doit etre inférieur à 10 caratères",
      ],
      rolesRules: [(v) => (v && !!v.length) || "Role est obligatoire"],
      telephoneRules: [(v) => !!v || "Téléphone est obligatoire"],
      country_codeRules: [(v) => !!v || "L'indicatif du pays est obligatoire"],
      fournisseur_services_idRules: [
        (v) => !!v || "Fournisseur est obligatoire",
      ],
      structure_idRules: [(v) => !!v || "Structure est obligatoire"],
      adresseRules: [
        (v) => !!v || "Adresse est obligatoire",
        (v) =>
          (v && v.length <= 100) ||
          "Adresse doit etre inférieur à 50 caratères",
      ],
      nationalityRules: [
        (v) => !!v || "Nationalité est obligatoire",
        (v) =>
          (v && v.length <= 50) ||
          "Nationalité doit etre inférieur à 15 caratères",
      ],
      date_of_birthRules: [(v) => !!v || "Date de naissance est obligatoire"],
      place_of_birthRules: [
        (v) => !!v || "Lieu de naissance est obligatoire",
        (v) =>
          (v && v.length <= 50) ||
          "Lieu de naissance doit etre inférieur à 20 caratères",
      ],
      /* sexeRules: [
          v => !!v || 'Civilité est obligatoire',
        ], */
      type_identificationRules: [
        (v) => !!v || "Type d'identification est obligatoire",
      ],
      numero_identificationRules: [
        (v) => !!v || "Numéro d'identification est obligatoire",
      ],
      fonctionRules: [(v) => !!v || "Fonction est obligatoire"],
    },

    imageData: null,
  }),
  methods: {
    getUser(id) {
      this.progress = true;
      this.$msasApi
        .$get("/users/" + id)
        .then(async (response) => {
          console.log("Detail user ++++++++++", response);
          this.resume.secteur = response.data.secteur[0]?.libelle;
          //this.$store.dispatch('utilisateurs/getDetail',response.data)
        })
        .catch((error) => {
          this.$toast.error(error?.response?.data?.message).goAway(3000);
          console.log("Code error ++++++: ", error?.response?.data?.message);
        })
        .finally(() => {
          console.log("Requette envoyé ");
        });
      //console.log('total items++++++++++',this.paginationstructure)
    },
    getDetail(id) {
      this.progress = true;
      this.$msasApi
        .$get("/sectoriels/" + id)
        .then(async (response) => {
          console.log("Detail sectoriel ++++++++++", response);
          this.$store.dispatch("sectoriels/getDetail", response.data);
          this.model = JSON.parse(response.data?.questionnaire);
          this.resume.annee = response.data.annee;
          this.resume.trimestre = response.data.trimestre;
          this.resume.secteur = response.data?.secteur
        })
        .catch((error) => {
          this.$toast.error(error?.response?.data?.message).goAway(3000);
          console.log("Code error ++++++: ", error?.response?.data?.message);
        })
        .finally(() => {
          console.log("Requette envoyé ");
        });
      //console.log('total items++++++++++',this.paginationanalyserisque)
    },
    handleFileUpload(e) {
      //Recupère le fichier
      const input = this.$refs.file;
      const files = input.files;

      //Recupère l'extension
      let idxDot = files[0].name.lastIndexOf(".") + 1;
      let extFile = files[0].name
        .substr(idxDot, files[0].name.length)
        .toLowerCase();
      let size = files[0].size / 1024 / 1024; //La taille en Mbit
      console.log("Size-------------- ", size);

      if (
        size <= 2 &&
        (extFile == "jpg" || extFile == "jpeg" || extFile == "png")
      ) {
        //Affecté le fichier image au model avatar
        this.model.avatar = e.target.files[0];

        //Prévisualise l'image
        if (files && files[0]) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.imageData = e.target.result;
          };
          reader.readAsDataURL(files[0]);
          this.$emit("input", files[0]);
        }
      } else {
        alert(
          "Seul les images jpg/jpeg png et de taille inférieur à 2Mb sont acceptés!"
        );
      }
    },
    submitForm() {
      let validation = this.$refs.form.validate();
      this.loading = true;
      let composante = this.listsous_secteurs.filter(
        (item) => item?.libelle == this.resume.secteur
      )[0]?.secteur[0]?.libelle;
      console.log("composante: ", composante);

      let formData = new FormData();

      formData.append("id", this.model.id);
      formData.append("_method", "put");
      formData.append("annee", this.resume.annee);
      formData.append("trimestre", this.resume.trimestre);
      if (this.resume.secteur) {
        formData.append("secteur", this.resume.secteur);
      }
      if (composante) {
        formData.append("composante", composante);
      }
      formData.append("questionnaire", JSON.stringify(this.model));

      validation &&
        this.$msasFileApi
          .post("/sectoriels/" + this.$nuxt._route.params.id, formData)
          .then((res) => {
            console.log("Donées modif reçus ++++++: ", res.data);
            this.$store.dispatch("toast/getMessage", {
              type: "success",
              text: res.data.message,
            });
            this.$router.push("/sectoriels");
          })
          .catch((error) => {
            console.log("Code error ++++++: ", error);
            this.$store.dispatch("toast/getMessage", {
              type: "error",
              text: error || "Echec de l'ajout ",
            });
          })
          .finally(() => {
            this.loading = false;
            console.log("Requette envoyé ");
          });
    },
    valider () {
        this.loadingValidation = true;
        console.log('Donées formulaire ++++++ : ',{id:this.detailsectoriel.id})
        
        this.$msasApi.post('/validation_sectoriel', {id:this.detailsectoriel.id})
          .then((res) => {  
            this.state = res.data.data.state  
            this.status = res.data.data.status  
            this.$store.dispatch('toast/getMessage',{type:'success',text:res.data.message || 'Validation réussie !'})
            this.$router.push('/sectoriels');
            console.log('Donées formulaire reçu++++++ : ',res)
          })
          .catch((error) => {
               console.log('Code error ++++++: ', error)
              this.$store.dispatch('toast/getMessage',{type:'error',text:error || 'Echec de l\'ajout '})
          }).finally(() => {
            this.loadingValidation = false;
            console.log('Requette envoyé ')
        });
      },
      rejeter () {
        this.loadingRejet = true;
        console.log('Donées formulaire ++++++ : ',{id:this.detailsectoriel.id})
        
        this.$msasApi.post('/rejet_sectoriel', {id:this.detailsectoriel.id,motif_rejet:this.model.motif})
          .then((res) => {  
            this.state = res.data.data.state  
            this.status = res.data.data.status 
            this.$store.dispatch('toast/getMessage',{type:'success',text:res.data.message || 'sectoriel rejeté avec succés!'})
            this.$router.push('/sectoriels');
            
          })
          .catch((error) => {
               console.log('Code error ++++++: ', error)
              this.$store.dispatch('toast/getMessage',{type:'error',text:error || 'Echec de l\'ajout '})
          }).finally(() => {
            this.loadingRejet = false;
            console.log('Requette envoyé ')
        });
      },
    resetForm() {
      this.$refs.form.reset();
    },
    resetValidationForm() {
      this.$refs.form.resetValidation();
    },
    async changeRole(role) {
      let checkRole = this.model.roles.filter(
        (item) => item.name === "agent_structure"
      ).length;
      if (checkRole == 1) this.showFournisseur = true;
      else this.showFournisseur = false;
      console.log("************", checkRole);
    },
    async changeAnnee(value) {
      //resumé
      this.resume.annee = value;
    },
    async changeTrimestre(value) {
      //resumé
      console.log("trimestre -------- ", value);
      this.resume.trimestre = value;
    },
  },
  metaInfo() {
    return {
      items: this.items,
    };
  },
};
</script>