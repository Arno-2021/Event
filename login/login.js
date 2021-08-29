const bsaeUrl = 'http://api-breakingnews-web.itheima.net'
//点击注册切换
$('#goto-register').on('click', () => {
    $('#register').show()
})
//注册功能
$('#register form').on('submit', e => {
    e.preventDefault()
    const data = $('#register form').serialize()
    console.log(data)
    axios.post(`${bsaeUrl}/api/reguser`, data).then(res => {
        const { message, status } = res.data
        layer.msg(message)
        if (status === 0) {
            $('#register').hide()
        }
    })
})
//已有账号登录切换
$('#goto-login').on('click', () => {
    $('#register').hide()
})
//登录功能
$('#login form').on('submit', e => {
    e.preventDefault()
    const data = $('#login form').serialize()
    console.log(data)
    axios.post(`${bsaeUrl}/api/login`, data).then(res => {
        const { message, status } = res.data
        layer.msg(message)
        if (status === 0) {
            location.href = '/index.html'
        }
    })
})
//输入验证
const form = layui.form
form.verify({
    // 指定规则名和对应的验证规则
    username: [
        // 用户名
        /^[a-z0-9]{6,10}$/,
        '账号名是6到10位由数字, 小写字母组成',
    ],
    password: [
        // 密码
        /^[\S]{6,10}$/,
        '密码是6到10位, 不能有空格',
    ],
    // 注册页-确认密码
    repwd: function (value) {
        // 为什么用函数, 因为不光要获取这个规则对应的标签的值, 还需要用jQ获取另外一个标签的值
        return $('.pwd').val() !== value && '两次密码不相同'
    },
})
