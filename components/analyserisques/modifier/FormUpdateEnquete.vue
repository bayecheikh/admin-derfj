<template>
  <div>
    <v-form class="" v-model="valid" ref="form" enctype="multipart/form-data">
      <v-card class="mx-auto mb-5 pl-10 pt-10 pr-10 pb-5">
        <v-row>
          <v-col md="4" lg="4" sm="12">
            <v-text-field
              label="Dénomination"
              outlined
              dense
              v-model="model.nom_enquete"
              :rules="rules.nom_enqueteRules"
            ></v-text-field>
          </v-col>
          <v-col lg="4" md="4" sm="12">
            <v-autocomplete
              v-model="selectedSource_financements"
              :items="listsources"
              :rules="rules.fournisseur_services_idRules"
              outlined
              dense
              label="Source de financement"
              item-text="libelle_source"
              item-value="id"
              return-object
              @change="changeSource_financement"
            >
            </v-autocomplete>
          </v-col>
          <v-col lg="4" md="4" sm="12">
            <v-autocomplete
              v-model="selectedType_sources"
              :items="model.listtypesources"
              :rules="showTypeSource==true?rules.fournisseur_services_idRules:null"
              outlined
              dense
              label="Type"
              item-text="libelle_type_source"
              item-value="id"
              return-object
              @change="changeType_source"
              v-if="showTypeSource"
            >
            </v-autocomplete>
          </v-col>
          <v-col md="6" lg="6" sm="12" v-if="showNumAutorisation">
            <v-text-field
              label="N° autorisation"
              outlined
              dense
              v-model="model.numero_autorisation"
              :rules="rules.firstnameRules"
            ></v-text-field>
          </v-col>
          <v-col md="6" lg="6" sm="12" v-if="showNumAgrement">
            <v-text-field
              label="N° agrément"
              outlined
              dense
              v-model="model.numero_agrement"
              :rules="rules.firstnameRules"
            ></v-text-field>
          </v-col>
          <v-col md="6" lg="6" sm="12" v-if="showAccordSiege">
            <v-flex>
              <v-btn
                color="grey"
                class="white--text"
                @click="$refs.file.click()"
                depressed
              >
                Accord de siège
                <v-icon right dark> mdi-cloud-upload </v-icon>
              </v-btn>
            </v-flex>
            <v-flex>{{filename}}</v-flex>
            <input
              type="file"
              id="file"
              name="accord_siege"
              ref="file"
              v-on:change="handleFileUpload"
              style="display: none"
            />
          </v-col>
          <v-col lg="6" sm="12" md="6" v-if="showDebutIntervention">
            <v-menu
              v-model="menu1"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="model.debut_intervention"
                  label="Dèbut de l'intervention"
                  append-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  outlined
                  dense
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="model.debut_intervention"
                @input="menu1 = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col lg="6" sm="12" md="6" v-if="showFinIntervention">
            <v-menu
              v-model="menu2"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="model.fin_intervention"
                  label="Fin de l'intervention"
                  append-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  outlined
                  dense
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="model.fin_intervention"
                @input="menu2 = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
      </v-card>
      <h2 class="mb-5">Coordonnées siège</h2>
      <v-card class="mx-auto mb-5 pl-10 pt-10 pr-10 pb-5">
        <v-row>
          <v-col md="4" lg="4" sm="12" v-if="showAdresseEnquete">
            <v-text-field
              label="Adresse enquete"
              outlined
              dense
              v-model="model.adresse_enquete"
              :rules="rules.firstnameRules"
            ></v-text-field>
          </v-col>
          <v-col md="4" lg="4" sm="12">
            <v-text-field
              label="Téléphone enquete"
              outlined
              dense
              v-model="model.telephone_enquete"
              :rules="rules.telephoneRules"
            ></v-text-field>
          </v-col>
          <v-col md="4" lg="4" sm="12">
            <v-text-field
              label="Email enquete"
              outlined
              dense
              v-model="model.email_enquete"
              :rules="rules.emailRules"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card>
      <h2 class="mb-5">Zone d'intervention</h2>
      <v-card class="mx-auto mb-5 pl-10 pt-5 pr-10 pb-5">
        <v-row>
          <v-col md="12" lg="12" sm="12">
            <v-radio-group
              v-model="model.type_zone_value"
              :rules="rules.sexeRules"
              @change="changeType_zone_intervention"
              row
            >
              <v-radio
                v-for="item in listtypezones"
                :key="item.id"
                :label="item.libelle_zone"
                :value="item"
              ></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>
        <v-row v-if="showRegion">
          <v-col md="12" lg="12" sm="12">
            <v-expansion-panels
              v-for="(item,i) in listregions"
              :key="i"
              class="mb-2"
            >
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <v-checkbox
                    v-model="selectedRegions"
                    :label="item.nom_region"
                    :value="item.id"
                  ></v-checkbox>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div v-for="item in item.departements" :key="item.id">
                    <v-checkbox
                      v-model="selectedDepartements"
                      :label="item.nom_departement"
                      :value="item.id"
                    ></v-checkbox>
                  </div>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
        </v-row>
      </v-card>
      <h2 class="mb-5">Dimensions</h2>
      <v-card class="mx-auto mb-5 pl-10 pt-5 pr-10 pb-5">
        <v-row class="d-flex justify-content-between">
          <v-col
            md="4"
            lg="4"
            sm="12"
            v-for="item in listdimensions"
            :key="item.id"
          >
            <v-checkbox
              v-model="selectedDimensions"
              :label="item.libelle_dimension"
              :value="item.id"
            ></v-checkbox>
          </v-col>
        </v-row>
      </v-card>
      <!--<h2 class="mb-5">Personne responsable</h2>
      <v-card class="mx-auto mb-5 pl-10 pt-10 pr-10 pb-5">
        <v-row>
          <v-col md="4" lg="4" sm="12">
            <v-text-field
              label="Fonction responsable"
              outlined
              dense
              v-model="model.fonction_responsable"
              :rules="rules.firstnameRules"
            ></v-text-field>
          </v-col>
          <v-col md="4" lg="4" sm="12">
            <v-text-field
              label="Prénom responsable"
              outlined
              dense
              v-model="model.firstname_responsable"
              :rules="rules.firstnameRules"
            ></v-text-field>
          </v-col>
          <v-col md="4" lg="4" sm="12">
            <v-text-field
              label="Nom responsable"
              outlined
              dense
              v-model="model.lastname_responsable"
              :rules="rules.firstnameRules"
            ></v-text-field>
          </v-col>
          <v-col md="4" lg="4" sm="12">
            <v-text-field
              label="Adresse Email responsable"
              outlined
              dense
              v-model="model.email_responsable"
              :rules="rules.emailRules"
            ></v-text-field>
          </v-col>
          <v-col md="4" lg="4" sm="12">
            <v-text-field
              label="Téléphone responsable"
              outlined
              dense
              v-model="model.telephone_responsable"
              :rules="rules.telephoneRules"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card>-->

      <v-btn class="mr-4 text-white" color="primary" @click="submitForm">
        Enregistrer
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
  export default {
    components: {
    },
    mounted: function() {
      this.getDetail(this.$nuxt._route.params.id)
    },
    computed: 
      mapGetters({
      detailenquete:'enquetes/detailenquete',
      listtypezones: 'type-zones/listtypezones',
      listsources: 'sources/listsources',
      listregions: 'regions/listregions',
      listdepartements: 'departements/listdepartements',
      listdimensions: 'dimensions/listdimensions',
    }),
    data: () => ({
      id : '',
      filename : '',
      loading: false,
      message:null,
      color:null,
      valid: true,
      showFournisseur: false,
      showTypeSource: false,
      showNumAutorisation: false,
      showAccordSiege: false,
      showNumAgrement: false,
      showAdresseEnquete: false,
      showRegion: false,
      message:null,
      selectedSource_financements: [],
      selectedType_sources: [],
      selectedRegions: [],
      selectedDepartements: [],
      selectedDimensions: [],
      selectedType_zone_interventions: [],
      model: {
        id : '',
        nom_enquete:'',
        numero_autorisation:'',
        accord_siege:'',
        numero_agrement:'',
        adresse_enquete:'',
        debut_intervention:'',
        fin_intervention:'',
        telephone_enquete:'',
        email_enquete:'',
        firstname_responsable:'',
        lastname_responsable:'',
        email_responsable:'',
        telephone_responsable:'',
        fonction_responsable:'',
        listtypesources:[],
        type_zone_value:''
      },
      rules:{
        nom_enqueteRules: [
          v => !!v || 'Dénomination est obligatoire'
        ],
        nameRules: [
          v => !!v || 'Champ obligatoire'
        ],
        firstnameRules: [
          v => !!v || 'Champ obligatoire'
        ],
        lastnameRules: [
          v => !!v || 'Champ obligatoire'
        ],
        emailRules: [
          v => !!v || 'l\'E-mail est obligatoire',
          v => /.+@.+\..+/.test(v) || 'E-mail mdoit etre valide',
        ],
        rolesRules: [
          v => (v && !!v.length) || 'Role est obligatoire',
        ],
        telephoneRules: [
          v => !!v || 'Téléphone est obligatoire',
        ],
        country_codeRules: [
          v => !!v || 'L\'indicatif du pays est obligatoire',
        ],
        fournisseur_services_idRules: [
          v => (!!v) || 'Fournisseur est obligatoire',
        ],
        enquete_idRules: [
          v => (!!v) || 'Enquete est obligatoire',
        ],
        adresseRules: [
          v => !!v || 'Adresse est obligatoire',
          v => (v && v.length <= 100) || 'Adresse doit etre inférieur à 50 caratères',
        ],
        nationalityRules: [
          v => !!v || 'Nationalité est obligatoire',
          v => (v && v.length <= 50) || 'Nationalité doit etre inférieur à 15 caratères',
        ],
        date_of_birthRules: [
          v => !!v || 'Date de naissance est obligatoire',
        ],
        place_of_birthRules: [
          v => !!v || 'Lieu de naissance est obligatoire',
          v => (v && v.length <= 50) || 'Lieu de naissance doit etre inférieur à 20 caratères',
        ],
        /* sexeRules: [
          v => !!v || 'Civilité est obligatoire',
        ], */
        type_identificationRules: [
          v => !!v || 'Type d\'identification est obligatoire',
        ],
        numero_identificationRules: [
          v => !!v || 'Numéro d\'identification est obligatoire'
        ],
        fonctionRules: [
          v => !!v || 'Fonction est obligatoire'
        ]
      },
      date1: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      date2: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu1: false,
      menu2: false,
      imageData:null,
    }),
    methods: {
      getDetail(id){
          this.progress=true
          this.$msasApi.$get('/enquetes/'+id)
        .then(async (response) => {
            console.log('Detail enquete ++++++++++',response.data)
            this.$store.dispatch('enquetes/getDetail',response.data)
            this.model.id= response.data.id
            this.model.nom_enquete= response.data.nom_enquete
            this.selectedSource_financements= response.data.source_financements[0]
            this.changeSource_financement(response.data.source_financements[0])
            this.selectedType_sources = response.data.type_sources[0]
            this.model.numero_agrement = response.data.numero_agrement
            this.model.numero_autorisation = response.data.numero_autorisation
            this.model.debut_intervention = response.data.debut_intervention
            this.model.fin_intervention = response.data.fin_intervention
            this.model.adresse_enquete = response.data.adresse_enquete
            this.model.telephone_enquete= response.data.telephone_enquete
            this.model.email_enquete= response.data.email_enquete
            //this.selectedType_zone_interventions= response.data.type_zone_interventions[0]
            this.model.type_zone_value = response.data.type_zone_interventions[0]
            this.changeType_zone_intervention(response.data.type_zone_interventions[0])
            this.selectedRegions= response.data.regions.map((item)=>{return item.id})
            this.selectedDepartements= response.data.departements.map((item)=>{return item.id})
            this.selectedDimensions= response.data.dimensions.map((item)=>{return item.id})
            //this.SelectedSource_financements= response.data.source_financements[0]
        }).catch((error) => {
             this.$toast.error(error?.response?.data?.message).goAway(3000)
            console.log('Code error ++++++: ', error?.response?.data?.message)
        }).finally(() => {
            console.log('Requette envoyé ')
        });
        //console.log('total items++++++++++',this.paginationenquete)
      },
      handleFileUpload(e){
        //Recupère le fichier
        const input = this.$refs.file
        const files = input.files

        //Recupère l'extension
        let idxDot = files[0]?.name.lastIndexOf(".") + 1;
        let extFile = files[0]?.name.substr(idxDot, files[0].name.length).toLowerCase();
        let size = files[0]?.size/1024/1024 //La taille en Mbit
        console.log('Size-------------- ',size)
        if(files.length!=0){
          if (size <= 5 && (extFile=="jpg" || extFile=="jpeg" || extFile=="png" || extFile=="pdf" || extFile=="doc" || extFile=="docx")){
            this.model.accord_siege = files[0];
            this.filename = files[0].name
          }else{
            alert("Seul les fichiers jpg/jpeg/png/pdf/doc/docx et de taille inférieur à 5Mb sont acceptés!");
          }
        }
      },
      submitForm () {
        this.loading = true

        let validation = this.$refs.form.validate()

        let source_financements = this.selectedSource_financements?.id
        let type_sources = this.selectedType_sources?.id
        let departements = this.selectedDepartements
        let regions = this.selectedRegions
        let dimensions = this.selectedDimensions
        let type_zone_interventions = this.selectedType_zone_interventions

        let formData = new FormData();

        formData.append("id", this.model.id);
        formData.append("_method", "put");
        formData.append("nom_enquete", this.model.nom_enquete);
        formData.append("numero_autorisation",this.model.numero_autorisation);
        formData.append("accord_siege",this.model.accord_siege);
        formData.append("numero_agrement",this.model.numero_agrement);
        formData.append("adresse_enquete",this.model.adresse_enquete);
        formData.append("debut_intervention",this.model.debut_intervention);
        formData.append("fin_intervention",this.model.fin_intervention);
        formData.append("telephone_enquete",this.model.telephone_enquete);
        formData.append("email_enquete",this.model.email_enquete);

        formData.append("source_financements",source_financements);
        formData.append("type_sources",type_sources);
        formData.append("departements",departements);
        formData.append("regions",regions);
        formData.append("dimensions",dimensions);
        formData.append("type_zone_interventions",type_zone_interventions);

        /* formData.append("firstname_responsable",this.model.firstname_responsable)
        formData.append("lastname_responsable",this.model.lastname_responsable)
        formData.append("email_responsable",this.model.email_responsable)
        formData.append("telephone_responsable",this.model.telephone_responsable)
        formData.append("fonction_responsable",this.model.fonction_responsable) */

        let data = {
          ...this.model,
          source_financements : source_financements,
          type_sources : type_sources,
          departements : departements,
          regions : regions,
          dimensions : dimensions,
          type_zone_interventions : type_zone_interventions
        }

        console.log('Donées formulaire source financements ++++++: ',data)

        console.log('FormData ++++++ : ',formData)



       validation && this.$msasFileApi.post('/enquetes/'+this.model.id,formData)
          .then((res) => {
            console.log('Donées reçus ++++++: ',res)
            this.$store.dispatch('toast/getMessage',{type:'success',text:res.data.message})
            this.$router.push('/enquetes');
          })
          .catch((error) => {
              console.log('Code error ++++++: ', error)
              this.$store.dispatch('toast/getMessage',{type:'error',text:error || 'Echec de l\'ajout '})
          }).finally(() => {
            this.loading = false;
            console.log('Requette envoyé ')
        });
      },
      resetForm () {
        this.$refs.form.reset()
      },
      resetValidationForm () {
        this.$refs.form.resetValidation()
      },
      async changeRole(role) {

        let checkRole = this.model.roles.filter(item => item.name === 'agent_enquete').length;
        if(checkRole==1)
        this.showFournisseur=true
        else
        this.showFournisseur=false
        console.log('************',checkRole)
      },
      async changeSource_financement(source) {
        console.log('Source fin ************',source)
        this.showTypeSource=true
        this.selectedSource_financements = source
        this.model.listtypesources = source.type_sources

        switch(source.libelle_source){
          case 'EPS' : {
            console.log('************',this.showNumAutorisation)
            this.showAdresseEnquete=true

            this.showNumAutorisation=false
            this.showNumAgrement=false
            this.showAccordSiege=false
            this.showDebutIntervention=false
            this.showFinIntervention=false
          }
          break;
          case 'SPS' : {
            this.showNumAutorisation=true
            this.showAdresseEnquete=true

            this.showNumAgrement=false
            this.showAccordSiege=false
            this.showDebutIntervention=false
            this.showFinIntervention=false
          }
          break;
          case 'PTF' : {
            this.showNumAgrement=true
            this.showAccordSiege=true
            this.showNumAutorisation=false
            this.showDebutIntervention=true
            this.showFinIntervention=true
            this.showAdresseEnquete=true
          }
          break;
          case 'ONG' : {
            this.showNumAgrement=true
            this.showAdresseEnquete=true

            this.showNumAutorisation=false
            this.showAccordSiege=false
            this.showDebutIntervention=false
            this.showFinIntervention=false
          }
          break;
          case 'RSE' : {
            this.showAdresseEnquete=true

            this.showNumAutorisation=false
            this.showNumAgrement=false
            this.showAccordSiege=false
            this.showDebutIntervention=false
            this.showFinIntervention=false
          }
          break;
          case 'CT' : {
            this.showAdresseEnquete=false

            this.showNumAutorisation=false
            this.showNumAgrement=false
            this.showAccordSiege=false
            this.showDebutIntervention=false
            this.showFinIntervention=false
          }
          break;
        }
        /* let checkSource = this.model.source_financements.filter(item => item.libelle_source === 'EPS').length;
        if(checkRole==1){
          this.showTypeSource=true
        }
        else
        this.showTypeSource=false */
        console.log('************',source)
      },
      async changeType_source(type_source) {
        this.selectedType_sources = type_source
        console.log('************',type_source)
      },
      async changeType_zone_intervention(e) {
        console.log('************',e)
        this.selectedType_zone_interventions = e.id
        switch(e.libelle_zone){
          case 'National' : {
            this.showRegion=false
            this.selectedDepartements = []
            this.selectedRegions = []
          }
          break;
          case 'Régional' : {
            this.showRegion=true
          }
          break;
        }
      },
    },
    metaInfo () {
      return {
        items: this.items,
      }
    }
  }
</script>