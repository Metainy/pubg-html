<template>
  <v-main>

    <keep-alive>
      <RouterView></RouterView>
    </keep-alive>

  </v-main>
</template>

<script>

export default {
  name: "MainLayout"
}

</script>
