<template>

  <h1 class="my-5">Formularios con Vue.js</h1>

  <form @submit.prevent="procesarFormulario">
    <Input :task="task" />
  </form>
  <hr>
  <ListTasks />
</template>   

<script>

import Input from '../components/Input'
import ListTasks from '../components/ListTasks'
import {mapActions} from 'vuex'
const shortid = require('shortid');

export default {
  name: 'Home',
  components: {
    Input, ListTasks
  },
  data() {
    return {
      task: {
        id: '',
        name: '',
        categories: [],
        state: '',
        number: 0
      }
    }
  },
  methods: {
    ...mapActions(['setTasks','getTasks']),
    procesarFormulario(){
      console.log(this.task)
      if(this.task.name.trim() === ""){
        console.log('Campo vacío')
        return
      }
      console.log('no está vacio')

      // generar id
      this.task.id = shortid.generate()
      console.log(this.task.id)
      
      // envian los datos
      this.setTasks(this.task)

      // limpiar datos
      this.task = {
        id: '',
        name: '',
        categories: [],
        state: '',
        number: 0
      }
    }
  },
  created() {
    this.getTasks()
  }

}
</script>
