<template>

  <v-card tile outlined>

    <!-- Card Toolbar -->
    <v-toolbar tile flat dense color="transparent">

      <v-toolbar-title v-text="title" class="subtitle-1 lightText--text"></v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>

        <!-- Add Row Button -->
        <v-btn small text color="primary" @click="$refs.uploadInput.click()">

          <v-icon left dense>{{ value ? 'mdi-swap-horizontal' : 'mdi-plus' }}</v-icon>
          {{ value ? "Replace" : "Add" }}
          <input ref="uploadInput" type="file" multiple
                 v-show="false" accept="image/*"
                 @change="browseImages"/>

        </v-btn>

      </v-toolbar-items>

    </v-toolbar>

    <!-- Images Preview -->
    <v-card-text v-if="value">

      <v-row no-gutters align="center" :justify="displayInfo ? 'start' : 'center'">

        <v-col cols="auto">
          <v-hover v-slot:default="{hover}">
            <v-avatar class="profile mr-4" rounded size="80">
              <v-img :src="value">

                <v-row class="fill-height" align="center" justify="center">
                  <v-fade-transition>

                    <v-overlay v-if="hover" absolute>

                      <!-- Remove Image Button -->
                      <v-btn small color="white" v-if="hover" class="ma-2"
                             outlined fab @click="removeImage">
                        <v-icon>mdi-trash-can-outline</v-icon>
                      </v-btn>

                    </v-overlay>
                  </v-fade-transition>
                </v-row>

              </v-img>
            </v-avatar>
          </v-hover>
        </v-col>

        <v-col v-if="displayInfo" class="lightText--text">
          <h3 class="text-truncate">Path: <span class="subtitle-1">{{ value }}</span></h3>
        </v-col>
      </v-row>

    </v-card-text>

  </v-card>

</template>

<script>

export default {
  name: "ImageBrowse",

  data: () => ({}),

  props: {
    value: {required: true},
    title: {type: String, default: "Image"},
    displayInfo: {type: Boolean, default: false}
  },

  methods: {

    // Browse local images and emit them to the parent
    browseImages(event) {

      let image = event.target.files[0];

      if (!image) return;

      // Emit images to parent
      this.$emit("input", image.path);

      // Reset the input field so we can re-add the same file
      event.target.value = "";
    },

    // Remove the image and emit changes
    removeImage() {

      // Emit images changes to parent
      this.$emit("input", "");
    }
  }
}

</script>

<style scoped lang="scss">

::v-deep .v-toolbar__content {
  padding-right: 0 !important;
}

</style>
