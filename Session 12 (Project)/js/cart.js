let cart = JSON.parse(localStorage.getItem('cart')) ?? []

function renderCart() {
    let element ='';
    for (let i = 0; i < cart.length; i++) {
        element += `
        
                    <div class="row main align-items-center">
                        <div class="col-2"><img class="img-fluid" src="https://students.trungthanhweb.com/images/${cart[i].images}"></div>
                        <div class="col">
                            <div class="row text-muted">${cart[i].brandname}</div>
                            <div class="row">${cart[i].name}</div>
                        </div>
                        <div class="col">
                            <button id='decrease'>-</button><a href="#" class="border">1</a><button id ='increase'>+</button>
                        </div>
                        <div class="col">${cart[i].price}đ<button onclick="deleteCart(${cart[i].id})" class="close">&#10005;</button></div>
                    </div>
                    
                
        `
    }

    document.getElementById('tbody').innerHTML = element
}

renderCart()


function confirmModal(text, subtext = "Thành công", action) {
    Swal.fire({
        title: text,
        showCancelButton: true,
        confirmButtonText: "Yes",
        
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(subtext, "success").then(action);
            renderCart()
        }
    });
    
}



function increase(id) {
    let index = cart.findIndex((x) => x.id == id);
    if (index != -1) {
        cart[index].quantity += 1
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}


function decrease(id) {
    let index = cart.findIndex((x) => x.id == id);
    if (index != -1) {
        if(cart[index].quantity <= 1) {

        } else {
            cart[index].quantity -= 1
        }
        
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}


function totalPrice () {
    let totalPrice = cart.reduce((acc,curr) => acc + curr.price * curr.quantity , 0)
}


renderCart()

function deleteCart(id) {
    // ---Tìm xem sp có trong giỏ hàng chưa
    let index = cart.findIndex((x) => x.id == id);
    if (index != -1) {
        confirmModal(
            "Bạn có chắc chắn muốn xóa không?",
            "Xóa thành công",
            function () {
                cart.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCart();
            }
        );
    }

}