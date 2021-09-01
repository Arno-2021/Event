const token = localStorage.getItem('token')
const bsaeUrl = 'http://api-breakingnews-web.itheima.net'

axios
    .get(`${bsaeUrl}/my/article/cates`, {
        headers: {
            Authorization: token,
        },
    })
    .then(res => {
        // console.log(res);
        const { data, status } = res.data
        if (status === 0) {
            data.forEach(obj => {
                const theOption = `<option value="${obj.Id}" lay-verify="cate">${obj.name}</option>`
                $('select[name=cate_id]').append(theOption)
                // 让layui刷新一下form表单
                layui.form.render('select', 'edit')
            })
        }
    })
// 3. 集成图片裁剪的插件
let cropper
function initCropper() {
    // 1. 集成裁剪插件
    const image = document.getElementById('image') // 获取到要被添加裁剪插件的图片
    cropper = new Cropper(image, {
        aspectRatio: 1, // 横纵比例
        preview: $('.img-preview'),
    })
}
// 选择图片
$('.select').on('click', () => {
    // // JS代码来主动触发input[type=file]的点击事件 - 选择文件的窗口就出来
    $('#file').click()
})
// 监听input的change事件
$('#file').on('change', e => {
    //拿到图片信息
    let file = e.target.files[0]
    let url = URL.createObjectURL(file)
    // console.log(url);
    // URL是window内置的对象, createObjectURL就是把blob对象(File的父类)转成url地址(浏览器本地的-跟后台无关)
    cropper.replace(url) // 让cropper重新设置图片url地址以及重新构建cropper
})
initCropper()
initEditor()
$('form').on('submit', e => {
    e.preventDefault()
    let data = new FormData($('form')[0])
    const htmlStr = tinyMCE.activeEditor.getContent()
    data.set('content', htmlStr)
    const canvas = cropper.getCroppedCanvas({
        width: 100,
        height: 100,
    })
    canvas.toBlob(blob => {
        data.append('cover_img', blob)
        // data.forEach((v, i) => {
        //     console.log(v, i)
        // })
        axios
            .post(`${bsaeUrl}/my/article/add`, data, {
                headers: {
                    Authorization: token,
                },
            })
            .then(res => {
                if (res.data.status === 0) {
                    location.href = '../list/list.html'
                }
            })
    })
})
// publisher页面 - 文章标题
const form = layui.form
form.verify({
    articleTitle: [
        /^[\u4E00-\u9FA5a-zA-Z0-9_-]+$/,
        '标题只能是中英文, 数字下划线中划线组成',
    ],
    // 分类判断
    cate: function () {
        return $('select[name=cate_id]').val().length == 0 && '请选择文章类别'
    },
})
