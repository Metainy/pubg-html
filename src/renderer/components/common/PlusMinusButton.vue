<template>

  <v-row no-gutters>

    <!-- Label -->
    <v-col cols="12" class="secondaryText--text text-button">{{ label }}</v-col>

    <!-- Plus Button -->
    <v-col cols="auto">
      <v-btn tile small outlined color="primary" style="border-right: none;" :disabled="value >= max" @click="increase">
        <v-icon small>mdi-plus</v-icon>
      </v-btn>
    </v-col>

    <!-- Value -->
    <v-col cols="auto" class="d-flex align-center justify-center btnValue">
      <input type="text" class="lightText--text text-center" width="10" v-model="value">
<!--      <v-text-field dense outlined :value="value"></v-text-field>-->
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

  methods: {

    increase() {

      // Return if the new value is higher than the max
      if ((this.value + 1) > this.max) return;

      ++this.value;

      this.$emit("input", this.value);
      this.$emit("increase", this.value);
    },

    decrease() {

      // Return if the new value is lower than the min
      if ((this.value - 1) < this.min) return;

      --this.value;

      this.$emit("input", this.value);
      this.$emit("decrease", this.value);
    }
  }
}

</script>

<style scoped lang="scss">

.btnValue {

  border: solid 1px var(--v-primary-base);
  min-width: 50px;
}

</style>
