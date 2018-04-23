<template>
  <div class="Menu">
    <h1> Users : </h1>
    <p v-if="users.length == 1"> There is 1 user in the database </p>
    <p v-if="users.length > 1"> There are {{users.length}} users in the database </p>
    <p v-if="users.length == 0">No users in database</p>
    <p v-for="(user, index) in users" v-bind:key="index">- {{user.name}} ({{user.email}}) <button @click="edit(index)">Edit</button></p>
    <br>
    <p> Name: <input type="text" v-model="name"></p>
    <p> E-mail: <input type="text" v-model="email"></p>
    <button v-on:click="addUser()">Add User</button>
  </div>
</template>

<script>

import {HTTP} from './services/HTTP.js'

export default {
  name: 'Menu',
  data () {
    return {
      users: [],
      errors: [],
      name: '',
      email: '',
    }
  },

  methods: {
    loadUsers: function() {
      HTTP.get(`users`)
      .then(response => {
        this.users = response.data
      })
      .catch(e => {
        this.errors.push(e)
      })
    },

    addUser: function() {
      HTTP.post('users', {
        name: this.name,
        email: this.email
      })
      .then(res => {
        return HTTP.get('users')
      })
      .then(res => {
        this.users = res.data
      })
      .catch(e => {
        this.errors.push(e)
      })

      this.name = "";
      this.email = "";
    },

    edit: function(id) {
      this.$router.push({path: 'users/' + id})
    }
  },

  created () {
    this.loadUsers()
  },

  beforeUpdate() {
    this.loadUsers()
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
