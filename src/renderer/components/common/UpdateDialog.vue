<template>

  <v-dialog v-model="dialog" persistent max-width="420">

    <v-card class="ma-0" color="background">

      <v-card-title>Update Available</v-card-title>

      <v-card-text>
        A newer version has been released. Would you like to start the download now?
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="dialog = false">No</v-btn>
        <v-btn color="primary" text @click="$emit('confirm')">Yes</v-btn>
      </v-card-actions>

    </v-card>

  </v-dialog>

</template>

<script>

export default {
  name: "UpdateDialog",

  props: {
    value: Boolean
  },

  computed: {

    dialog: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  }
}

</script>
