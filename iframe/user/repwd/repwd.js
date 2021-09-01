



$('form').on('submit', e => {
    e.preventDefault()
    const data = $('form').serialize()
    rePwdApi(data, res => {
        if (res.data.status === 0) {
            window.parent.location.href = '/login.html'
            localStorage.removeItem('token')
        }
    })
    // axios
    //     .post(`${bsaeUrl}/my/updatepwd`, data, {
    //         headers: {
    //             Authorization: token,
    //         },
    //     })
    //     .then(res => {
    //         if (res.data.status === 0) {
    //             window.parent.location.href = '/login.html'
    //             localStorage.removeItem('token')
    //         }
    //     })
})
