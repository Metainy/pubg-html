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
            {{ stringifyNumber(index) }} Map
          </v-toolbar>

          <!-- Card Content -->
          <v-card-text>
            <v-row dense>

              <v-col cols="12">
                <v-select dense outlined label="Maps" :items="maps" v-model="team.map"></v-select>
              </v-col>

              <v-col cols="auto">
                <v-switch dense label="Played" class="mb-3" v-model="team.played" :disabled="team.nextMap"></v-switch>
              </v-col>

              <v-col cols="12">
                <v-text-field outlined dense prepend-inner-icon="mdi-pencil-outline" label="Team Name"
                              v-model="team.winner" :disabled="!team.played">
                </v-text-field>
              </v-col>

              <v-col cols="12">
                <v-checkbox dense v-model="team.nextMap" label="Next Map?" :disabled="team.played"></v-checkbox>
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
  name: "NextMap",

  components: {TabHeader, ImageBrowse},

  mixins: [staticTab],

  data: () => ({
    maps: ["Map One", "Map Two", "Map Three", "Map Four"],
    formData: [
      {map: "", played: false, winner: "", nextMap: false},
      {map: "", played: false, winner: "", nextMap: false},
      {map: "", played: false, winner: "", nextMap: false},
      {map: "", played: false, winner: "", nextMap: false}
    ]
  }),

  methods: {

    /**
     * Reset all data and emit a reset event.
     */
    reset() {

      // Reset page inputs
      this.formData = [
        {map: "", played: false, winner: "", nextMap: false},
        {map: "", played: false, winner: "", nextMap: false},
        {map: "", played: false, winner: "", nextMap: false},
        {map: "", played: false, winner: "", nextMap: false}
      ];

      // Emit a reset event
      this.sendToServer("reset");
    }
  }
}

</script>
