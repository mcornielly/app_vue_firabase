import { createStore } from 'vuex'
import router from '../router'
import store from '../store'

export default createStore({
  state: {
    tasks: [],
    task: {
      id: '',
      name: '',
      categories: [],
      state: '',
      number: 0
    },
    user: null
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
    },
    load(state, payload) {
      state.tasks = payload
    },
    set(state, payload) {
      state.tasks.push(payload)
      console.log(state.user.idToken)
      // localStorage.setItem('tasks', JSON.stringify(state.tasks))
    },
    delete(state, payload) {
      state.tasks = state.tasks.filter(item => item.id !== payload)
      // localStorage.setItem('tasks', JSON.stringify(state.tasks))
    },
    task(state, payload) {
      if (!state.tasks.find(item => item.id === payload)) {
        router.push('/')
        return
      }
      state.task = state.tasks.find(item => item.id === payload)
    },
    update(state, payload) {
      state.tasks = state.tasks.map(item => item.id === payload.id ? payload : item)
      router.push('/')
      // localStorage.setItem('tasks', JSON.stringify(state.tasks))
    }
  },
  actions: {
    logout({ commit }) {
      commit('setUser', null),
      router.push('/ingreso')
      localStorage.removeItem('user')
    },
    async loginUser({ commit }, user) {
      try {
        const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA_mue5PyNR7XRg3KSUpyOf5i-3DDzCepQ',{
          method: 'POST',
          body: JSON.stringify({
            email: user.email,
            password: user.password,
            returnSecureToken: true
          })  
        })
        const data = await res.json();
        console.log(data)
        if(data.error){
          return console.log(data.error)
        }
        commit('setUser', data)
        router.push('/')
        localStorage.setItem('user', JSON.stringify(data))
      } catch (error) {
        console.error(error)
      }
    },
    async registerUser({ commit }, user) {
      try {
        const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA_mue5PyNR7XRg3KSUpyOf5i-3DDzCepQ', {
          method: 'POST',
          body: JSON.stringify({
            email: user.email,
            password: user.password,
            returnSecureToken: true
          })  
        })
        const data = await res.json()
        console.log(data)
        if(data.error){
          console.log(data.error)
          return
        }
        commit('setUser', data)
        router.push('/')
        localStorage.setItem('user', JSON.stringify(data))
      } catch (error) {
        console.error(error)
      }
      console.log(user)
    },
    async getTasks({ commit, state }) {
      if(localStorage.getItem('user')) {
        commit('setUser', JSON.parse(localStorage.getItem('user')))
      } else {
        return commit('setUser', null)
      }
      try {
        const res = await fetch(`https://api-vue-firebase-default-rtdb.firebaseio.com/tasks/${state.user.localId}.json?auth=${state.user.idToken}`)
        const data = await res.json()

        let arrayTasks = [];

        for(let id in data){
          arrayTasks.push(data[id])
        }
        // console.log(arrayTasks)
        commit('load', arrayTasks)

      } catch (error) {
        console.error(error)
      }
    },
    async setTasks({ commit, state }, task) {
      try {
        
        const res = await fetch(`https://api-vue-firebase-default-rtdb.firebaseio.com/tasks/${state.user.localId}/${task.id}.json?auth=${state.user.idToken}`,{
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(task)
        })

        const data = await res.json()
        commit('set', task)
      } catch (error) {
        console.error(error)
      }
    },
    async deleteTask({ commit, state }, id) {
      try {
        const res = await fetch(`https://api-vue-firebase-default-rtdb.firebaseio.com/tasks/${state.user.localId}/${id}.json?auth=${state.user.idToken}`,{
          method: 'DELETE'
        })
        commit('delete', id)
      } catch (error) {
        console.error(error)
      }
    },
    setTask({ commit }, id) {
      commit('task', id)
    },
    async updateTask({ commit, state }, task) {
      try {
        const res = await fetch(`https://api-vue-firebase-default-rtdb.firebaseio.com/tasks/${state.user.localId}/${task.id}.json?auth=${state.user.idToken}`,{
          method: 'PATCH',
          body: JSON.stringify(task)
        })
        const data = await res.json();
        commit('update', task)
      } catch (error) {
        console.error(error)
      }
    }
  },
  getters: {
    userAuth(state) {
      return !!state.user
    }
  },
  modules: {
  }
})
