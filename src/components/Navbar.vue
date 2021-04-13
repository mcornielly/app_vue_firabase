<template>
  <div class="navbar navbar-dark bg-dark">
      <router-link to="/" class="navbar-brand">
          Formularios
      </router-link>
      <div class="d-flex">
          <router-link v-if="userAuth" class="btn btn-dark" to="/">
            Tareas
          </router-link>
          <router-link v-if="!userAuth" class="btn btn-dark" to="/registro">
            Registrar
          </router-link>
          <router-link v-if="!userAuth" class="btn btn-dark" to="/ingreso">
            Ingresar
          </router-link>
          <button
          class="btn btn-dark"
            v-if="userAuth"
            @click="logout"
          >
            Cerrar Sesión
          </button>
      </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['userAuth'])
  },
  methods: {
    ...mapActions(['logout'])
  }
}
</script>

