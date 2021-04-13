<template>
  <input 
      type="text"
      class="form-control my-2"
      placeholder="Ingrese nombre"
      v-model.trim="task.name"
    >

    <div class="form-check form-check-inline">
      <input 
        type="checkbox"
        id="check-1"
        class="form-check-input"
        v-model="task.categories"
        value="javascript"
      >
      <label for="check-1" class="form-check-label">Javascript</label>
    </div>
    <div class="form-check form-check-inline">
      <input 
        type="checkbox"
        id="check-2"
        class="form-check-input"
        v-model="task.categories"
        value="node js"
      >
      <label for="check-2" class="form-check-label">Node.js</label>
    </div>
    <div class="form-check form-check-inline">
      <input 
        type="checkbox"
        id="check-3"
        class="form-check-input"
        v-model="task.categories"
        value="Laravel"
      >
      <label for="check-3" class="form-check-label">Laravel</label>
    </div>

    <div class="mt-2">
      <div class="form-check form-check-inline">
        <input 
          type="radio"
          id="radio-1"
          class="form-check-input"
          value="urgente"
          v-model="task.state"
        >
        <label for="radio-1" class="form-check-label">Urgente</label>
      </div>
      <div class="form-check form-check-inline">
        <input 
          type="radio"
          id="radio-2"
          class="form-check-input"
          value="relax"
          v-model="task.state"
        >
        <label for="radio-2" class="form-check-label">Relax</label>
      </div>
    </div>

    <div class="mt-2">
      <input 
        type="number"
        class="form-control"
        v-model.number="task.number"
      >
    </div>

    <button 
      class="btn btn-dark mt-2 btn-block" 
      type="submit"
      :disabled="locked"
    >
      Procesar
    </button>
</template>

<script>
export default {
    props: {
        task: Object
    },
    computed: {
        locked(){
            return this.task.name.trim() === "" ? true : false
        }
  }
}
</script>