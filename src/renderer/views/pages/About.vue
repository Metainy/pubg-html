<template>
  <v-container fluid>

    <!-- Server Information -->
    <v-card-title class="font-weight-regular lightText--text">Server Information</v-card-title>

    <v-card outlined>

      <!-- Description -->
      <v-card-subtitle>
        This connection information used by clients to connect to this server.
      </v-card-subtitle>

      <!-- Content -->
      <v-card-text class="my-2">

        <v-row dense>
          <v-col cols="2">Connected Clients</v-col>
          <v-col class="lightText--text font-weight-medium">{{ getClientsCount }}</v-col>
        </v-row>

        <v-divider class="my-3"></v-divider>

        <v-row dense>
          <v-col cols="2">Local IP Address</v-col>
          <v-col class="lightText--text font-weight-medium">{{ getLocalIP }}</v-col>
        </v-row>

        <v-divider class="my-3"></v-divider>

        <v-row dense>
          <v-col cols="2">Connection Port</v-col>
          <v-col class="lightText--text font-weight-medium">{{ getLocalPort }}</v-col>
        </v-row>

        <v-divider class="my-3"></v-divider>

        <v-row dense>
          <v-col cols="2">Connection URL</v-col>
          <v-col class="lightText--text font-weight-medium">{{ connectionURL }}</v-col>
          <v-col cols="auto" class="text-right primary--text">
            <v-btn tile text small color="primary" @click="copyText(connectionURL)">Copy</v-btn>
          </v-col>
        </v-row>

      </v-card-text>
    </v-card>

    <!-- Application Information -->
    <v-card-title class="font-weight-regular lightText--text">Application</v-card-title>

    <v-card outlined>

      <!-- Content -->
      <v-card-text class="my-2">

        <v-row dense>
          <v-col cols="2">Current Version</v-col>
          <v-col cols="auto" class="lightText--text font-weight-medium mr-5">{{ appVersion }}</v-col>
          <v-col v-if="this.isUpdateFound" class="primary--text font-weight-medium">
            <a @click="download">A newer version is available.</a>
          </v-col>
        </v-row>

      </v-card-text>
    </v-card>

  </v-container>
</template>

<script>

// Store
import {mapGetters, mapActions} from "vuex";

export default {
  name: "About",

  data: () => ({}),

  computed: {
    ...mapGetters("app", ["appVersion", "isUpdateFound"]),
    ...mapGetters("server", ["getClientsCount", "getLocalIP", "getLocalPort", "getServerURI"]),

    connectionURL() {
      return `http://${this.getLocalIP}:${this.getLocalPort}/${this.getServerURI}`
    }
  },

  methods: {
    ...mapActions("app", ["downloadUpdate"]),

    /**
     * On click handler for update download link.
     */
    download() {

      // Notify main process to start downloading the update
      this.downloadUpdate();
    },

    /**
     * Copy a text to clipboard.
     *
     * @param text
     * @returns {Promise<void>}
     */
    async copyText(text) {
      try {
        await navigator.clipboard.writeText(text);
      } catch (error) {

      }
    }
  }
}

</script>

