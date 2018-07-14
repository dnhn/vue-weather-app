<template>
  <transition-group
    appear
    tag="div"
    name="city"
    class="cities">
    <div
      class="city"
      v-for="(city, index) in cities"
      :key="index">
      {{city}}
    </div>
  </transition-group>
</template>

<script>
import { getApi } from '../api'
import citiesData from '../cities'

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
  }
}
</script>

<style lang="scss" src="../styles/home.scss"></style>
