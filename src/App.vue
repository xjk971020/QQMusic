<template>
  <div class="music-wrapper">
    <div class="music-content">
      <v-menu></v-menu>
      <v-section></v-section>
    </div>
  </div>
</template>

<script>
import VMenu from "@/components/v-menu";
import VSection from "@/components/v-section";
export default {
  name: "app",
  components: {
    VMenu,
    VSection
  }
};
</script>

<style lang="scss" scoped>
.music-wrapper {
  height: 100%;
  width: 100%;
  position: relative;
}
.music-content {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
}
</style>
