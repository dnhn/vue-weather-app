<template>
  <div class="cities">
    <router-link
      tag="button"
      :to="{ name: 'City', params: { cityName: city.name.toLowerCase() } }"
      class="city-summary"
      :style="{
        'background-image': `linear-gradient(45deg, black -50%, ${colourByTemp(city.main.temp).backgroundColor})`
      }"
      v-for="(city, index) in cities"
      :key="index"
      @mouseover.native="cityMouseover(city)"
      @mouseout.native="cityMouseout()"
      @focus.native="cityMouseover(city)"
      @blur.native="cityMouseout()"
      v-if="cities">
      <div class="city-summary-overlay"></div>
      <h1 class="city-summary-name">{{city.name}}</h1>
      <h2 class="city-summary-temp">{{city.main.temp | tempFormat}}</h2>
    </router-link>
    <!--<router-link-->
      <!--tag="button"-->
      <!--:to="{ name: 'CityAdd' }"-->
      <!--class="city-summary city-summary&#45;&#45;btn-add">+</router-link>-->
  </div>
</template>

<script>
import * as utils from '@/utils'
let mouseTimeout = false

export default {
  name: 'Cities',
  mounted () {
    let citiesLocal = JSON.parse(localStorage.getItem('cities'))
    if (citiesLocal && citiesLocal.list) {
      this.cities = citiesLocal.list
    }
  },
  data () {
    return {
      cities: []
    }
  },
  methods: {
    colourByTemp: utils.colourByTemp,
    cityMouseover (city) {
      clearTimeout(mouseTimeout)
      mouseTimeout = setTimeout(() => {
        this.$parent.setSelectedCity(city)
      }, 500)
    },
    cityMouseout () {
      clearTimeout(mouseTimeout)
    }
  }
}
</script>

<style lang="scss">
.cities {
  padding: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: flex-start;
}

$citySummary: '.city-summary';

#{$citySummary} {
  position: relative;
  margin-bottom: 30px;
  border: 0;
  border-radius: 4px;
  width: calc(50% - 15px);
  height: 12vw;
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 1.25vw 3vw;
  box-shadow: 0 2px 4px var(--color-alpha-1);
  color: var(--color-white);
  font-family: 'IBM Plex Sans', sans-serif;
  transition-property: transform, box-shadow, background-color, color;
  transition-duration: .25s, .25s, 1s, 1s;
  transition-timing-function: ease;
  transition-delay: 0s;

  &:hover,
  &:focus {
    z-index: 1;
    box-shadow: 0 10px 12px -2px var(--color-alpha-1);
    transform: translateY(-10px) scale(1.05);
  }

  &:nth-last-child(-n + 2) {
    margin-bottom: 0;
  }

  @media screen and (orientation: portrait) {
    height: 12vh;
    padding: 1.5em 2.5em;
  }

  &--btn-add {
    background-color: transparent;
    color: var(--color-black);
    box-shadow: none;
    border: 2px dashed var(--color-black);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2em;
    font-weight: bold;
    padding: 0;

    &:hover,
    &:focus {
      transform: scale(1.1);
      box-shadow: none;
    }
  }

  &--night {
    background-image: linear-gradient(90deg, var(--color-222) -50%, transparent);
    color: var(--color-white) !important;
  }

  &-overlay {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  &-name {
    order: 1;
    margin: 0;
    color: inherit;
    text-align: left;
    font-size: 1.5vw;
    font-weight: 200;
    -webkit-transform: translate3d(0, 0, 0);

    @media screen and (orientation: portrait) {
      font-size: 3vw;
    }
  }

  &-temp {
    margin: 0;
    color: inherit;
    text-align: center;
    font-size: 2.25vw;
    font-weight: 400;
    -webkit-transform: translate3d(0, 0, 0);

    @media screen and (orientation: portrait) {
      font-size: 4vw;
    }
  }

  &-enter-active {
    background-image: none;
    box-shadow: none !important;
    transition-property: background-color, color;
    transition-duration: 2s, 2s;
    transition-delay: .5s;

    #{$citySummary}-view {
      transition-delay: 1s;
    }
  }

  &-enter {
    background-color: transparent !important;
    color: transparent !important;

    #{$citySummary}-view {
      opacity: 0 !important;
    }
  }
}
</style>
