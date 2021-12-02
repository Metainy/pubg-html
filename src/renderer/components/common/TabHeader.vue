<template>
  <v-app-bar app dense elevation="0" color="darkBackground">

    <!-- Title -->
    <v-toolbar-title class="text-uppercase ml-4 lightText--text" v-text="this.$route.meta.title"></v-toolbar-title>

    <v-spacer></v-spacer>

    <!-- Slot -->
    <slot></slot>

  </v-app-bar>
</template>

<script>

export default {
  name: "TabHeader"
}

</script>
