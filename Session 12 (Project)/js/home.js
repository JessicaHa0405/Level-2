$(document).ready(function () {
    let apitoken = localStorage.getItem('token')


    $.ajax({
        type: 'GET',
        url: `https://students.trungthanhweb.com/api/home?apitoken=${apitoken}`,
        success: function (response) {
            
            let cateElement = '';

            for (let i = 0; i < response.categrories.length; i++) {
                cateElement += `
                    <li><a class="dropdown-item" href="#">${response.categrories[i].name}</a></li>
                    
                    `
            }
            $('#categoryDropdown').append(cateElement);

            let brandElement = '';

            for (let i = 0; i < response.brands.length; i++) {
                brandElement += `
                    <li><a class="dropdown-item" href="#">${response.brands[i].name}</a></li>
                    
                    `
            }
            $('#brandDropdown').append(brandElement);

            let productElement = '';
            for (let i = 0; i < response.products.data.length; i++) {
                productElement += `
    <div class="container d-flex justify-content-center" id="product-list">

        <div class="row" id="ads">  
            
            <div class="card round fix_products">
                <div class="card-image">
                    <img class="products-img"
                        src="https://students.trungthanhweb.com/images/${response.products.data[i].images}"
                        alt="Alternate Text" />
                        
                </div>

                <div class="card-image-overlay m-auto">
                    <br>
                    <span class="card-detail-badge">New</span>
                    <span class="card-detail-badge">${(+response.products.data[i].price).toLocaleString()}</span>
                </div>

                <div class="card-body text-center">
                    <div class="ad-title m-auto">
                            <h5>${response.products.data[i].name}</h5>
                    </div>
                    <a class="ad-btn" href="#">View</a>
                </div>
            </div>

        </div>
        
    </div>
                    `
            }
            $('#product-list').append(productElement);
        }

    })

})





