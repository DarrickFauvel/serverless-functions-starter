// it takes few minutes

const form = document.querySelector('.form')
const input = document.querySelector('.form-input')
const alert = document.querySelector('.alert')
const result = document.querySelector('.result')
alert.style.display = 'none'

const getWeatherData = async (city) => {
  alert.style.display = 'none'
  try {
    const { data } = await axios.post('/api/5-weather', { city })
    const { name } = data
    const { country } = data.sys
    const { temp_max: max, temp_min: min, feels_like } = data.main
    const { description } = data.weather[0]
    result.innerHTML = /*html*/ `
      <article className="card">
        <h3>${name}, ${country}</h3>
        <p>${description}</p>
        <p>min temp: ${min}&#8457</p>
        <p>max temp: ${max}&#8457</p>
        <p>feels like: ${feels_like}&#8457</p>
      </article>
    `
  } catch (error) {
    // console.log(error.response)
    alert.style.display = 'block'
    alert.textContent = `Can't find weather data for city: "${city}"`
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const city = input.value
  if (city) {
    getWeatherData(city)
  }
})
