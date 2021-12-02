<template>
  <transition name="slide-fade" mode="out-in">

    <v-footer app dark inset elevation="2" width="50%" color="darkBackground" class="mx-auto py-4 rounded-t"
              v-show="this.isUpdateDownloading"
    >

      <!-- Download Data -->
      <v-row align="center" justify="center">

        <v-col cols="auto">
          <span class="caption">Downloading</span>
        </v-col>

        <v-col class="py-0">
          <span class="caption">{{ getDownloadData.percentage }}%</span>
          <v-progress-linear rounded color="primary" :value="getDownloadData.percentage"></v-progress-linear>
          <span class="caption float-right">
            {{ getDownloadData.currentSize }}MB / {{ getDownloadData.totalSize }}MB
          </span>
        </v-col>

      </v-row>

      <!-- Download Update Dialog -->
      <UpdateDialog v-model="downloadDialog" v-if="isUpdateFound" @confirm="confirmDownload"></UpdateDialog>

      <!-- Restart Confirm Dialog -->
      <RestartDialog v-model="restartDialog" v-if="isUpdateDownloaded" @confirm="confirmRestart"></RestartDialog>

    </v-footer>

  </transition>
</template>

<script>

// Store
import {mapGetters, mapActions} from "vuex";

// Components
import UpdateDialog from "@components/common/UpdateDialog";
import RestartDialog from "@components/common/RestartDialog";

export default {
  name: "StatusBar",

  components: {UpdateDialog, RestartDialog},

  data: () => ({
    downloadDialog: true,
    restartDialog: true,
  }),

  computed: {
    ...mapGetters("app", ["isUpdateFound", "isUpdateDownloading", "getDownloadData", "isUpdateDownloaded"])
  },

  methods: {
    ...mapActions("app", ["downloadUpdate", "installUpdate"]),

    /**
     * Dialog confirmation handler to start downloading the update.
     */
    confirmDownload() {

      // Download updates
      this.downloadUpdate();

      // Hide the dialog
      this.downloadDialog = false;
    },

    /**
     * User confirmed application restart.
     */
    confirmRestart() {

      // Hide the dialog
      this.restartDialog = false;

      // Install update and restart
      this.installUpdate();
    }
  }
}

</script>
