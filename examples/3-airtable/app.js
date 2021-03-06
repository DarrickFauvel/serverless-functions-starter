const result = document.querySelector('.result')

const fetchProducts = async () => {
  const { data } = await axios.get('/api/3-z-complete')
  const products = data
    .map((product) => {
      const { id, url, name, price } = product
      return /*html*/ `
      <a href="product.html?id=${id}" class='product'>
        <img src="${url}" alt="${name}" />
        <div class="info">
          <h5>${name}</h5>
          <h5 class="price">$${price}</h5>
        </div>
      </a>
    `
    })
    .join('')
  result.innerHTML = products
}

fetchProducts()
