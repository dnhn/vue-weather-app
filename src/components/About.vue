<template>
  <div class="about-page">
    <h1>Made with ❤️&nbsp;&nbsp;by <a href="https://github.com/nhantdn">Nhan</a></h1>
    <h2>Technologies used</h2>
    <ul>
      <li><a href="https://vuejs.org">Vue</a></li>
      <li><a href="https://router.vuejs.org">Vue Router</a></li>
      <li><a href="https://vuex.vuejs.org">Vuex</a></li>
      <li><a href="https://greensock.com">GSAP</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'About'
}
</script>

<style lang="scss">
.about-page {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

ul {
  font-size: 2em;
}

a {
  text-decoration: none;
}
</style>
