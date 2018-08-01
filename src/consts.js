export const API_KEY = '0aa2021d96650cdfe3518911b15684b6'
export const CITIES = '3413829,2643743,2618425,745044,292223,2163355'
const url = 'https://api.openweathermap.org/data/2.5/'

export const WEATHER_API = {
  CITIES: `${url}group`, // ?id=123,456,789
  SEARCH: `${url}find` // ?q=new+york
}
