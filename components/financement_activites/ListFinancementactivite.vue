<template>
  <div>
    <div class="d-flex border-bottom-solid">
      <div>
        <v-tabs v-model="tab">
          <v-tab class="text-normal" v-for="item in tabItems" :key="item.value"> {{item.title}}</v-tab>
        </v-tabs>
      </div>
      <div class="ml-auto p-2">
        <v-btn
        depressed
        rounded
        color="primary"
        @click="goToAddfinancement_activite"
        >
          <v-icon left>
            mdi-plus
          </v-icon>
          Nouveau financement par activité
        </v-btn>
      </div>
    </div>
    
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in tabItems"  :key="item.value" >
          <table-financementactivite :tab="item.value"></table-financementactivite> 
      </v-tab-item>          
    </v-tabs-items>
  </div>
</template>
<script>
import TableFinancementactivite from '@/components/financement_activites/TableFinancementactivite'
  export default {
    components: {
      TableFinancementactivite
    },
    data: () => ({
      tab: null,
      tabItems: [
        {title:'Tout',value:'tout'}
      ],
      selected: []
    }),
    methods:{
      goToAddfinancement_activite() {      
        this.$router.push('/financement_activites/addFinancementactivite');
      },
    }
  }
</script>
<style scoped>
.border-bottom-small{
  border-bottom: solid 1px #80808052;
}
</style>