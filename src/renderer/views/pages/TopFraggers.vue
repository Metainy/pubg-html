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
          <v-toolbar flat dense color="darkBackground" class="text-button lightText--text">
            {{ stringifyNumber(index) }} Team
          </v-toolbar>

          <!-- Card Content -->
          <v-card-text>
            <v-row dense>

              <v-col>
                <v-text-field outlined dense prepend-inner-icon="mdi-pencil-outline" label="Rank"
                              v-model="team.rank">
                </v-text-field>
              </v-col>

              <v-col>
                <v-text-field outlined dense prepend-inner-icon="mdi-pencil-outline" label="Kills"
                              v-model="team.kills">
                </v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field outlined dense prepend-inner-icon="mdi-pencil-outline" label="Player Name"
                              v-model="team.playerName">
                </v-text-field>
              </v-col>

              <v-col cols="12" class="mb-6">
                <ImageBrowse title="Team Logo" v-model="team.teamLogo"></ImageBrowse>
              </v-col>

              <v-col>
                <v-text-field outlined dense prepend-inner-icon="mdi-pencil-outline" label="Team Name"
                              v-model="team.teamName">
                </v-text-field>
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
  name: "TopFraggers",

  components: {TabHeader, ImageBrowse},

  mixins: [staticTab],

  data: () => ({

    formData: [
      {rank: "", kills: "", playerName: "", teamLogo: "", teamName: ""},
      {rank: "", kills: "", playerName: "", teamLogo: "", teamName: ""},
      {rank: "", kills: "", playerName: "", teamLogo: "", teamName: ""},
      {rank: "", kills: "", playerName: "", teamLogo: "", teamName: ""}
    ]
  }),

  methods: {

    /**
     * Reset all data and emit a reset event.
     */
    reset() {

      // Reset page inputs
      this.formData = [
        {rank: "", kills: "", playerName: "", teamLogo: "", teamName: ""},
        {rank: "", kills: "", playerName: "", teamLogo: "", teamName: ""},
        {rank: "", kills: "", playerName: "", teamLogo: "", teamName: ""},
        {rank: "", kills: "", playerName: "", teamLogo: "", teamName: ""}
      ];

      // Emit a reset event
      this.sendToServer("reset");
    }
  }
}

</script>
