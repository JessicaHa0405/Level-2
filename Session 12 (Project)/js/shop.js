let apitoken = localStorage.getItem('token')


// ---- Lấy API

$(document).ready(function () {

  $.ajax({
    type: 'GET',
    url: `https://students.trungthanhweb.com/api/getBrands`,
    success: function (response) {
      let brandElement = '';

      for (let i = 0; i < response.length; i++) {
        brandElement += `
        <li class='p-2' onClick='handleChangeBrand(${response[i].id})'>${response[i].name}</li>
                
        `
      }
      $('#brandDropdown').append(brandElement);
    }
  });

  $.ajax({
    type: 'GET',
    url: `https://students.trungthanhweb.com/api/getCates`,
    success: function (response) {
      let cateElement = '';

      for (let i = 0; i < response.length; i++) {
        cateElement += `
        <li class='p-2' onClick='handleChangeCate(${response[i].id})'>${response[i].name}</li>
                
        `
      }
      $('#categoryDropdown').append(cateElement);
    }
  });


  $.ajax({
    type: 'GET',
    url: `https://students.trungthanhweb.com/api/getProducts`,
    success: function (response) {
      let element = '';
      for (let i = 0; i < response.length; i++) {
        element += `
        <div class="col-sm-6 col-lg-4 mb-4">
            <div class="candidate-list candidate-grid">
              <div class="candidate-list-image">
                <img
                  class="img-fluid"
                  src="https://students.trungthanhweb.com/images/${response[i].images}"
                  
                />
              </div>
              <div class="candidate-list-details">
                <div class="candidate-list-info">
                  <div class="candidate-list-title">
                    <h5>${response[i].name}</h5>
                  </div>
                  <div class="candidate-list-option">
                    <ul class="list-unstyled fw-bold">
                      <li  style="font-size: 28px;">
                      ${(+response[i].price).toLocaleString()}đ
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="candidate-list-favourite-time d-flex" style="justify-content: space-evenly;">
                  <button class="btn btn-primary">View Detail</button>
                  <button onclick="addToCart(${response[i].id})" class="btn btn-primary">Buy Now</button>
                </div>
              </div>
            </div>
          </div>
                
        `
      }
      localStorage.setItem('productList', JSON.stringify(response))
      document.getElementById('product-list').innerHTML = element
    },
  });


  // ---Search by name

  $('#search').on('keypress', function (event) {
    if (event.key === 'Enter') {
      let name = $(this).val()
      $.ajax({
        type: 'GET',
        url: `https://students.trungthanhweb.com/api/getSearchProducts?apitoken=${apitoken}&name=${name}`,
        success: function (response) {
          let element = '';

          for (let i = 0; i < response.result.length; i++) {
            element += `
            <div class="col-sm-6 col-lg-4 mb-4">
            <div class="candidate-list candidate-grid">
              <div class="candidate-list-image">
                <img
                  class="img-fluid"
                  src="https://students.trungthanhweb.com/images/${response.result[i].image}"
                  alt=""
                />
              </div>
              <div class="candidate-list-details">
                <div class="candidate-list-info">
                  <div class="candidate-list-title">
                    <h5>${response.result[i].name}</h5>
                  </div>
                  <div class="candidate-list-option">
                    <ul class="list-unstyled fw-bold">
                      <li  style="font-size: 28px;">
                      ${(+response.result[i].price).toLocaleString()}đ
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="candidate-list-favourite-time d-flex" style="justify-content: space-evenly;">
                  <button class="btn btn-primary">View Detail</button>
                  <button class="btn btn-primary">Buy Now</button>
                </div>
              </div>
            </div>
          </div>
                    
            `
          }
          document.getElementById('product-list').innerHTML = element
        }
      });
    }
  })

})


// let arr = url('https://students.trungthanhweb.com/api/getBrandProducts?apitoken=${apitoken}&id=${id}')



// ---- Gắn API

function handleChangeBrand(id) {
  fetch(`https://students.trungthanhweb.com/api/getBrandProducts?apitoken=${apitoken}&id=${id}`)
    .then(
      
      function (response) {
        response.json().then(data => {
          let element = ''
          for (let i = 0; i < data.products.data.length; i++) {
            element += `
            <div class="col-sm-6 col-lg-4 mb-4">
            <div class="candidate-list candidate-grid">
              <div class="candidate-list-image">
                <img
                  class="img-fluid"
                  src="https://students.trungthanhweb.com/images/${data.products.data[i].image}"
                  alt=""
                />
              </div>
              <div class="candidate-list-details">
                <div class="candidate-list-info">
                  <div class="candidate-list-title">
                    <h5>${data.products.data[i].name}</h5>
                  </div>
                  <div class="candidate-list-option">
                    <ul class="list-unstyled fw-bold">
                      <li  style="font-size: 28px;">
                      ${(+data.products.data[i].price).toLocaleString()}đ
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="candidate-list-favourite-time d-flex" style="justify-content: space-evenly;">
                  <button class="btn btn-primary">View Detail</button>
                  <button onClick='addToCart(${data.products.data[i].id})' class="btn btn-primary">Buy Now</button>
                </div>
              </div>
            </div>
          </div>
            `
          }
          document.getElementById('product-list').innerHTML = element
        })
      }
    )
    .catch(err => {
      console.log('Error : -S', err)
    });

}


function handleChangeCate(id) {
  fetch(`https://students.trungthanhweb.com/api/getCateProducts?apitoken=${apitoken}&id=${id}`)
    .then(
      function (response) {
        response.json().then(data => {
          let element = ''
          for (let i = 0; i < data.products.data.length; i++) {
            element += `
            <div class="col-sm-6 col-lg-4 mb-4">
            <div class="candidate-list candidate-grid">
              <div class="candidate-list-image">
                <img
                  class="img-fluid"
                  src="https://students.trungthanhweb.com/images/${data.products.data[i].image}"
                  alt=""
                />
              </div>
              <div class="candidate-list-details">
                <div class="candidate-list-info">
                  <div class="candidate-list-title">
                    <h5>${data.products.data[i].name}</h5>
                  </div>
                  <div class="candidate-list-option">
                    <ul class="list-unstyled fw-bold">
                      <li  style="font-size: 28px;">
                      ${+data.products.data[i].price.toLocaleString()}đ
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="candidate-list-favourite-time d-flex" style="justify-content: space-evenly;">
                  <button class="btn btn-primary">View Detail</button>
                  <button onClick='addToCart(${data.products.data[i].id})' class="btn btn-primary">Buy Now</button>
                </div>
              </div>
            </div>
          </div>
            `
          }
          document.getElementById('product-list').innerHTML = element
        })
      }
    )
    .catch(err => {
      console.log('Error : -S', err)
    });

}




function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem('cart')) ?? []
  let productList = JSON.parse(localStorage.getItem('productList'))
  const selectedProduct = productList.filter(arr => arr.id == id);
  const newProduct = {...selectedProduct[0], quantity : 1}

  let index = cart.findIndex(x => x.id == id)
  if(index != -1) {
    cart[index].quantity += 1
  } else {
    cart.push(newProduct)
  }

  alert('Thêm thành công')
  localStorage.setItem('cart', JSON.stringify(cart))
}

