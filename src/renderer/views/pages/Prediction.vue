<template>
  <v-container fluid>

    <!-- Page Header -->
    <TabHeader>
      <v-btn outlined small color="primary" class="mr-5" @click="sendAllToServer">Start Animation</v-btn>
      <v-btn outlined small color="primary" @click="reset">Reset</v-btn>
    </TabHeader>

    <!-- Page Content -->
    <v-row>
      <v-col cols="12" lg="6" v-for="(team, index) in formData" :key="index">

        <v-card outlined>

          <!-- Card Title -->
          <v-toolbar flat dense color="darkBackground" class="text-button lightText--text">Team</v-toolbar>

          <!-- Card Content -->
          <v-card-text>
            <v-row dense>

              <v-col>
                <v-text-field outlined dense prepend-inner-icon="mdi-pencil-outline" label="Team Name"
                              v-model="team.teamName">
                </v-text-field>
              </v-col>

              <v-col cols="12">
                <ImageBrowse title="Team Logo" v-model="team.logo"></ImageBrowse>
              </v-col>

              <v-col cols="12">
                <v-radio-group dense row label="Prediction" v-model="team.prediction">
                  <v-radio class="ml-5" label="None" :value="0"></v-radio>
                  <v-radio label="Win" :value="true"></v-radio>
                  <v-radio label="Lose" :value="false"></v-radio>
                </v-radio-group>
              </v-col>

            </v-row>
          </v-card-text>

        </v-card>

      </v-col>
    </v-row>

  </v-container>
</template>

<script>

// Components
import TabHeader from "@components/common/TabHeader";
import ImageBrowse from "@components/common/ImageBrowse";

// Mixins
import {staticTab} from "@/mixins/staticTab";

export default {
  name: "Prediction",

  components: {TabHeader, ImageBrowse},

  mixins: [staticTab],

  data: () => ({
    formData: [
      {teamName: "", logo: "", prediction: 0},
      {teamName: "", logo: "", prediction: 0}
    ]
  }),

  methods: {

    /**
     * Reset all data and emit a reset event.
     */
    reset() {

      // Reset page inputs
      this.formData = [
        {teamName: "", logo: "", prediction: 0},
        {teamName: "", logo: "", prediction: 0}
      ];

      // Emit a reset event
      this.sendToServer("reset");
    }
  }
}

</script>
