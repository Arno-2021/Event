
function getUserInfo() {
    getUserApi(res => {
        if (res.data.status === 0) {
            let { username, nickname, email, id } = res.data.data
            $('input[name=username]').val(username)
            $('input[name=nickname]').val(nickname)
            $('input[name=email]').val(email)
            $('input[name=id').val(id)
        } else if (res.data.status === 1) {
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    })
    // axios
    //     .get(`${bsaeUrl}/my/userinfo`, {
    //         headers: {
    //             Authorization: token,
    //         },
    //     })
    //     .then(res => {
    //         if (res.data.status === 0) {
    //             let { username, nickname, email, id } = res.data.data
    //             $('input[name=username]').val(username)
    //             $('input[name=nickname]').val(nickname)
    //             $('input[name=email]').val(email)
    //             $('input[name=id').val(id)
    //         } else if (res.data.status === 1) {
    //             localStorage.removeItem('token')
    //             location.href = '/login.html'
    //         }
    //     })
}
getUserInfo()
$('form').on('submit', e => {
    e.preventDefault()
    const data = $('form').serialize()
    editUserInfoApi(data, res => {
        if (res.data.status === 0) {
            window.parent.getUser()
        }
    })
    // axios
    //     .post(`${bsaeUrl}/my/userinfo`, data, {
    //         headers: {
    //             Authorization: token,
    //         },
    //     })
    //     .then(res => {
    //         if (res.data.status === 0) {
    //             console.log(window.parent)
    //             window.parent.getUser()
    //         }
    //         console.log(res)
    //     })
})

$('.my-reset').on('click', e => {
    e.preventDefault()
    getUserInfo()
})

