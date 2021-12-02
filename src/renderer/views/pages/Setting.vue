<template>
  <v-container fluid>

    <!-- Preferences -->
    <v-card-title class="font-weight-regular lightText--text">Preferences</v-card-title>

    <v-card outlined>

      <!-- Description -->
      <v-card-subtitle>
        Customize application appearance and behaviour.
      </v-card-subtitle>

      <!-- Content -->
      <v-card-text class="my-2">
        <v-row dense>

          <!-- Dark Mode -->
          <v-col cols="6">
            <v-switch :ripple="false" label="Dark Mode" v-model="darkMode"></v-switch>
          </v-col>

          <!-- Mini Drawer -->
          <v-col cols="6">
            <v-switch :ripple="false" label="Mini Navigation" v-model="miniDrawer"></v-switch>
          </v-col>

          <!-- Startup -->
          <v-col cols="6">
            <v-checkbox :ripple="false" label="Launch on windows startup" v-model="startup"></v-checkbox>
          </v-col>

        </v-row>
      </v-card-text>
    </v-card>

    <!-- Data -->
    <v-card-title class="font-weight-regular lightText--text">Data</v-card-title>

    <v-card outlined>

      <!-- Description -->
      <v-card-subtitle>
        Control application storage data.
      </v-card-subtitle>

      <!-- Content -->
      <v-card-text class="my-2">
        <v-row dense>

          <v-col cols="6">

            <!-- Clear Button -->
            <v-btn tile text color="primary" @click="clearData">
              Clear Saved Data
            </v-btn>

            <!-- Reset Button -->
            <v-btn class="ma-2" tile text color="primary" @click="resetSetting">
              Reset Setting
            </v-btn>
          </v-col>

        </v-row>
      </v-card-text>
    </v-card>

  </v-container>
</template>

<script>

// Store
import {mapGetters} from "vuex";

export default {
  name: "Setting",

  computed: {

    darkMode: {
      get() {
        return this.$store.getters["app/isDarkMode"];
      },
      set(state) {
        return this.$store.commit("app/setDarkMode", state);
      }
    },

    miniDrawer: {
      get() {
        return this.$store.getters["app/isMiniDrawer"];
      },
      set(state) {
        return this.$store.commit("app/setMiniDrawer", state);
      }
    },

    startup: {
      get() {
        return this.$store.getters["app/getStartup"];
      },
      set(state) {
        return this.$store.commit("app/setStartup", state);
      }
    },
  },

  methods: {

    /**
     * Clear all local storage data.
     */
    clearData() {

      // this.$truStorage.clear();
    },

    /**
     * Reset all app setting.
     */
    resetSetting: function () {

    }
  }
}

</script>
