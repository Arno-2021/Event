const token = localStorage.getItem('token')
const bsaeUrl = 'http://api-breakingnews-web.itheima.net'
let cropper
$('.select').on('click', e => {
    e.preventDefault()
    $('input[type=file]').click()
})
$('input[type=file]').on('change', function (e) {
    const url = URL.createObjectURL(this.files[0])
    cropper.replace(url)
})
$('.sure').on('click', e => {
    e.preventDefault()
    const canvas = cropper.getCroppedCanvas({
        // 利用cropper的方法, 把裁剪区域输出到一个canvas标签上 // width和height是canvas标签的大小
        width: 100,
        height: 100,
    })
    let base64Str = canvas.toDataURL('image/jpeg') // canvas图像 -> base64字符串
    // image/jpeg 是对标签输出的base64字符串做出一个类型的标记
    // 等一会儿把头像base64字符串, 放到img标签的src上, img标签根据类型就知道如何解析这串base64字符串

    // 因为base64Str有一些特殊的符号, 前端要进行URL编码, 再传给后台(node+express)会进行URL解码
    base64Str = encodeURIComponent(base64Str)
    const argStr = 'avatar=' + base64Str
    axios
        .post(`${bsaeUrl}/my/update/avatar`, argStr, {
            headers: {
                Authorization: token,
            },
        })
        .then(res => {
            layer.msg(res.data.message)
            if (res.data.status === 0) {
                window.parent.getUser()
            }
        })
})

function getUser() {
    //验证token
    axios
        .get(`${bsaeUrl}/my/userinfo`, {
            headers: {
                Authorization: token,
            },
        })
        .then(res => {
            if (res.data.status === 0) {
                let { user_pic } = res.data.data
                if (user_pic) {
                    $('#image').prop('src', user_pic)
                    cropper = new Cropper($('#image')[0], {
                        aspectRatio: 1, // 裁剪图层的横纵比例
                        preview: $('.img-preview'), // 多看文档里每个属性的意思, 一般都会有, 实在没用自己写/换个插件
                    })
                }
            } else if (res.data.status === 1) {
                localStorage.removeItem('token')
                location.href = '/login.html'
            }
        })
}
getUser()
