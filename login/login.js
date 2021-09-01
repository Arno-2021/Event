//点击注册切换
$('#goto-register').on('click', () => {
    $('#register').show()
})
//注册功能
$('#register form').on('submit', e => {
    e.preventDefault()
    const data = $('#register form').serialize()
    registerApi(data, res => {
        const { message, status } = res.data
        layer.msg(message)
        if (status === 0) {
            $('#register').hide()
        }
    })
    // axios.post(`${bsaeUrl}/api/reguser`, data).then(res => {
    //     const { message, status } = res.data
    //     layer.msg(message)
    //     if (status === 0) {
    //         $('#register').hide()
    //     }
    // })
})
//已有账号登录切换
$('#goto-login').on('click', () => {
    $('#register').hide()
})
//登录功能
$('#login form').on('submit', e => {
    e.preventDefault()
    const data = $('#login form').serialize()
    loginApi(data, res => {
        const { message, status, token } = res.data
        layer.msg(message)
        if (status === 0) {
            localStorage.setItem('token', token)
            location.href = '/index.html'
        }
    })
    // axios.post(`${bsaeUrl}/api/login`, data).then(res => {
    //     const { message, status, token } = res.data
    //     layer.msg(message)
    //     if (status === 0) {
    //         localStorage.setItem('token', token)
    //         location.href = '/index.html'
    //     }
    // })
})
