<template>
  <div>

<!--    <label>{{ label }}</label>-->

    <v-text-field v-bind="{ ...$attrs, ...$props, ...commonAttrs }" v-on="$listeners" @input="inputHandler">

      <template v-for="(_, scopedSlotName) in $scopedSlots" #[scopedSlotName]="slotData">
        <slot :name="scopedSlotName" v-bind="slotData"/>
      </template>

      <template v-for="(_, slotName) in $slots" #[slotName]>
        <slot :name="slotName"/>
      </template>

    </v-text-field>

  </div>
</template>

<script>

export default {

  inheritAttrs: false,

  props: {
    appendOuterIcon: String,
    autofocus: Boolean,
    clearable: Boolean,
    clearIcon: {
      type: String,
      default: "$clear"
    },
    counter: [Boolean, Number, String],
    counterValue: Function,
    filled: Boolean,
    flat: Boolean,
    fullWidth: Boolean,
    label: String,
    outlined: Boolean,
    placeholder: String,
    prefix: String,
    prependInnerIcon: String,
    persistentPlaceholder: Boolean,
    reverse: Boolean,
    rounded: Boolean,
    shaped: Boolean,
    singleLine: Boolean,
    solo: Boolean,
    soloInverted: Boolean,
    suffix: String,
    type: {
      type: String,
      default: "text"
    }
  },

  computed: {

    commonAttrs() {
      return {
        outlined: true,
        dense: true,
        prependInnerIcon: "mdi-pencil-outline",
        persistentHint: true,
      }
    }
  },

  methods: {

    inputHandler(data) {

      if (isNaN(data)) {
        console.log("DON'T")
      }
    }
  }
}

</script>

<style scoped>

</style>
