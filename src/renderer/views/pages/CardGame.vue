<template>
  <v-container fluid>

    <!-- Page Header -->
    <TabHeader>
      <v-btn outlined small color="primary" @click="newGame">New Game</v-btn>
    </TabHeader>

    <!-- Game Control -->
    <v-row>
      <v-col>

        <v-card outlined>

          <!-- Card Title -->
          <v-toolbar flat dense color="darkBackground" class="text-button lightText--text">Game Control</v-toolbar>

          <v-card-text>

            <!-- Players Info -->
            <v-subheader class="text-button primary--text">Players Info</v-subheader>

            <v-row dense>

              <v-col cols="6">
                <v-text-field outlined dense prepend-inner-icon="mdi-pencil-outline" label="Player One Name"
                              v-model="formData.playerOneName">
                </v-text-field>
              </v-col>

              <v-col cols="6">
                <v-text-field outlined dense prepend-inner-icon="mdi-pencil-outline" label="Player Two Name"
                              v-model="formData.playerTwoName">
                </v-text-field>
              </v-col>

            </v-row>

            <!-- Round Setting -->
            <v-subheader class="text-button primary--text">Round Setting</v-subheader>

            <v-row dense>

              <v-col cols="6">
                <v-select dense outlined label="Starting Player"
                          v-model="formData.currentPlayer" :items="players" item-text="title" item-value="value">
                </v-select>
              </v-col>

              <v-col cols="6">
                <v-text-field outlined dense prepend-inner-icon="mdi-pencil-outline" label="Round Time" type="number"
                              v-model.number="formData.timer">
                </v-text-field>
              </v-col>

            </v-row>

            <!-- Winner Celebration -->
            <v-subheader class="text-button primary--text">Winner Celebration</v-subheader>

            <v-row dense class="text-center">

              <v-col cols="6">
                <v-btn outlined color="primary" @click="sendToServer('playerOneWon', formData.playerOneName)">
                  Player One Won
                </v-btn>
              </v-col>

              <v-col cols="6">
                <v-btn outlined color="primary" @click="sendToServer('playerTwoWon', formData.playerTwoName)">
                  Player Two Won
                </v-btn>
              </v-col>

            </v-row>

          </v-card-text>

        </v-card>

      </v-col>
    </v-row>

    <!-- Card Game -->
    <v-row>
      <v-col>

        <v-card outlined>

          <!-- Card Title -->
          <v-toolbar flat dense color="darkBackground" class="text-button lightText--text">
            Card Game
            <v-spacer></v-spacer>
            <v-btn outlined small color="primary" class="mr-5" @click="startRound">Start Round</v-btn>
            <v-btn outlined small color="primary" @click="resetRound">Reset Round</v-btn>
          </v-toolbar>

          <v-card-text>

            <!-- Round Stats -->
            <v-row dense class="text-button lightText--text" v-if="isGameRunning">

              <v-col class="text-center">
                Round: {{ this.formData.currentRound }}
              </v-col>

              <v-col class="text-center">
                {{ this.countDown <= 0 && this.countDown !== null ? "Time is up" : this.countDown !== null ? "Time: " + this.countDown : "Time:" }}
              </v-col>

              <v-col class="text-center">
                Turn: Player {{ this.formData.currentPlayer }}
              </v-col>

            </v-row>

            <!-- Round Stats -->
            <v-row dense justify="center">

              <v-col cols="4" md="3" v-for="(card, index) in cards">

                <v-card color="background" class="mx-auto" width="150" height="220"
                        @click="flipCard(card, index)" :disabled="disableBoard">

                  <v-card-text class="d-flex fill-height align-center justify-center lightText--text">

                    <v-card-title class="text-center">{{ index + 1 }}</v-card-title>

                    <v-menu-transition>
                      <v-overlay opacity="1" color="primary" :absolute="true" :value="card.flipped">
                        <v-card-title class="contrastText--text">{{ index + 1 }}</v-card-title>
                      </v-overlay>
                    </v-menu-transition>

                  </v-card-text>

                </v-card>

              </v-col>

            </v-row>

          </v-card-text>

        </v-card>

      </v-col>
    </v-row>

    <!-- Game Assets -->
    <v-row>
      <v-col>

        <v-card outlined>

          <!-- Card Title -->
          <v-toolbar flat dense color="darkBackground" class="text-button lightText--text">Game Assets</v-toolbar>

          <!-- Card Content -->
          <v-card-text>
            <v-row>

              <v-col cols="12" lg="6">
                <ImageBrowse title="Card Background" v-model="formData.backgroundImage"></ImageBrowse>
              </v-col>

              <v-col cols="12" lg="6">
                <ImageBrowse title="Card One" v-model="formData.cardImage1"></ImageBrowse>
              </v-col>

              <v-col cols="12" lg="6">
                <ImageBrowse title="Card Two" v-model="formData.cardImage2"></ImageBrowse>
              </v-col>

              <v-col cols="12" lg="6">
                <ImageBrowse title="Card Three" v-model="formData.cardImage3"></ImageBrowse>
              </v-col>

              <v-col cols="12" lg="6">
                <ImageBrowse title="Card Four" v-model="formData.cardImage4"></ImageBrowse>
              </v-col>

              <v-col cols="12" lg="6">
                <ImageBrowse title="Card Five" v-model="formData.cardImage5"></ImageBrowse>
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
  name: "CardGame",

  components: {TabHeader, ImageBrowse},

  mixins: [staticTab],

  data: () => ({
    players: [{title: "Player One", value: 1, round: 0}, {title: "Player Two", value: 2, round: 0}],

    cards: [
      {flipped: false, matched: false}, {flipped: false, matched: false}, {flipped: false, matched: false},
      {flipped: false, matched: false}, {flipped: false, matched: false}, {flipped: false, matched: false},
      {flipped: false, matched: false}, {flipped: false, matched: false}, {flipped: false, matched: false},
      {flipped: false, matched: false},
    ],
    lastCards: [],

    intervalId: null,
    countDown: null,
    isGameRunning: false,
    disabled: false,

    formData: {
      playerOneName: "",
      playerTwoName: "",
      currentPlayer: 1,
      currentRound: 0,
      timer: 60,
      backgroundImage: "",
      cardImage1: "",
      cardImage2: "",
      cardImage3: "",
      cardImage4: "",
      cardImage5: "",
    }
  }),

  computed: {

    disableBoard() {
      return !this.isGameRunning || this.countDown <= 0 || this.disabled;
    }
  },

  watch: {

    lastCards() {

      if (this.lastCards.length > 0 && this.lastCards.length % 2 === 0) {

        // Disable pressing temporary
        this.disabled = true;
        setTimeout(() => {

          this.disabled = false;
        }, 700);

        // Flip cards back after certain duration
        setTimeout(() => {

          let first = this.lastCards[this.lastCards.length - 1];
          let second = this.lastCards[this.lastCards.length - 2];

          if (!this.cards[first].matched) this.cards[first].flipped = false;
          if (!this.cards[second].matched) this.cards[second].flipped = false;
        }, 500);
      }
    }
  },

  methods: {

    newGame() {

      // Reset cards
      this.resetCards();

      // Rest players
      this.players.forEach((player) => player.round = 0);

      // Reset data
      this.resetData();

      // Clear timer
      clearInterval(this.intervalId);

      this.sendToServer("newGame", this.formData);
    },

    startRound() {

      // Reset cards
      this.resetCards();

      // Start count down
      this.startTimer();

      // Get current play and increase his rounds
      let playerIndex = this.formData.currentPlayer - 1;

      this.players[playerIndex].round++;
      this.formData.currentRound = this.players[playerIndex].round;

      // Start the game
      this.isGameRunning = true;

      this.sendToServer("startRound", this.formData);
    },

    resetRound() {

      // Reset cards
      this.resetCards();

      if (this.formData.currentRound > 0) {

        let playerIndex = this.formData.currentPlayer - 1;
        this.players[playerIndex].round--;
        this.formData.currentRound = this.players[playerIndex].round;
      }

      this.countDown = null;

      clearInterval(this.intervalId);

      this.sendToServer("resetRound", this.formData);
    },

    flipCard(lastCard, index) {

      // If card is already flipped return
      if (lastCard.flipped === true) return;

      this.lastCards.push(index);
      lastCard.flipped = true;

      this.sendToServer(`card${index + 1}`, this.formData);
    },

    startTimer() {

      // Reset timer if it exist
      if (this.intervalId) clearInterval(this.intervalId);

      this.countDown = this.formData.timer;

      this.intervalId = setInterval(() => {

        if (this.countDown > 0) {
          --this.countDown;
        } else {
          clearInterval(this.intervalId);
        }
      }, 1000);
    },

    resetCards() {

      this.cards.forEach(card => {
        card.flipped = false;
        card.matched = false;
      });

      this.lastCards = [];
    },

    resetData() {
      this.formData.currentPlayer = 1;
      this.formData.currentRound = 0;
      this.formData.timer = 60;
      this.countDown = null;
      this.isGameRunning = false;
    },
  },

  created() {

    this.$API.receive("cardGameMatched", (data) => {

      this.cards[data[0] - 1].matched = true;
      this.cards[data[1] - 1].matched = true;
    });
  }
}

</script>
