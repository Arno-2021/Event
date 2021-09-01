function getUser() {
    //验证token
    if (!localStorage.getItem('token')) {
        location.href = '/login.html'
    }
    $('#logout').on('click', () => {
        layer.confirm(
            '确定要退出登录吗?',
            { icon: 3, title: '温馨提示' },
            function (index) {
                //do something
                localStorage.removeItem('token')
                location.href = '/login.html'
                layer.close(index)
            }
        )
    })
    getUserApi(res => {
        if (res.data.status === 0) {
            let { username, nickname, user_pic } = res.data.data
            username = nickname || username
            if (!user_pic) {
                const firstLetter = username[0].toUpperCase()
                $('.avatar').css('display', 'inline-block').html(firstLetter)
            } else {
                $('.avatar').css('display', 'none')
                $('.layui-nav-img')
                    .css('display', 'inline-block')
                    .prop('src', user_pic)
            }
            $('.username').html(username)
        } else if (res.data.status === 1) {
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    })
    //获取用户信息
    // axios
    //     .get(`${bsaeUrl}/my/userinfo`, {
    //         headers: {
    //             Authorization: token,
    //         },
    //     })
    //     .then(res => {
    //         if (res.data.status === 0) {
    //             let { username, nickname, user_pic } = res.data.data
    //             username = nickname || username
    //             if (!user_pic) {
    //                 const firstLetter = username[0].toUpperCase()
    //                 $('.avatar')
    //                     .css('display', 'inline-block')
    //                     .html(firstLetter)
    //             } else {
    //                 $('.avatar').css('display', 'none')
    //                 $('.layui-nav-img')
    //                     .css('display', 'inline-block')
    //                     .prop('src', user_pic)
    //             }
    //             $('.username').html(username)
    //         } else if (res.data.status === 1) {
    //             localStorage.removeItem('token')
    //             location.href = '/login.html'
    //         }
    //     })
}
getUser()
window._getUser = getUser()
