<template>
  <!-- Editar {{$route.params.id}} - {{tarea}} -->
  <h1 class="my-5">Editar Tarea: {{task.name}}</h1>
  <form @submit.prevent="updateTask(task)">
    <Input :task="task" />
  </form>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import Input from '../components/Input'
export default {
    components:{
        Input
    },
    computed: {
        ...mapState(['task'])
    },
    methods: {
        ...mapActions(['setTask', 'updateTask'])
    },
    created(){
        this.setTask(this.$route.params.id)
    }
}
</script>
