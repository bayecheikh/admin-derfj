<template>

  <div>
    <v-card class="custom-card-user border-grey">
      <v-card-text>
        <v-row>
          <v-col md="12" sm="12" lg="12" text-md-left>
            <div class="row">
                <div class="col-md-4 my-0 py-0" v-if="detailanalysegenre.reference_projet">
                    <p class="info-profil"><span>Ref projet: </span>{{detailanalysegenre.reference_projet}}</p>
                </div>
                <div class="col-md-4 my-0 py-0" v-if="detailanalysegenre.date_enquette">
                    <p class="info-profil"><span>Date : </span>{{detailanalysegenre.date_enquette}}</p>
                </div>
                <div class="col-md-4 my-0 py-0" v-if="detailanalysegenre.titre_projet">
                    <p class="info-profil"><span>Titre projet : </span>{{detailanalysegenre.titre_projet}}</p>
                </div>
                <div class="col-md-4 my-0 py-0" v-if="detailanalysegenre.monnaie && detailanalysegenre.prenom_beneficiaire">
                    <p class="info-profil"><span>Prénom Bénéficiaire : </span>{{detailanalysegenre.prenom_beneficiaire}}</p>
                </div>
                <div class="col-md-4 my-0 py-0" v-if="detailanalysegenre.nom_beneficiaire">
                    <p class="info-profil"><span>Nom Bénéficiaire : </span>{{detailanalysegenre.nom_beneficiaire}}</p>
                </div>
                <div class="col-md-4 my-0 py-0" v-if="detailanalysegenre.telephone_beneficiaire">
                    <p class="info-profil"><span>Téléphone : </span>{{detailanalysegenre.telephone_beneficiaire}}</p>
                </div>
                <div class="col-md-4 my-0 py-0" v-if="detailanalysegenre.adresse_beneficiaire">
                    <p class="info-profil"><span>Adresse : </span>{{detailanalysegenre.adresse_beneficiaire}}</p>
                </div>
                <div class="col-md-4 my-0 py-0" v-if="detailanalysegenre.region">
                    <p class="info-profil"><span>Région : </span>{{detailanalysegenre.region}}</p>
                </div>
                <div class="col-md-4 my-0 py-0" v-if="detailanalysegenre.departement">
                    <p class="info-profil"><span>Departement: </span>{{detailanalysegenre.departement}}</p>
                </div>
                <div class="col-md-4 my-0 py-0" v-if="detailanalysegenre.commune">
                    <p class="info-profil"><span>Commune : </span>{{detailanalysegenre.commune}}</p>
                </div>
                <div class="col-md-4 my-0 py-0" v-if="detailanalysegenre.status">
                    <p class="info-profil"><span>Status: </span>
                      <v-chip
                        :color="(detailanalysegenre.status=='a_valider' && 'primary') || (detailanalysegenre.status=='rejete' && 'error') || (detailanalysegenre.status=='brouillon' && 'orange') || (detailanalysegenre.status=='publie' && 'green')"
                        small
                        outlined
                        class="my-1 mr-1"
                      >
                        {{ (detailanalysegenre.status=='a_valider' && 'A valider') || (detailanalysegenre.status=='rejete' && 'Rejeté') || (detailanalysegenre.status=='brouillon' && 'Brouillon') || (detailanalysegenre.status=='publie' && 'Publié')}}
                      </v-chip>
                    </p>
                    <p class="info-profil" v-if="detailanalysegenre.status=='rejete'"><span>Motif du rejet : </span>{{detailanalysegenre.motif_rejet}}</p>
                </div>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <template>
    <v-form class="" v-model="valid" ref="form" enctype="multipart/form-data">
      <v-stepper
        v-model="step"
        vertical
      >

        <!-- Step:2 Section -->
        <v-stepper-step
          :complete="step > 2"
          step="2"
          editable
        >
          Questionnaire
        </v-stepper-step>
        <v-stepper-content step="2">
          <v-card class="container pl-10 pt-10 pb-10 pr-10 mb-5 border-grey" flat>
            <v-row>
              <v-col md="12" lg="12" sm="12">
                <v-form v-model="valid">
                  <v-jsf v-model="model" :schema="schema"/>
                </v-form>
              </v-col>
            </v-row>
          </v-card>
          <v-btn
            color="primary"
             @click="step = 3"
          >
            Suivant
          </v-btn>
          <v-btn text>
            Annuler
          </v-btn>
        </v-stepper-content>

        <!-- Step:3 Section -->
        <v-stepper-step
          :complete="step > 3"
          step="3"
          editable
        >
          Expert E&S
        </v-stepper-step>
        <v-stepper-content step="3">
          <v-card class="container pl-10 pt-10 pb-10 pr-10 mb-5 border-grey" flat>
            <v-row>
              <v-col md="12" lg="12" sm="12">
                <v-form v-model="valid2">
                  <v-jsf v-model="model2" :schema="schema2"/>
                </v-form>
              </v-col>
            </v-row>
          </v-card>
          <!-- <v-btn
            color="primary"
            @click="submitForm"
          >
            Soumettre
          </v-btn>
          <v-btn text>
            Annuler
          </v-btn> -->
        </v-stepper-content>
      </v-stepper>
    </v-form>
  </template>
  </div>
  </template>

  <script>
  import { mapMutations, mapGetters } from 'vuex'
    export default {
      mounted: function() {
        this.getDetail(this.id)
        //this.schema = JSON.parse(this.detailanalysegenre?.questionnaire)

        //this.schema2 = JSON.parse(this.detailanalysegenre.questionnaire)[1]?JSON.parse(this.detailanalysegenre.questionnaire)[1]:null
      },
      computed: mapGetters({
        detailanalysegenre: 'analysegenres/detailanalysegenre'
      }),
      data () {
        return {
          id : this.$nuxt._route.params.id,
          schema: {
            type: "object",
            "readOnly": true,
            properties: {
              caracteristiqueProjet: {
                title: "CARACTERISATION DU PROJET",
                description: "",
                type: "object",
                properties: {
                  reponse1_1: {
                    type: "string",
                    title: "1) Type de financement et montant ?",
                    description: "",
                    enum: ["Autonomisation", "Entreprise"],
                    "x-display": "radio",
                    "x-class": "mt-10",
                  },
                  reponse2_1: {
                    type: "string",
                    title: "2)	Les principales activités (citez)",
                    "x-display": "textarea",
                    "x-options": {
                      evalMethod: "evalExpr",
                    },
                    "x-props": {
                      outlined: "outlined",
                    },
                  },
                  reponse3_1: {
                    type: "string",
                    title:
                      "3) Revenus annuels (pour l’agriculture demandez revenus après campagne)",
                    description: "",
                    enum: [
                      "Moins de 200 000 FCFA",
                      "200 000-350 000 FCFA",
                      "350 000-500 000 FCFA",
                      "+500 000 FCFA ",
                    ],
                    "x-display": "radio",
                  },
                  reponse4_1: {
                    type: "string",
                    title:
                      "4) Existence de toilettes fonctionnelles (et /ou vestiaires) séparées Hommes/Femmes ",
                    description: "",
                    enum: ["OUI", "NON", "NA"],
                    "x-display": "radio",
                  },
                  reponse5_1: {
                    type: "string",
                    title:
                      "5) Quelles sont les mesures prises pour faciliter le travail des femmes enceintes ou qui allaitent au sein de l'entreprise (pour les entreprises de transformations de produits halieutiques, sel, produits agricoles, avicoles, lait, services…)?",
                    description: "",
                    enum: [
                      "Aire de repos ",
                      "Salle aménagée",
                      "Horaires réduites",
                      "Autres",
                    ],
                    "x-display": "checkbox",
                  },
                  reponse6: {
                    type: "object",
                    title: "6) Emplois créés et maintenus",
                    properties: {
                      reponse6_1: {
                        type: "string",
                        title: "Homme",
                      },
                      reponse6_2: {
                        type: "string",
                        title: "Femme",
                      },
                      reponse6_3: {
                        type: "string",
                        title: "Personne vivant avec handicap",
                      },
                    },
                  },
                },
                "x-style": "border:solid 1px; border-radius:3px; margin:10px",
                "x-class": "pl-10 pt-10 pb-10 pr-10",
              },
              accompagnementFinancierRembousement: {
                title: "ACCOMPAGNEMENT FINANCIER ET REMBOURSEMENT",
                description: "",
                type: "object",
                properties: {
                  reponse7_1: {
                    type: "string",
                    title:
                      "7) Le financement reçu couvre-t-il tous les besoins de mise en œuvre du projet ?",
                    description: "",
                    enum: ["OUI", "NON"],
                    "x-display": "radio",
                  },

                  reponse7_2: {
                    type: "string",
                    title: "Précisez les besoins supplémentaires à couvrir",
                    "x-display": "textarea",
                    "x-if": "parent.value.reponse7_1  == 'OUI'",
                    "x-options": {
                      evalMethod: "evalExpr",
                    },
                    "x-props": {
                      outlined: "outlined",
                    },
                  },
                  reponse8_1: {
                    type: "string",
                    title: "8) Montant du prêt remboursé à ce jour ?",
                    "x-options": {
                      evalMethod: "evalExpr",
                    },
                    "x-props": {
                      outlined: "outlined",
                    },
                  },
                  reponse9_1: {
                    type: "string",
                    title: "9)	Arrivez-vous à rembourser les crédits à temps ?",
                    description: "",
                    enum: ["OUI", "NON"],
                    "x-display": "radio",
                  },
                  reponse9_2: {
                    type: "string",
                    title: "Principal blocage",
                    description: "",
                    enum: [
                      "Tension de trésorerie ",
                      "Problème de rentabilité",
                      "Faillite ",
                      "Autres",
                    ],
                    "x-display": "radio",
                    "x-if": "parent.value.reponse9_1  == 'NON'",
                    "x-options": {
                      evalMethod: "evalExpr",
                    },
                  },
                },
                "x-style": "border:solid 1px; border-radius:3px; margin:10px",
                "x-class": "pl-10 pt-10 pb-10 pr-10",
              },
              besoinAccompagnementNonFinancier: {
                title: "BESOIN D'ACCOMPAGNEMENT NON FINANCIER",
                description: "",
                type: "object",
                properties: {
                  reponse10_1: {
                    type: "string",
                    title: "10) Avez-vous reçu une formation offerte par la DER ?",
                    description: "",
                    enum: ["OUI", "NON"],
                    "x-display": "radio",
                  },
                  reponse10_2: {
                    type: "string",
                    title: "Précisez la formation offerte",
                    "x-display": "textarea",
                    "x-if": "parent.value.reponse10_1  == 'OUI'",
                    "x-options": {
                      evalMethod: "evalExpr",
                    },
                    "x-props": {
                      outlined: "outlined",
                    },
                  },
                  reponse11_1: {
                    type: "string",
                    title:
                      "11)	Avez vous pratiqué la formation en relation avec votre activité ?",
                    description: "",
                    enum: ["OUI", "NON"],
                    "x-display": "radio",
                  },
                  reponse11_2: {
                    type: "string",
                    title:
                      "Justification(Non pratique de la formation relatif avec votre activité)",
                    "x-display": "textarea",
                    "x-if": "parent.value.reponse11_1  == 'NON'",
                    "x-options": {
                      evalMethod: "evalExpr",
                    },
                    "x-props": {
                      outlined: "outlined",
                    },
                  },
                  reponse12_1: {
                    type: "string",
                    title:
                      "12)	Dans quel(s) autre(s) domaine(s) souhaiteriez-vous être formés ou accompagnés ?",
                    "x-display": "textarea",
                    "x-options": {
                      evalMethod: "evalExpr",
                    },
                    "x-props": {
                      outlined: "outlined",
                    },
                  },
                },
                "x-style": "border:solid 1px; border-radius:3px; margin:10px",
                "x-class": "pl-10 pt-10 pb-10 pr-10",
              },
              contraintes: {
                title: "CONTRAINTES/FREIN AU DEVELOPPEMENT DES ACTIVITES DU PROJET",
                description: "",
                type: "object",
                properties: {
                  reponse13_1: {
                    type: "array",
                    title: "13)	Difficultés d’ordre économique ",
                    description: "",
                    items: {
                      type: "string",
                      enum: [
                        "Financement insuffisant",
                        "Insuffisance de la productivité ",
                        "Accès au marché",
                        "Tension de trésorerie",
                        "Transport",
                      ],
                    },
                    //"minItems": 1,
                    "x-display": "checkbox",
                    "x-options": {
                      evalMethod: "evalExpr",
                    },
                  },
                  reponse14_1: {
                    type: "array",
                    title: "14)	Barrières d’ordre technique ",
                    description: "",
                    items: {
                      type: "string",
                      enum: [
                        "Accès à l’eau",
                        "Pénibilité des tâches",
                        "Equipement défectueux",
                        "Accès à l’innovation technologique",
                        "Autres",
                      ],
                    },
                    //"minItems": 1,
                    "x-display": "checkbox",
                    "x-options": {
                      evalMethod: "evalExpr",
                    },
                  },
                  reponse15_1: {
                    type: "array",
                    title: "15)	Barrières socio culturelles",
                    description: "",
                    items: {
                      type: "string",
                      enum: [
                        "Charge des tâches domestiques",
                        "Réticence du conjoint",
                        "Faible niveau d’éducation et de formation",
                        "Faible accès à l’information",
                      ],
                    },
                    //"minItems": 1,
                    "x-display": "checkbox",
                    "x-options": {
                      evalMethod: "evalExpr",
                    },
                  },
                },
                "x-style": "border:solid 1px; border-radius:3px; margin:10px",
                "x-class": "pl-10 pt-10 pb-10 pr-10",
              },
              effets: {
                title: "EFFETS",
                description: "",
                type: "object",
                properties: {
                  reponse16_1: {
                    type: "string",
                    title:
                      "16)	Amélioration des conditions de travail. Si oui comment (acquisition d’infrastructure, d’équipements…)",
                    description: "",
                    enum: ["OUI", "NON"],
                    "x-display": "radio",
                  },
                  reponse16_2: {
                    type: "string",
                    title: "Comment ?",
                    "x-display": "textarea",
                    "x-if": "parent.value.reponse16_1  == 'OUI'",
                    "x-options": {
                      evalMethod: "evalExpr",
                    },
                    "x-props": {
                      outlined: "outlined",
                    },
                  },
                  reponse17_1: {
                    type: "string",
                    title: "17)	Amélioration des conditions de vie. Si oui comment ?",
                    description: "",
                    enum: ["OUI", "NON"],
                    "x-display": "radio",
                  },
                  reponse17_2: {
                    type: "string",
                    title: "Comment ?",
                    "x-display": "textarea",
                    "x-if": "parent.value.reponse16_1  == 'OUI'",
                    "x-options": {
                      evalMethod: "evalExpr",
                    },
                    "x-props": {
                      outlined: "outlined",
                    },
                  },
                  reponse18_1: {
                    type: "string",
                    title: "18) Amélioration de la productivité",
                    description: "",
                    enum: ["OUI", "NON"],
                    "x-display": "radio",
                  },
                  reponse19_1: {
                    type: "string",
                    title:
                      "19)	Effets d’entrainement(le financement vous a-t-il permis de développer d’autres activités connexes ?",
                    description: "",
                    enum: ["OUI", "NON"],
                    "x-display": "radio",
                  },
                  reponse19_2: {
                    type: "string",
                    title: "Lesquelles ?",
                    "x-display": "textarea",
                    "x-if": "parent.value.reponse16_1  == 'OUI'",
                    "x-options": {
                      evalMethod: "evalExpr",
                    },
                    "x-props": {
                      outlined: "outlined",
                    },
                  },
                },
                "x-style": "border:solid 1px; border-radius:3px; margin:10px",
                "x-class": "pl-10 pt-10 pb-10 pr-10",
              },
            },
          },
          schema2: {
            "readOnly": true,
            type: "object",
            properties: {
              questionsEnvironnementales: {
                title: "RESERVEE A L'EXPERT SECTORIEL",
                description: "",
                type: "object",
                properties: {
                  observation1: {
                    type: "string",
                    title: "Evaluation 1",
                    description: "",
                    enum: [
                      "Pas de travail environnemental",
                      "Simples mesures de mitigation",
                      "Etude d’Impact Environnemental",
                    ],
                    "x-display": "radio",
                    "x-class": "mt-10",
                  },
                  observation2: {
                    type: "string",
                    title: "Evaluation 2",
                    description: "",
                    enum: ["Risque Élevé", "Risque Moyen", "Risque Faible"],
                    "x-display": "radio",
                  },
                  resumeEvaluation: {
                    type: "string",
                    title: "Résumé de l'évaluation",
                    "x-display": "textarea",
                    "x-options": {
                      evalMethod: "evalExpr",
                    },
                    "x-props": {
                      outlined: "outlined",
                    },
                  },
                  recommandations: {
                    type: "string",
                    title: "Recommandations",
                    "x-display": "textarea",
                    "x-options": {
                      evalMethod: "evalExpr",
                    },
                    "x-props": {
                      outlined: "outlined",
                    },
                  },
                },
                "x-style": "border:solid 1px; border-radius:3px; margin:10px",
                "x-class": "pl-10 pt-10 pb-10 pr-10",
              },
            },
          },
          model:{},
          model2:{},
          step: 1,

          filename : '',
          loading: false,

          valid: true,
          valid2: true,
        }
      },
      methods: {
        getDetail(id){
            this.progress=true
            this.$msasApi.$get('/analysegenres/'+id)
          .then(async (response) => {
              console.log('Detail ++++++++++',response)
              this.$store.dispatch('analysegenres/getDetail',response.data)
              this.model = JSON.parse(response.data?.questionnaire)[0]?.pointfocal
              this.model2 = JSON.parse(response.data?.questionnaire)[1]?.expertsectoriel
          }).catch((error) => {
               this.$toast.error(error?.response?.data?.message).goAway(3000)
              console.log('Code error ++++++: ', error?.response?.data?.message)
          }).finally(() => {
              console.log('Requette envoyé ')
          });
          //console.log('total items++++++++++',this.paginationanalysegenre)
        },
        submitForm(){
          alert('Formulaire soumis')
        },
        retour(){
            this.$router.push('/analysegenres');
        },
      },
    }
  </script>
