<template>
  <main id="weather" class="weather">
    <section class="main-section">
      <router-view/>
    </section>
    <Navigation />
  </main>
</template>

<script>
import Navigation from '@/components/Navigation'

export default {
  name: 'Weather',
  components: { Navigation }
}
</script>

<style lang="scss" src="@/styles/main.scss"></style>
