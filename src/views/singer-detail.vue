<template>
  <div class="singer-detail">
    <div class="singer-info"></div>
  </div>
</template>

<script>
import { getSingerDetailApi } from "@/api/singer";
export default {
  name: "SingerDetail",
  data() {
    return {
      singerMid: ""
    };
  },
  created() {
    if (this.$route.params.singerMid.trim() === "") {
      return;
    }
    console.log(this.$route.params.singerMid)
    this.singerMid = this.$route.params.singerMid;
    this.getSingerInfo(this.singerMid);

  },
  methods: {
    getSingerInfo(id) {
      this.$axios.get(getSingerDetailApi + id).then(response => {
        console.log(response);
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
