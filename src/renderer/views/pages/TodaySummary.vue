<template>
  <v-container fluid>

    <!-- Page Header -->
    <TabHeader>
      <v-btn outlined small color="primary" class="mr-5" @click="sendAllToServer">Start Animation</v-btn>
      <v-btn outlined small color="primary" @click="reset">Reset</v-btn>
    </TabHeader>


    <!-- TEST -->
<!--    <v-row>-->


<!--      <v-col>-->


<!--        <TextField-->
<!--            label="dsa" hint="HELLOD" type="number"-->
<!--        >-->



<!--        </TextField>-->

<!--        <v-text-field outlined dense prepend-inner-icon="mdi-pencil-outline" label="Team Name">-->
<!--        </v-text-field>-->

<!--        <v-text-field outlined dense prepend-inner-icon="mdi-pencil-outline" label="Team Name"-->
<!--                      >-->
<!--        </v-text-field>-->

<!--      </v-col>-->
<!--    </v-row>-->






    <!-- Page Content -->
    <v-row>
      <v-col cols="12" lg="6" v-for="(team, index) in formData" :key="index">

        <v-card outlined>

          <!-- Card Title -->
          <v-toolbar flat dense color="darkBackground" class="text-button lightText--text">
            {{ stringifyNumber(index) }} Team
          </v-toolbar>

          <v-card-text>
            <v-row dense>

              <v-col cols="12">
                <v-text-field outlined dense prepend-inner-icon="mdi-pencil-outline" label="Team Name"
                              v-model="team.teamName">
                </v-text-field>
              </v-col>

              <v-col cols="12" class="mb-6">
                <ImageBrowse title="Map Image" v-model="team.mapImage"></ImageBrowse>
              </v-col>

              <v-col cols="6">
                <v-text-field outlined dense prepend-inner-icon="mdi-pencil-outline" label="Map Number"
                              v-model="team.mapNumber">
                </v-text-field>
              </v-col>

              <v-col cols="6">
                <v-text-field outlined dense prepend-inner-icon="mdi-pencil-outline" label="Map Name"
                              v-model="team.mapName">
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

// import TextField from "@components/common/TextField";


// Mixins
import {staticTab} from "@/mixins/staticTab";

export default {
  name: "TodaySummary",

  components: {TabHeader, ImageBrowse},

  mixins: [staticTab],

  data: () => ({
    formData: [
      {teamName: "", mapImage: "", mapNumber: "", mapName: ""},
      {teamName: "", mapImage: "", mapNumber: "", mapName: ""},
      {teamName: "", mapImage: "", mapNumber: "", mapName: ""},
      {teamName: "", mapImage: "", mapNumber: "", mapName: ""}
    ]
  }),

  methods: {

    /**
     * Reset all data and emit a reset event.
     */
    reset() {

      // Reset page inputs
      this.formData = [
        {teamName: "", mapImage: "", mapNumber: "", mapName: ""},
        {teamName: "", mapImage: "", mapNumber: "", mapName: ""},
        {teamName: "", mapImage: "", mapNumber: "", mapName: ""},
        {teamName: "", mapImage: "", mapNumber: "", mapName: ""}
      ];

      // Emit a reset event
      this.sendToServer("reset");
    }
  }
}

</script>
