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
      <v-row class="my-0">
      <v-col md="12" lg="12" sm="12" class="my-0 py-0">
        <template>
          <v-card-title class="pl-0 pr-0">
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Rechercher un type année"
              outlined
              dense
              hide-details
              clearable
            ></v-text-field>
          </v-card-title>
          <v-data-table
            v-model="selected"
            :headers="headers"
            :items="listtype_annees"
            :loading="listtype_annees.length?false:true" 
            loading-text="Loading... Please wait"
            :single-select="singleSelect"
            item-key="id"
            show-select
            class="elevation-1"
            :search="search"
          >
          </v-data-table>
        </template>
      </v-col>
    </v-row>
      <v-btn
      :loading="loading"
        :disabled="!valid"
        depressed
        class="mr-4 text-white mt-4" color="primary"
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
      this.model.id = this.detailannee.id
      this.model.libelle = this.detailannee.libelle
      this.selected = this.detailannee.type_annees
      console.log("Type années : ",this.detailannee.type_annees)
    },
    computed: mapGetters({
      detailannee:'annees/detailannee',
      listtype_annees: 'type_annees/listtype_annees',
    }),
    data: () => ({
      loading: false,
      message:null,
      color:null,
      valid: true,
      search: '',
      selected: [],
      selectedItem: 0,
      headers : [
        {
            text: 'Type années',
            align: 'start',
            sortable: true,
            value: 'libelle',
        }
      ],
      model: {
        id:null,
        libelle: ''
      },
      rules:{
        libelleRules: [
          v => !!v || 'Libellé est obligatoire',
          v => (v && v.length <= 50) || 'Libelle doit etre inférieur à 20 caratères',
        ]
      },
    }),
    methods: {
      submitForm () {
        this.loading = true;
        let validation = this.$refs.form.validate()
        let selectedTypeannees = this.selected.map((item)=>{return item.id})
        let id = this.model.id
        console.log('Donées formulaire ++++++ : ',{...this.model,type_annees:selectedTypeannees})
        
        validation && this.$msasApi.put('/annees/'+id, {...this.model,type_annees:selectedTypeannees})
          .then((res) => {    
            this.$store.dispatch('toast/getMessage',{type:'success',text:res.data.message || 'Ajout réussi'})
            this.$router.push('/annees');
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