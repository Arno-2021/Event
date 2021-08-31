const token = localStorage.getItem('token')
const bsaeUrl = 'http://api-breakingnews-web.itheima.net'
const form = layui.form

form.verify({
    password: [
        // 密码
        /^[\S]{6,10}$/,
        '密码是6到10位, 不能有空格',
    ],
    // 修改密码页面使用 - 新旧密码不能一样
    diff: function (value) {
        return $('.oldPwd').val() == value && '新密码和旧密码不能一样'
    },
    // 修改密码页 - 使用
    same: function (value) {
        return $('.newPwd').val() !== value && '两次密码不相同'
    },
})

$('form').on('submit', e => {
    e.preventDefault()
    const data = $('form').serialize()
    axios
        .post(`${bsaeUrl}/my/updatepwd`, data, {
            headers: {
                Authorization: token,
            },
        })
        .then(res => {
            if (res.data.status === 0) {
                window.parent.location.href = '/login.html'
                localStorage.removeItem('token')
            }
        })
})
