<template>
  <div
    class="w-1/2 md:w-1/3 lg:w-64 fixed md:top-0 md:left-0 h-screen lg:block bg-gray-100 border-r z-30"
    :class="sideBarOpen ? '' : 'hidden'"
    id="main-nav"
  >
    <div class="w-full h-20 border-b flex px-4 items-center mb-8">
      <img src="@/assets/gust.png" alt="GUST Logo" class="h-16 pl-4" />
    </div>

    <div class="mb-4 px-4">
      <p class="pl-4 text-sm font-semibold mb-1">Main</p>
      <RouterLink
        :to="{ name: 'StudentsScreen' }"
        class="w-full flex items-center text-black h-10 pl-4 bg-white rounded-lg cursor-pointer"
        active-class="router-link-active"
        @click="closeSidebar()"
      >
        <span
          :class="{
            'text-white': $route.name === 'StudentsScreen',
            'text-black': $route.name !== 'StudentsScreen',
          }"
          >Students</span
        >
      </RouterLink>
    </div>
    <div class="mb-4 px-4">
      <p class="pl-4 text-sm font-semibold mb-1">Dashboard</p>
      <RouterLink
        :to="{ name: 'PerformanceDashboard' }"
        class="w-full flex items-center text-black h-10 pl-4 bg-white rounded-lg cursor-pointer mb-2"
        active-class="router-link-active"
        @click="closeSidebar()"
      >
        <span
          :class="{
            'text-white': $route.name === 'PerformanceDashboard',
            'text-black': $route.name !== 'PerformanceDashboard',
          }"
          >Performance</span
        >
      </RouterLink>
      <RouterLink
        :to="{ name: 'DistributionDashboard' }"
        class="w-full flex items-center text-black h-10 pl-4 bg-white rounded-lg cursor-pointer"
        active-class="router-link-active"
        @click="closeSidebar()"
      >
        <span
          :class="{
            'text-white': $route.name === 'DistributionDashboard',
            'text-black': $route.name !== 'DistributionDashboard',
          }"
          >Distribution</span
        >
      </RouterLink>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { RouterLink } from "vue-router";

export default {
  name: "MainSidebar",
  components: {
    RouterLink,
  },
  computed: {
    ...mapState(["sideBarOpen"]),
  },
  methods: {
    closeSidebar() {
      // Close the sidebar when a link is clicked (for small screens)
      this.$store.commit("toggleSidebarState");
    },
  },
};
</script>
