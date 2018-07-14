<template>
  <transition-group
    appear
    tag="div"
    name="city"
    class="cities">
    <div
      class="city"
      v-for="(city, index) in cities"
      @click="toggleCity(city)"
      :key="index"
      :style="colourByTemp(city.main.temp)">
      <h2 class="city-temp">{{city.main.temp | tempFormat}}</h2>
      <h1 class="city-name">{{city.name}}<br>{{city.id | countryName}}</h1>
      <ul
        class="city-details"
        v-if="city.opened">
        <li>sunrise: {{new Date(city.sys.sunrise * 1000)}}</li>
        <li>sunset: {{new Date(city.sys.sunset * 1000)}}</li>
        <li>
          <span
            v-for="(condition, index) in city.weather"
            :key="index">
            {{condition.description}}
          </span>
        </li>
        <li>current: {{city.main.temp | tempFormat}}</li>
        <li>min: {{city.main.temp_min | tempFormat}}</li>
        <li>max: {{city.main.temp_max | tempFormat}}</li>
        <li>humidity: {{city.main.humidity}}%</li>
        <li>visibility: {{Math.round(city.visibility / 1000)}} km</li>
        <li>wind speed: {{city.wind.speed}} kph</li>
      </ul>
    </div>
  </transition-group>
</template>

<script>
import { getApi } from '../api'
import citiesData from '../cities'
import zones from '../zones'

const API_KEY = '0aa2021d96650cdfe3518911b15684b6'
const CITIES = '3413829,2643743,2618425,745044,292223,2163355'

export default {
  name: 'Home',
  data () {
    return {
      cities: []
    }
  },
  mounted () {
    getApi(`https://api.openweathermap.org/data/2.5/group?id=${CITIES}&units=metric&appid=${API_KEY}`)
      .then(data => {
        this.cities = data.list.map(item => {
          item.opened = false
          return item
        })
      })
      .catch(e => {
        this.cities = citiesData.map(item => {
          item.opened = false
          return item
        })
      })
  },
  methods: {
    toggleCity (city) {
      const isOpened = city ? city.opened : false

      this.cities.map(item => {
        item.opened = false
      })

      if (city) {
        city.opened = !isOpened
      }
    },
    colourByTemp (temp) {
      // blue: hsl(240, 100%, 50%)
      // yellow: hsl(60, 100%, 50%)

      let hue = 0
      const minHue = 240
      const maxHue = 60
      const hueRange = minHue - maxHue
      const saturation = 100
      const lightness = 50

      const minTemp = 0
      const maxTemp = 40
      const tempRange = maxTemp - minTemp

      if (temp <= minTemp) {
        hue = minHue
      } else if (temp >= maxTemp) {
        hue = maxHue
      } else {
        hue = minHue - ((temp) * hueRange / tempRange)
      }

      let color = hue >= 200 ? 'white' : 'black'

      let styleValue = {
        backgroundColor: `hsl(${Math.round(hue)}, ${saturation}%, ${lightness}%)`,
        color: color
      }

      return styleValue
    }
  },
  filters: {
    tempFormat (temp) {
      return `${Math.round(temp)} ºC`
    },
    countryName (id) {
      return zones[id]['country']
    },
    timezone (id) {
      return zones[id]['timezone']
    }
  }
}
</script>

<style lang="scss" src="../styles/home.scss"></style>
