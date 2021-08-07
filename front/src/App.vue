<template>
  <v-app>
    <div v-if="$store.getters.login">
      <Navbar/>
    </div>
    <div style="position: relative; padding-top: 55px;">
      <router-view/>
    </div>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar";

export default {
  name: 'App',
  components:{
    Navbar
  }
};
</script>
