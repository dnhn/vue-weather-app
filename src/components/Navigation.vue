<template>
  <nav class="navigation">
    <ul class="nav-list">
      <router-link
        class="nav-item"
        v-for="(nav, index) in navList"
        tag="li"
        exact-active-class="nav-item--active"
        :to="{name: nav}"
        :key="index">
        <a class="nav-link">
          {{nav}}
        </a>
      </router-link>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Navigation',
  data () {
    return {
      navList: [
        'Home',
        'About'
      ]
    }
  }
}
</script>

<style scoped lang="scss">
.navigation {
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

.nav {
  &-list {
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-x: scroll;
    background-color: var(--color-222);
  }

  &-item {
    padding: 1em;
    font-size: 2vh;

    &--active {
      font-weight: bold;
    }
  }

  &-link {
    text-decoration: none;
    color: var(--color-white);
  }
}

</style>
