<template>
  <div class="home">
    <div class="home__logo"></div>
    <div class="home__name">lattice-lottery-new</div>
    <div class="home__desc">兼容Vue、react等前端框架的活动抽奖组件</div>
    <a href="/lattice-lottery-new/guide/" class="home__go">快速了解</a>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.home {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.home__logo {
  width: 330px;
  height: 330px;
  background-image: url("/lattice-lottery-new/logo.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  margin-bottom: 44px;
}
.home__name {
  color: #2c3e50;
  font-size: 48px;
  margin-bottom: 32px;
}
.home__desc {
  color: #6a8bad;
  font-size: 28px;
  margin-bottom: 44px;
}
.home__go {
  font-size: 24px;
  color: #fff;
  background-color: #3eaf7c;
  padding: 12px 24px;
  border-radius: 4px;
  transition: background-color 0.1s ease;
  box-sizing: border-box;
  border-bottom: 1px solid #389d70;
  margin-bottom: 24px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
}
.home__go:active {
  color: #fff;
}
.home__go:hover {
  cursor: pointer;
  color: #fff;
}
.home__go::after {
  content: "";
  // position: absolute;
  display: inline-block;
  width: 10px;
  height: 10px;
  border-top: 2px solid white;
  border-right: 2px solid white;
  transform: rotate(45deg);
}
</style>
