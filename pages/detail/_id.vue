<template>
  <div>
    <h1>详情</h1>
  </div>
</template>
<script>
export default {
  name: "detail",
  data() {
    return {};
  },
  mounted() {
    console.log(this.$route.params.id);
  },
  methods: {},
};
</script>
<style lang="less" scoped>
</style>
