<template>
  <div>
    <h2>{{msg}}</h2>
    <hr/>
    {{a()}}
    <h3>{{$store.state.count}}</h3>
    <button @click="add">+</button>
    <button @click="reduce">-</button>
    <a href="#/login?i=2&f=1">222</a>

  </div>


</template>
<script>
  import { mapState,mapMutations } from 'vuex';
  import api from '../model/Resource'
  export default{
    data(){
      return{
        msg:'Hello Vuex',
        a: () => {
          this.$axios.get('http://local.novacare.com/new/backend/camera/clearSetting').then(() => {
            console.log(1);
          });
        }
      }
    },
    methods:mapMutations([
      'add','reduce'
    ]),


  }
</script>

