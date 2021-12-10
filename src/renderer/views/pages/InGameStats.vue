<template>
  <v-container fluid>

    <!-- Page Header -->
    <TabHeader>
      <v-btn outlined small color="primary" class="mr-5" @click="sendToServer('intro', formData)">Start Animation
      </v-btn>
      <v-btn outlined small color="primary" class="mr-5" @click="sendToServer('outro', formData)">End Animation
      </v-btn>
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
            <v-row>

              <v-col>
                <v-text-field outlined dense prepend-inner-icon="mdi-pencil-outline" label="Team Name"
                              v-model="team.teamName" hide-details>
                </v-text-field>
              </v-col>

              <v-col>
                <PlusMinusButton label="Total Kills" v-model="team.totalKills"> </PlusMinusButton>
              </v-col>

              <v-col cols="12">

                <v-input dense label="Alive" hide-details>

                  <v-switch :ripple="false" class="ml-5" v-model="team.alive[0]"></v-switch>
                  <v-switch :ripple="false" class="ml-5" v-model="team.alive[1]"></v-switch>
                  <v-switch :ripple="false" class="ml-5" v-model="team.alive[2]"></v-switch>
                  <v-switch :ripple="false" class="ml-5" v-model="team.alive[3]"></v-switch>

                </v-input>

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
import PlusMinusButton from "@components/common/PlusMinusButton";

// Mixins
import {staticTab} from "@/mixins/staticTab";

export default {
  name: "InGameStats",

  components: {TabHeader, PlusMinusButton},

  mixins: [staticTab],

  data: () => ({
    num: 0,
    formData: [
      {teamName: "", totalKills: 0, alive: [true, true, true, true]},
      {teamName: "", totalKills: 0, alive: [true, true, true, true]},
      {teamName: "", totalKills: 0, alive: [true, true, true, true]},
      {teamName: "", totalKills: 0, alive: [true, true, true, true]},
      {teamName: "", totalKills: 0, alive: [true, true, true, true]},
      {teamName: "", totalKills: 0, alive: [true, true, true, true]},
      {teamName: "", totalKills: 0, alive: [true, true, true, true]},
      {teamName: "", totalKills: 0, alive: [true, true, true, true]},
      {teamName: "", totalKills: 0, alive: [true, true, true, true]},
      {teamName: "", totalKills: 0, alive: [true, true, true, true]},
      {teamName: "", totalKills: 0, alive: [true, true, true, true]},
      {teamName: "", totalKills: 0, alive: [true, true, true, true]},
      {teamName: "", totalKills: 0, alive: [true, true, true, true]},
      {teamName: "", totalKills: 0, alive: [true, true, true, true]},
      {teamName: "", totalKills: 0, alive: [true, true, true, true]},
      {teamName: "", totalKills: 0, alive: [true, true, true, true]}
    ]
  }),

  methods: {

    /**
     * Reset all data and emit a reset event.
     */
    reset() {

      // Reset page inputs
      this.formData = [
        {teamName: "", totalKills: 0, alive: [true, true, true, true]},
        {teamName: "", totalKills: 0, alive: [true, true, true, true]},
        {teamName: "", totalKills: 0, alive: [true, true, true, true]},
        {teamName: "", totalKills: 0, alive: [true, true, true, true]},
        {teamName: "", totalKills: 0, alive: [true, true, true, true]},
        {teamName: "", totalKills: 0, alive: [true, true, true, true]},
        {teamName: "", totalKills: 0, alive: [true, true, true, true]},
        {teamName: "", totalKills: 0, alive: [true, true, true, true]},
        {teamName: "", totalKills: 0, alive: [true, true, true, true]},
        {teamName: "", totalKills: 0, alive: [true, true, true, true]},
        {teamName: "", totalKills: 0, alive: [true, true, true, true]},
        {teamName: "", totalKills: 0, alive: [true, true, true, true]},
        {teamName: "", totalKills: 0, alive: [true, true, true, true]},
        {teamName: "", totalKills: 0, alive: [true, true, true, true]},
        {teamName: "", totalKills: 0, alive: [true, true, true, true]},
        {teamName: "", totalKills: 0, alive: [true, true, true, true]}
      ];

      // Emit a reset event
      this.sendToServer("reset");
    }
  }
}

</script>
