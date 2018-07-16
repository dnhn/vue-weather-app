<template>
  <transition-group
    appear
    tag="div"
    name="city"
    class="cities"
    v-if="cities">
    <City
      v-for="(city, index) in cities"
      :key="index"
      :city="city"
    />
  </transition-group>
</template>

<script>
import { getApi } from '../api'
import citiesFallback from '../cities'

import City from './City'

const API_KEY = '0aa2021d96650cdfe3518911b15684b6'
const CITIES = '3413829,2643743,2618425,745044,292223,2163355'

export default {
  name: 'Home',
  components: { City },
  data () {
    return {
      cities: []
    }
  },
  mounted () {
    let citiesLocal = JSON.parse(localStorage.getItem('cities'))
    let timeRange = 3600 * 1000
    let timeDiff = timeRange + 1

    if (citiesLocal) {
      if (citiesLocal.when) {
        timeDiff = Date.now() - citiesLocal.when
      }

      if (!citiesLocal['list'] || timeDiff >= timeRange) {
        this.getCities()
      } else {
        this.cities = citiesLocal.list
      }
    } else {
      this.getCities()
    }
  },
  methods: {
    getCities () {
      getApi(`https://api.openweathermap.org/data/2.5/group?id=${CITIES}&units=metric&appid=${API_KEY}`)
        .then(data => {
          if (data['list']) {
            data.when = Date.now()
            localStorage.setItem('cities', JSON.stringify(data))
            this.cities = data.list.map(item => {
              item.opened = false
              return item
            })
          } else {
            this.cities = citiesFallback
          }
        })
    }
  }
}
</script>

<style lang="scss" src="../styles/home.scss"></style>
