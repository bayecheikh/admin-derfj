<template>
  <div>
    <v-form class="text-sm-left" v-model="valid" ref="form">
      <v-row>
        <!--<v-col
            lg="6"
            md="6"
            sm="12"
          >
          <v-autocomplete
                  v-model="model.annee"
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
          </v-col>-->
        <v-col
        lg="6"
        md="6"
        sm="12"
      >
      <v-autocomplete
              v-model="model.id_source"
              :items="listsources"
              :rules="rules.fournisseur_services_idRules"
              outlined
              dense
              label="Source"
              item-text="libelle"
              item-value="id"
              return-object
              @change="changesource"
            >
        </v-autocomplete>
      </v-col>
      <v-col
        lg="6"
        md="6"
        sm="12"
      >
      <v-autocomplete
              v-model="model.id_secteur"
              :items="listsecteurs"
              :rules="rules.fournisseur_services_idRules"
              outlined
              dense
              label="Composante"
              item-text="libelle"
              item-value="id"
              return-object
              @change="changesecteur"
            >
        </v-autocomplete>
      </v-col>
        <v-col md="6" lg="6" sm="12">
          <v-text-field
            label="Montant"
            outlined dense
            v-model="model.montant"
            :rules="rules.numberRules"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-btn
      :loading="loading"
        :disabled="!valid"
        depressed
        class="mr-4 text-white" color="primary"
        @click="submitForm"
      >
        Enregistrer
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import Notification from '@/components/Notification'
import { mapMutations, mapGetters } from 'vuex'
  export default {
    components: {
      Notification
    },
    mounted: function() {
      this.getDetail(this.$nuxt._route.params.id)
      this.$store.dispatch('bailleurs/getList')
      this.$store.dispatch('secteurs/getList')
      this.$store.dispatch('annees/getList')
      this.$store.dispatch('monnaies/getList')
      
      
    },
    computed: mapGetters({
      detailfinancement_source:'financement_sources/detailfinancement_source',
      listsources: 'bailleurs/listbailleurs',
      listsecteurs: 'secteurs/listsecteurs',
      listannees: 'annees/listannees',
      listmonnaies: 'monnaies/listmonnaies',
    }),
    data: () => ({
      loading: false,
      message:null,
      color:null,
      valid: true,
      selectedItem: 0,
      valid: true,
      model: {
        montant: '',
        libelle_source:'',
        libelle_secteur:'',
        id_source:null,
        id_secteur:null,
        annee:'',
        trimestre:'',
        type:'cible',
      },
      rules:{
        libelleRules: [
          v => !!v || 'Libellé est obligatoire',
          v => (v && v.length <= 50) || 'Libelle doit etre inférieur à 20 caratères',
        ]
      },
    }),
    methods: {
      getDetail(id){
          this.progress=true
          this.$msasApi.$get('/financement_sources/'+id)
        .then(async (response) => {
            console.log('Detail ++++++++++',response)
            this.$store.dispatch('financement_sources/getDetail',response.data)
            this.model.id = this.detailfinancement_source.id
            this.model.id_source = this.detailfinancement_source.sources[0]?this.detailfinancement_source.sources[0].id:null
            this.model.libelle_source= this.detailfinancement_source.libelle_source
            this.model.id_secteur = this.detailfinancement_source.secteurs[0]?this.detailfinancement_source.secteurs[0].id:null
            this.model.libelle_secteur= this.detailfinancement_source.libelle_secteur
            this.model.montant = this.detailfinancement_source.montant
            this.model.annee = this.detailfinancement_source.annee
              }).catch((error) => {
             this.$toast.error(error?.response?.data?.message).goAway(3000)
            console.log('Code error ++++++: ', error?.response?.data?.message)
        }).finally(() => {
            console.log('Requette envoyé ')
        });
        //console.log('total items++++++++++',this.paginationanalyserisque)
      },
      submitForm () {
        this.loading = true;
        let validation = this.$refs.form.validate()
        console.log('Donées formulaire ++++++ : ',{...this.model})
        this.loading = false;
        
        validation && this.$msasApi.put('/financement_sources/'+this.model.id, {...this.model})
          .then((res) => {    
            this.$store.dispatch('toast/getMessage',{type:'success',text:res.data.message || 'Ajout réussi'})
            this.$router.push('/financement_sources');
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
      async changesource(value) {
          //resumé
          this.model.libelle_source = value.libelle     
          this.model.id_source = value.id    
      },
      async changesecteur(value) {
          //resumé
          this.model.libelle_secteur = value.libelle     
          this.model.id_secteur = value.id    
      },
      async changeAnnee(value) {
          //resumé
          this.model.annee = value     
      },
      async changeTrimestre(value) {
          //resumé
          console.log('trimestre -------- ',value)
          this.model.trimestre = value     
      },
    }
  }
</script>