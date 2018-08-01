import Vue from 'vue'
import Router from 'vue-router'

import About from '@/components/About'
import Cities from '@/components/Cities'
import City from '@/components/City'
import CityAdd from '@/components/CityAdd'
import Home from '@/components/Home'

import { getApi } from '@/api'
import { API_KEY, CITIES, WEATHER_API } from '@/consts'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '',
          name: 'Home',
          component: Cities,
          beforeRouteEnter (to, from, next) {
            console.log(to, from)
          },
          beforeRouteLeave (to, from, next) {
            console.log(to, from)
          }
        },
        {
          path: 'city/add',
          name: 'CityAdd',
          component: CityAdd
        },
        {
          path: 'city/:cityName',
          name: 'City',
          component: City
        }
      ]
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '*',
      component: {
        template: '<div></div>',
        mounted () {
          this.$router.push({ name: 'Home' })
        }
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  let citiesLocal = JSON.parse(localStorage.getItem('cities'))
  let timeRange = 3600 * 1000
  let timeDiff = timeRange + 1

  if (citiesLocal) {
    if (citiesLocal.when) {
      timeDiff = Date.now() - citiesLocal.when
    }

    if (!citiesLocal['list'] || timeDiff >= timeRange) {
      getCities().then(() => {
        next()
      })
    }

    next()
  } else {
    getCities().then(() => {
      next()
    })
  }
})

function getCities () {
  return getApi(`${WEATHER_API.CITIES}?id=${CITIES}&units=metric&appid=${API_KEY}`)
    .then(data => {
      if (data['list']) {
        data.when = Date.now()
        localStorage.setItem('cities', JSON.stringify(data))
      } else {
        localStorage.setItem('cities', JSON.stringify({}))
      }
      return Promise.resolve()
    })
    .catch(e => {
      console.log(e)
      localStorage.setItem('cities', JSON.stringify({}))
      return Promise.resolve()
    })
}

export default router
