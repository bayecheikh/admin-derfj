<template>
  <div>
    <v-form class="text-sm-left" v-model="valid" ref="form">
      <v-row>
        <v-col md="6" lg="6" sm="12">
          <v-text-field
            label="Nom"
            outlined dense
            v-model="model.libelle"
            :rules="rules.libelleRules"
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
import { mapMutations, mapGetters } from 'vuex'
  export default {
    components: {
    },
    mounted: function() {
      this.model.id = this.detailsous_secteur.id
      this.model.libelle = this.detailsous_secteur.libelle
    },
    computed: mapGetters({
      detailsous_secteur:'sous_secteurs/detailsous_secteur'
    }),
    data: () => ({
      loading: false,
      message:null,
      color:null,
      valid: true,
      selectedItem: 0,
      valid: true,
      model: {
        id:null,
        libelle: ''
      },
      rules:{
        libelleRules: [
          v => !!v || 'Nom est obligatoire',
          v => (v && v.length <= 50) || 'Nom doit etre inférieur à 20 caratères',
        ],
        slugRules: [
          v => !!v || 'Slug est obligatoire'
        ],
      },
    }),
    methods: {
      submitForm () {
        this.loading = true;
        let validation = this.$refs.form.validate()
        console.log('Donées formulaire ++++++ : ',{...this.model})
        this.loading = false;
        
        validation && this.$msasApi.put('/sous_secteurs/'+this.model.id, {...this.model})
          .then((res) => {    
            this.$store.dispatch('toast/getMessage',{type:'success',text:res.data.message || 'Ajout réussi'})
            this.$router.push('/sous_secteurs');
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
    }
  }
</script>