<template>
  <v-navigation-drawer app fixed permanent absolute color="darkBackground" width="240" mini-variant-width="64"
                       v-model="drawer" :mini-variant="isMiniDrawer"
  >

    <!-- Top Section -->
    <template v-slot:prepend>

      <v-list-item class="px-2 my-8 text-center justify-center">
        <v-list-item-avatar tile size="45" class="ma-auto">
          <v-img src="@assets/icons/logo-g.png"></v-img>
        </v-list-item-avatar>
      </v-list-item>

    </template>

    <!-- Middle Section -->
    <v-list dense nav>
      <template v-for="(item, index) in navItems">

        <!-- Nav Group -->
        <v-tooltip right :disabled="!isMiniDrawer" v-if="item.subItems">
          <template v-slot:activator="{on, attrs}">

            <v-list-group color="" :key="item.title" :group="item.group" link v-bind="attrs" v-on="on">

              <template slot="prependIcon">
                <v-icon dense v-text="item.icon"></v-icon>
              </template>

              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title v-text="item.title"></v-list-item-title>
                </v-list-item-content>
              </template>

              <!-- Nav Sub Item -->
              <template v-for="subItem in item.subItems">

                <v-tooltip right :disabled="!isMiniDrawer" v-if="item.subItems">

                  <template v-slot:activator="{on, attrs}">

                    <v-list-item :class="isMiniDrawer ? 'pl-auto' : 'pl-8'" link
                                 :key="subItem.title" :to="subItem.to"
                                 active-class="customNav"
                                 v-bind="attrs" v-on="on">

                      <v-list-item-icon>
                        <v-icon dense v-text="subItem.icon"></v-icon>
                      </v-list-item-icon>

                      <v-list-item-content>
                        <v-list-item-title class="font-weight-regular" v-text="subItem.title">
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>

                  </template>

                  <span>{{ subItem.title }}</span>

                </v-tooltip>
              </template>

            </v-list-group>

          </template>

          <span>{{ item.title }}</span>

        </v-tooltip>

        <!-- Nav Item -->
        <v-tooltip right :disabled="!isMiniDrawer" v-else-if="item.title && item.enabled">
          <template v-slot:activator="{on, attrs}">

            <v-list-item :key="index" :to="item.path" v-bind="attrs" v-on="on" :ripple="false" link
                         active-class="customNav"
            >

              <!-- Item Icon -->
              <v-list-item-icon>
                <v-icon dense color="lightText" v-text="item.icon"></v-icon>
                <!-- <v-icon :icon="item.icon">$icons.icon</v-icon>-->
              </v-list-item-icon>

              <!-- Item Text -->
              <v-list-item-content class="lightText--text">
                <v-list-item-title class="font-weight-regular" v-text="item.title"></v-list-item-title>
              </v-list-item-content>

            </v-list-item>

          </template>

          <span>{{ item.title }}</span>

        </v-tooltip>

        <!-- Nav Divider -->
        <v-divider class="my-3" v-else-if="item.divider"></v-divider>

      </template>
    </v-list>

    <!-- Bottom Section -->
    <template v-slot:append>

      <!-- Application Version -->
      <div class="caption lightText--text text-center my-5">
        <span v-if="!isMiniDrawer">Version</span>
        {{ appVersion }}
      </div>

      <v-divider></v-divider>

      <!-- Bottom Icons -->
      <v-row no-gutters>

        <!-- Setting Button -->
        <v-col>
          <v-tooltip top>

            <template v-slot:activator="{on, attrs}">

              <router-link to="/setting" custom v-slot="{href, route, navigate}">
                <v-btn tile :large="!isMiniDrawer" color="transparent" elevation="0" width="100%"
                       v-on="on" v-bind="attrs"
                       :href="href" @click="navigate">

                  <v-icon dense color="lightText">mdi-tune</v-icon>
                </v-btn>
              </router-link>

            </template>

            <span>Setting</span>

          </v-tooltip>
        </v-col>

        <!-- Divider -->
        <v-col cols="auto" v-if="!isMiniDrawer">
          <v-divider vertical></v-divider>
        </v-col>

        <!-- About Button -->
        <v-col>
          <v-tooltip top>

            <template v-slot:activator="{on, attrs}">

              <router-link to="/about" custom v-slot="{href, route, navigate}">
                <v-btn tile :large="!isMiniDrawer" color="transparent" elevation="0" width="100%"
                       v-on="on" v-bind="attrs"
                       :href="href" @click="navigate">

                  <v-icon dense color="lightText">mdi-information-outline</v-icon>
                </v-btn>
              </router-link>

            </template>

            <span>About</span>

          </v-tooltip>
        </v-col>

      </v-row>

    </template>

  </v-navigation-drawer>
</template>

<script>

// Store
import {mapGetters} from "vuex";

// Routes
import navItems from "@/api/navItems";

export default {
  name: "SideNavigation",

  data: () => ({
    drawer: true,
    navItems: null,
  }),

  computed: {
    ...mapGetters("app", ["appVersion", "isMiniDrawer"]),
  },

  methods: {},

  created() {

    // Load navigation items
    this.navItems = navItems;
  }
}

</script>
