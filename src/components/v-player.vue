<template>
  <div class="player"></div>
</template>

<script>
export default {
  name: "VPlayer"
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/variable";
.player {
  position: fixed;
  height: 8%;
  bottom: 0;
  width: 100%;
  margin-left: 220px;
  background-color: $select-bg-color;
  z-index: 999;
}
</style>
