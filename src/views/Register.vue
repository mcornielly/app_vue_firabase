<template>
    <h1>Registro de Usuario</h1>
    <form @submit.prevent="processForm">
        <input type="email" placeholder="Ingrese un Email" class="form-control my-2" v-model.trim="email">
        <input type="password" placeholder="Ingrese un Clave" class="form-control my-2" v-model.trim="pass_1">
        <input type="password" placeholder="Confirmar contraseña" class="form-control my-2" v-model.trim="pass_2">
        <button type="submit" class="btn btn-primary" :disabled="locked">Registrar</button>
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
            pass_2: ''
        }
    },
    computed: {
        locked() {
            if(!this.email.includes('@')){
                return true
            }
            if(this.pass_1.length > 5 && this.pass_1 === this.pass_2){
                return false
            }
            return true
        }
    },
    methods: {
        ...mapActions(['registerUser']),
        processForm(){
            this.registerUser({email: this.email, password: this.pass_1})
            this.email = '';
            this.pass_1 = '';
            this.pass_2 = '';
        }
    }

}
</script>

<style>

</style>