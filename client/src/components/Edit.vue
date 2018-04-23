<template>
  <div class="Edit">
    <h1> Edit {{name}}'s profile: </h1>
    <p> Name: <input type="text" v-model="user.name"></p>
    <p> E-mail: <input type="text" v-model="user.email"></p>
    <p><button @click="delUser()">Remove</button> - - - <button v-on:click="saveUser()">Save</button></p>
  </div>
</template>

<script>

import {HTTP} from './services/HTTP.js'

export default {
  name: 'Edit',
  data () {
    return {
      user: {},
      errors: [],
      id: 0,
      name: "",
    }
  },

  methods: {
    saveUser: function() {
      HTTP.post('users/' + this.id, this.user)
      .then(res => {})
      .catch(e => {
        this.errors.push(e)
      })

      this.$router.push({path: '/'})
    },

    delUser: function () {
      HTTP.delete('users/' + this.id)
      .then(res => {})
      .catch(e => {
        this.erros.push(e)
      })

      this.$router.push({path: '/'})
    }
  },

  created () {
    this.id = this.$route.params.id

    HTTP.get(`users/` + this.id)
    .then(response => {
      this.user = response.data
      this.name = this.user.name
    })
    .catch(e => {
      this.errors.push(e)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>