<template>
  <div>
    <h2 class="title">SCSS手写栅格系统</h2>

    <p><a href="https://github.com/dengjianjun/gridsystem/blob/master/demo.html">GitHub</a></p>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">1</div>
        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">2</div>
        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">3</div>
        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">4</div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "GridSystem"
  }
</script>

<style lang="scss" scoped>
  @import "../assets/scss/common.scss";

  .title {
    font-size: 26px;
  }

  .container {
    overflow: auto;
    padding: 10px;
    border: 1px solid #dcdcdc;
  }

  .row > div {
    height: 100px;
    border: 1px solid #f00;
  }

</style>
