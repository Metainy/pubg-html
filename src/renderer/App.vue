<template>

  <v-app>
    <SideNavigation></SideNavigation>
    <MainLayout></MainLayout>
    <StatusBar></StatusBar>
  </v-app>

</template>

<script>

// Store
import {mapActions} from "vuex";

// Components
import SideNavigation from "@components/layouts/SideNavigation";
import MainLayout from "@views/layouts/MainLayout";
import StatusBar from "@/components/layouts/StatusBar";

export default {
  name: "App",

  components: {SideNavigation, MainLayout, StatusBar},

  data: () => ({}),

  methods: {
    ...mapActions("app", ["getAppDetails", "loadDefaults", "registerUpdateEvents"]),
    ...mapActions("server", ["loadStatus"]),
  },

  created() {

    // Load default values from setting file
    this.loadDefaults();

    // Load app details
    this.getAppDetails();

    // Register all update events
    this.registerUpdateEvents();

    // Load server status info
    this.loadStatus();
  }
}

</script>
