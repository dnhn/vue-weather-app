<template>
  <div
    class="city"
    :style="{
      'background-image': `linear-gradient(45deg, black -50%, ${colourByTemp(city.main.temp).backgroundColor})`
    }">
    <h1 class="city-name">{{city.name}}</h1>
    <h2 class="city-temp">{{city.main.temp | tempFormat}}</h2>
    <div class="city-temps">
      <div>Min. {{city.main.temp_min | tempFormat}}</div>
      <div>Max. {{city.main.temp_max | tempFormat}}</div>
    </div>
    <div class="city-conditions">
      <div v-if="city.weather.length">Weather conditions:
        <span
          v-for="(condition, index) in city.weather"
          :key="index">
          {{condition.description}}<span v-if="index < city.weather.length - 1">,</span>
        </span>
      </div>
      <div v-if="city.main.humidity">Humidity: {{city.main.humidity}}%</div>
      <div v-if="city.visibility">Visibility: {{Math.round(city.visibility / 1000)}} km</div>
      <div v-if="city.wind.speed">Wind speed: {{city.wind.speed}} kph</div>
    </div>
    <button
      class="button city-btn-back"
      @click="goBack()">back to cities</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import * as utils from '@/utils'

export default {
  name: 'City',
  data () {
    return {
      city: {
        clouds: {},
        coord: {},
        dt: 0,
        id: 0,
        main: {},
        name: '',
        sys: {},
        visibility: 0,
        weather: [],
        wind: {}
      }
    }
  },
  beforeDestroy () {
    this.clearSelectedCity()
  },
  mounted () {
    let citiesLocal = JSON.parse(localStorage.getItem('cities'))
    let cityName = this.$route.params.cityName
    let selectedCity = {}

    if (citiesLocal && citiesLocal.list && cityName) {
      selectedCity = citiesLocal.list.filter(item => {
        return cityName === item.name.toLowerCase()
      })

      if (selectedCity.length) {
        this.city = selectedCity[0]
        this.setSelectedCity(selectedCity[0])
      } else {
        this.$router.push({ name: 'Home' })
      }
    }
  },
  methods: {
    colourByTemp: utils.colourByTemp,
    isCloudy: utils.isCloudy,
    goBack () {
      this.clearSelectedCity()
      this.$router.push({ name: 'Home' })
    },
    ...mapActions({
      'setSelectedCity': 'city/setSelected',
      'clearSelectedCity': 'city/clearSelected'
    })
  }
}
</script>

<style lang="scss">
$cityClass: '.city';

#{$cityClass} {
  margin: 30px;
  height: calc(100% - 60px);
  border-radius: 8px;
  overflow: hidden;
  display: grid;
  grid-template-columns: 30px repeat(4, 1fr) 30px;
  grid-template-rows: 30px repeat(4, 1fr) 8vh;
  color: var(--color-white);

  @media screen and (orientation: portrait) {
    height: auto;
  }

  &-name {
    grid-column: 2 / span 2;
    grid-row: 2 / span 1;
    margin: 0;
    display: flex;
    align-items: flex-end;
    padding: 10px 0;
    font-size: 3vw;
    font-weight: 400;

    @media screen and (orientation: portrait) {
      font-size: 6vw;
      grid-column: 2 / span 2;
      grid-row: 2 / span 1;
      align-items: center;
    }
  }

  &-temp {
    grid-column: 2 / span 2;
    grid-row: 3 / span 1;
    margin: 0;
    padding: 10px 0;
    color: inherit;
    font-size: 5vw;
    font-weight: 400;

    @media screen and (orientation: portrait) {
      font-size: 8vw;
      grid-column: 4 / span 2;
      grid-row: 2 / span 1;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }

  &-temps {
    grid-column: 4 / span 2;
    grid-row: 2 / 4;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 2vw;
    line-height: 1.5;

    @media screen and (orientation: portrait) {
      grid-column: 2 / span 4;
      grid-row: 3 / 4;
      flex-direction: row;
      font-size: 6vw;
      justify-content: space-between;
    }
  }

  &-conditions {
    grid-column: 2 / span 4;
    grid-row: 4 / 6;
    padding: 30px 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    font-size: 2vw;
    line-height: 1.5;

    @media screen and (orientation: portrait) {
      font-size: 4vw;
    }
  }

  &-btn-back {
    grid-column: span 6;
    grid-row: 6 / 7;
    border: 0;
    border-radius: 0;
    box-shadow: none;
    background-color: var(--color-alpha-1);
    color: var(--color-white);
    transition: background-color .25s ease;

    &:hover,
    &:focus {
      background-color: var(--color-black);
    }
  }
}
</style>
