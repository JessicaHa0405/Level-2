$(document).ready(function () {
    $('#login-form').on('submit', function (event) {
        // alert('Dang nhap thanh cong voi Email la ' + email)
        // window.open('../html/home.html')

        const email = $('#email-login').val();

        // ---Ngăn chặn sự kiện mặc định của form(xóa dữ liệu)
        event.preventDefault();
        console.log(email)
        $.ajax({
            type: 'POST',
            url: `https://students.trungthanhweb.com/api/checkLoginhtml?email=${email}`,
            success: function (response) {
                if (!response.check) {
                    notification(response.msg.email[0], error)
                } else if (response.check) {
                    notification('Đăng nhập thành công');
                    setTimeout(() => {
                        localStorage.setItem('token', response.apitoken)
                        window.location.href = '../html/home.html';
                    }, 2000 )
                    
                }
            }
        })

        function notification(text, type = 'success') {
            Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            }).fire({
                icon: type,
                title: text,
            });
        }

    })

});
