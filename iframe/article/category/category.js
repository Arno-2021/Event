const token = localStorage.getItem('token')
const bsaeUrl = 'http://api-breakingnews-web.itheima.net'
// 添加类型的 - 弹出层上的 表单标签
var add_str = `
<form class="layui-form add-form" action="" style="margin: 30px; margin-left: 0px;" id="add_form">
<div class="layui-form-item">
  <label class="layui-form-label">类别名称</label>
  <div class="layui-input-block">
    <input type="text" name="name" required lay-verify="required|ctname" placeholder="请输入标题" autocomplete="off" class="layui-input">
  </div>
</div>
<div class="layui-form-item">
  <label class="layui-form-label">类别别名</label>
  <div class="layui-input-block">
    <input type="text" name="alias" required lay-verify="required|aliname" placeholder="请输入标题" autocomplete="off" class="layui-input">
  </div>
</div>
<div class="layui-form-item">
  <div class="layui-input-block">
    <button class="layui-btn" lay-submit lay-filter="formDemo">确认添加</button>
    <button type="reset" class="layui-btn layui-btn-primary">重置</button>
  </div>
</div>
</form>`
function load() {
    axios
        .get(`${bsaeUrl}/my/article/cates`, {
            headers: {
                Authorization: token,
            },
        })
        .then(res => {
            console.log(res)
            const { data } = res.data
            $('tbody').empty()
            data.forEach(obj => {
                let theTr = $(`<tr>
              <td>${obj.name}</td>
              <td>${obj.alias}</td>
              <td>
                <button myid="${obj.Id}" data-name="${obj.name}" data-alias="${obj.alias}" type="button" class="layui-btn layui-btn-xs edit">编辑</button>
          
                <button myid="${obj.Id}" type="button" class="layui-btn layui-btn-xs layui-btn-danger delete">删除</button>
              </td>
            </tr>`)
                $('tbody').append(theTr)
            })
        })
}
load()
$('.add').on('click', () => {
    let index = layer.open({
        type: 1,
        area: ['500px', '300px'],
        title: '新增分类',
        content: add_str, //这里content是一个普通的String
    })
    $('.add-form').on('submit', e => {
        e.preventDefault()
        const data = $('.add-form').serialize()
        axios
            .post(`${bsaeUrl}/my/article/addcates`, data, {
                headers: {
                    Authorization: token,
                },
            })
            .then(res => {
                if (res.data.status === 0) {
                    layer.close(index)
                    load()
                }
            })
    })
})
$('tbody').on('click', '.delete', e => {
    let id = e.target.getAttribute('myid')
    axios
        .get(`${bsaeUrl}/my/article/deletecate/${id}`, {
            headers: {
                Authorization: token,
            },
        })
        .then(res => {
            if (res.data.status === 0) {
                layer.confirm(
                    '是否要删除？？？',
                    { icon: 3, title: '提示' },
                    function (index) {
                        $(e.target).parents('tr').remove()
                        layer.msg(res.data.message)
                        layer.close(index)
                    }
                )
            } else {
                layer.msg(res.data.message)
            }
        })
})
$('tbody').on('click', '.edit', function () {
    let index = layer.open({
        type: 1,
        area: ['500px', '300px'],
        title: '编辑分类',
        content: edit_str, //这里content是一个普通的String
    })
    let Id = $(this).attr('myid')
    axios
        .get(`${bsaeUrl}/my/article/cates/${Id}`, {
            headers: {
                Authorization: token,
            },
        })
        .then(res => {
            const { alias, name } = res.data.data
            if (res.data.status === 0) {
                form.val('edit', {
                    //formTest 即 class="layui-form" 所在元素属性 lay-filter="" 对应的值
                    name,
                    alias,
                    Id,
                })
            }
        })
    $('.add-form').on('submit', e => {
        e.preventDefault()
        const data = $('.add-form').serialize()
        axios
            .post(`${bsaeUrl}/my/article/updatecate`, data, {
                headers: {
                    Authorization: token,
                },
            })
            .then(res => {
                console.log(res)
                if (res.data.status === 0) {
                    layer.close(index)
                    layer.msg(res.data.message)
                    load()
                } else {
                    layer.close(index)
                    layer.msg(res.data.message)
                }
            })
    })
})
//编辑
var edit_str = `
  <form class="layui-form add-form" action="" style="margin: 30px; margin-left: 0px;" id="edit_form" lay-filter="edit">
    <div class="layui-form-item">
      <label class="layui-form-label">类别名称</label>
      <div class="layui-input-block">
        <input type="text" name="name" required lay-verify="required|ctname" placeholder="请输入标题" autocomplete="off" class="layui-input">
      </div>
    </div>
    <div class="layui-form-item">
      <label class="layui-form-label">类别别名</label>
      <div class="layui-input-block">
        <input type="text" name="alias" required lay-verify="required|aliname" placeholder="请输入标题" autocomplete="off" class="layui-input">
      </div>
    </div>
    <input type="hidden" name="Id">
    <div class="layui-form-item">
      <div class="layui-input-block">
        <button class="layui-btn" lay-submit >确认修改</button>
      </div>
    </div>
  </form>`
const form = layui.form
form.verify({
    ctname: [/^[\u4E00-\u9FA5]+$/, '分类名只能是中文'],
    aliname: [/^[a-z0-9]+$/, '小写英文和数字组成'],
})
