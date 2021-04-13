<template>
    <h1>Ingreso del Usuario</h1>
    <form @submit.prevent="processForm">
        <input type="email" placeholder="Ingrese un Email" class="form-control my-2" v-model.trim="email">
        <input type="password" placeholder="Ingrese un Clave" class="form-control my-2" v-model.trim="pass_1">
        <button type="submit" class="btn btn-primary" :disabled="locked">Ingresar</button>
    </form>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: 'register',
    data() {
        return {
            email: '',
            pass_1: '',
        }
    },
    computed: {
        locked() {
            if(!this.email.includes('@')){
                return true
            }
            if(this.pass_1.length > 5){
                return false
            }
            return true
        }
    },
    methods: {
        ...mapActions(['loginUser']),
        processForm(){
            this.loginUser({email: this.email, password: this.pass_1})
            this.email = '';
            this.pass_1 = '';
        }
    }

}
</script>
