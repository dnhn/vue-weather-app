export function colourByTemp (temp) {
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

  let color = hue >= 190 ? 'white' : 'black'

  return {
    backgroundColor: `hsl(${Math.round(hue)}, ${saturation}%, ${lightness}%)`,
    color: color
  }
}

export function isCloudy (weather) {
  let clouds = []

  for (let i = 0; i < weather.length; ++i) {
    if (weather[i]['main'].toLowerCase() === 'clouds') {
      clouds.push(true)
    }
  }

  return !!clouds.length
}
