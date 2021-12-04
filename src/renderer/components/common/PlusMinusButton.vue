<template>

  <v-row no-gutters>

    <!-- Label -->
    <v-col cols="12"  class="secondaryText--text text-button">{{ label }}</v-col>

    <!-- Plus Button -->
    <v-col cols="auto">
      <v-btn tile small outlined color="primary" style="border-right: none;" :disabled="value >= max" @click="increase">
        <v-icon small>mdi-plus</v-icon>
      </v-btn>
    </v-col>

    <!-- Value -->
    <v-col cols="auto" class="d-flex align-center justify-center btnValue">
      <input type="number" class="lightText--text text-center" style="width: 80px;" :value="this.number" @input="inputHandler">
<!--      <div class="secondaryText&#45;&#45;text body-1">{{ value }}</div>-->
    </v-col>

    <!-- Minus Button -->
    <v-col cols="auto">
      <v-btn tile small outlined color="primary" style="border-left: none;" :disabled="value <= min" @click="decrease">
        <v-icon small>mdi-minus</v-icon>
      </v-btn>
    </v-col>

  </v-row>

</template>

<script>
export default {
  name: "PlusMinusButton",

  props: {
    value: {default: 0, type: Number},
    min: {default: 0, type: Number},
    max: {default: undefined, type: Number},
    label: {default: null, type: String},
  },

  data: () => ({
    number: null
  }),

  methods: {

    increase() {

      // Return if the new value is higher than the max
      if ((this.number + 1) > this.max) return;

      ++this.number;

      this.$emit("input", this.number);
      this.$emit("increase", this.number);
    },

    decrease() {

      // Return if the new value is lower than the min
      if ((this.number - 1) < this.min) return;

      --this.number;

      this.$emit("input", this.number);
      this.$emit("decrease", this.number);
    },

    inputHandler(event, d) {

      // Get the value
      this.number = parseInt(event.target.value);

      // Check for valid number
      if (this.number > this.max) this.number = this.max;
      if (this.number < this.min) this.number = this.min;

      this.$emit("input", this.number);
    }
  },

  created() {
    this.number = this.value;
  }
}

</script>

<style scoped lang="scss">

.btnValue {

  border: solid 1px var(--v-primary-base);
  min-width: 50px;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input:focus-visible {

  outline: none;
}

</style>
