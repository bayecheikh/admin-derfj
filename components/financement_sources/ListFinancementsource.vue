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
        @click="goToAddfinancement_source"
        >
          <v-icon left>
            mdi-plus
          </v-icon>
          Nouveau financement par source
        </v-btn>
      </div>
    </div>
    
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in tabItems"  :key="item.value" >
          <table-financementsource :tab="item.value"></table-financementsource> 
      </v-tab-item>          
    </v-tabs-items>
  </div>
</template>
<script>
import TableFinancementsource from '@/components/financement_sources/TableFinancementsource'
  export default {
    components: {
      TableFinancementsource
    },
    data: () => ({
      tab: null,
      tabItems: [
        {title:'Tout',value:'tout'}
      ],
      selected: []
    }),
    methods:{
      goToAddfinancement_source() {      
        this.$router.push('/financement_sources/addFinancementsource');
      },
    }
  }
</script>
<style scoped>
.border-bottom-small{
  border-bottom: solid 1px #80808052;
}
</style>