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

              <v-col cols="12">
                <v-text-field outlined dense prepend-inner-icon="mdi-pencil-outline" label="Rank"
                              v-model="team.rank">
                </v-text-field>
              </v-col>

              <v-col cols="12" class="mb-6">
                <ImageBrowse title="Team Logo" v-model="team.teamLogo"></ImageBrowse>
              </v-col>

              <v-col cols="12">
                <v-text-field outlined dense prepend-inner-icon="mdi-pencil-outline" label="Team Name"
                              v-model="team.teamName">
                </v-text-field>
              </v-col>

              <v-col>
                <v-text-field outlined dense prepend-inner-icon="mdi-pencil-outline" label="WWCD"
                              v-model.number="team.wwcd">
                </v-text-field>
              </v-col>

              <v-col>
                <v-text-field outlined dense prepend-inner-icon="mdi-pencil-outline" label="Kill Points"
                              v-model.number="team.killPoints">
                </v-text-field>
              </v-col>

              <v-col>
                <v-text-field outlined dense prepend-inner-icon="mdi-pencil-outline" label="Total Points"
                              v-model.number="team.totalPoints">
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
  name: "Standings",

  components: {TabHeader, ImageBrowse},

  mixins: [staticTab],

  data: () => ({
    formData: [
      {rank: "", teamLogo: "", teamName: "", wwcd: null, killPoints: null, totalPoints: null},
      {rank: "", teamLogo: "", teamName: "", wwcd: null, killPoints: null, totalPoints: null},
      {rank: "", teamLogo: "", teamName: "", wwcd: null, killPoints: null, totalPoints: null},
      {rank: "", teamLogo: "", teamName: "", wwcd: null, killPoints: null, totalPoints: null},
      {rank: "", teamLogo: "", teamName: "", wwcd: null, killPoints: null, totalPoints: null},
      {rank: "", teamLogo: "", teamName: "", wwcd: null, killPoints: null, totalPoints: null},
      {rank: "", teamLogo: "", teamName: "", wwcd: null, killPoints: null, totalPoints: null},
      {rank: "", teamLogo: "", teamName: "", wwcd: null, killPoints: null, totalPoints: null},
      {rank: "", teamLogo: "", teamName: "", wwcd: null, killPoints: null, totalPoints: null},
      {rank: "", teamLogo: "", teamName: "", wwcd: null, killPoints: null, totalPoints: null},
      {rank: "", teamLogo: "", teamName: "", wwcd: null, killPoints: null, totalPoints: null},
      {rank: "", teamLogo: "", teamName: "", wwcd: null, killPoints: null, totalPoints: null},
      {rank: "", teamLogo: "", teamName: "", wwcd: null, killPoints: null, totalPoints: null},
      {rank: "", teamLogo: "", teamName: "", wwcd: null, killPoints: null, totalPoints: null},
      {rank: "", teamLogo: "", teamName: "", wwcd: null, killPoints: null, totalPoints: null},
      {rank: "", teamLogo: "", teamName: "", wwcd: null, killPoints: null, totalPoints: null}
    ]
  }),

  methods: {

    /**
     * Reset all data and emit a reset event.
     */
    reset() {

      // Reset page inputs
      this.formData = [
        {rank: "", teamLogo: "", teamName: "", wwcd: null, killPoints: null, totalPoints: null},
        {rank: "", teamLogo: "", teamName: "", wwcd: null, killPoints: null, totalPoints: null},
        {rank: "", teamLogo: "", teamName: "", wwcd: null, killPoints: null, totalPoints: null},
        {rank: "", teamLogo: "", teamName: "", wwcd: null, killPoints: null, totalPoints: null},
        {rank: "", teamLogo: "", teamName: "", wwcd: null, killPoints: null, totalPoints: null},
        {rank: "", teamLogo: "", teamName: "", wwcd: null, killPoints: null, totalPoints: null},
        {rank: "", teamLogo: "", teamName: "", wwcd: null, killPoints: null, totalPoints: null},
        {rank: "", teamLogo: "", teamName: "", wwcd: null, killPoints: null, totalPoints: null},
        {rank: "", teamLogo: "", teamName: "", wwcd: null, killPoints: null, totalPoints: null},
        {rank: "", teamLogo: "", teamName: "", wwcd: null, killPoints: null, totalPoints: null},
        {rank: "", teamLogo: "", teamName: "", wwcd: null, killPoints: null, totalPoints: null},
        {rank: "", teamLogo: "", teamName: "", wwcd: null, killPoints: null, totalPoints: null},
        {rank: "", teamLogo: "", teamName: "", wwcd: null, killPoints: null, totalPoints: null},
        {rank: "", teamLogo: "", teamName: "", wwcd: null, killPoints: null, totalPoints: null},
        {rank: "", teamLogo: "", teamName: "", wwcd: null, killPoints: null, totalPoints: null},
        {rank: "", teamLogo: "", teamName: "", wwcd: null, killPoints: null, totalPoints: null}
      ];

      // Emit a reset event
      this.sendToServer("reset");
    },

    killsChanged(value, index) {

      this.formData[index].totalPoints = value + this.formData[index].wwcd;
    },

    wwcdChanged(value, index) {

      this.formData[index].totalPoints = value + this.formData[index].killPoints;
    }
  }
}

</script>
