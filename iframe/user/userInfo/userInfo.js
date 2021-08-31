const token = localStorage.getItem('token')
const bsaeUrl = 'http://api-breakingnews-web.itheima.net'
function getUserInfo() {
    axios
        .get(`${bsaeUrl}/my/userinfo`, {
            headers: {
                Authorization: token,
            },
        })
        .then(res => {
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
}
getUserInfo()
$('form').on('submit', e => {
    e.preventDefault()
    const data = $('form').serialize()
    axios
        .post(`${bsaeUrl}/my/userinfo`, data, {
            headers: {
                Authorization: token,
            },
        })
        .then(res => {
            if (res.data.status === 0) {
                console.log(window.parent)
                window.parent.getUser()
            }
            console.log(res)
        })
})

let form = layui.form
form.verify({
    // 指定规则名和对应的验证规则
    nickname: [
        // 昵称
        /^[\u4E00-\u9FA5]+$/,
        '昵称只能是中文',
    ],
})
$('.my-reset').on('click', e => {
    e.preventDefault()
    getUserInfo()
})
