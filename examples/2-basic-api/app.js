const result = document.querySelector('.result')

const fetchData = async (event, context) => {
  try {
    const { data } = await axios.get('/api/2-basic-api')
    // console.log(data.map((item) => item.name))
    const products = data
      .map((product) => {
        const {
          image: { url },
          name,
          price
        } = product
        return /*html*/ `
        <article class="product">
          <img
            src="${url}"
            alt="${name}"
          />
          <div class="info">
            <h5>${name}</h5>
            <h5 class="price">$${price}</h5>
          </div>
      </article>
      `
      })
      .join('')
    result.innerHTML = products
  } catch (error) {
    console.log(error.response)
  }
}

fetchData()
