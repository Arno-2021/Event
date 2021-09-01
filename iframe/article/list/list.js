const token = localStorage.getItem('token')
const bsaeUrl = 'http://api-breakingnews-web.itheima.net'
let query = {
    pagenum: 1,
    pagesize: 2,
    cate_id: '',
    state: '',
}
let total = 0
function getList() {
    $('.layui-table tbody').empty()
    axios
        .get(`${bsaeUrl}/my/article/list`, {
            headers: {
                Authorization: token,
            },
            params: query,
        })
        .then(res => {
            console.log(res)
            const { status, data } = res.data
            if (status === 0) {
                data.forEach(obj => {
                    let theTr = `<tr>
                            <td>${obj.title}</td>
                            <td>${obj.cate_name}</td>
                            <td>${obj.pub_date}</td>
                            <td>${obj.state}</td>
                            <th>
                            <button myid="${obj.Id}" type="button" class="layui-btn layui-btn-xs layui-btn-danger del">删除</button>
                                </th>
                        </tr>`
                    $('.layui-table tbody').append(theTr)
                })
            }
            total = res.data.total
            setPage()
        })
}
getList()
axios
    .get(`${bsaeUrl}/my/article/cates`, {
        headers: {
            Authorization: token,
        },
    })
    .then(res => {
        $('select[name=category]').append(
            `<option value="" lay-verify="cate">所有分类</option>`
        )
        res.data.data.forEach(obj => {
            const theOption = `<option value="${obj.Id}" lay-verify="cate">${obj.name}</option>`
            $('select[name=category]').append(theOption)
        })
        layui.form.render('select', 'category')
    })
$('.search').on('submit', e => {
    e.preventDefault()
    const category = $('select[name="category"]').val()
    const state = $('select[name="state"]').val()
    query.cate_id = category
    query.state = state
    getList()
})
function setPage() {
    var laypage = layui.laypage
    // laypage.render({
    //     elem: 'page',
    //     count: total,
    //     curr: query.pagenum,
    //     limt: query.pagesize,
    //     limits: [2, 3, 5, 10],
    //     layout: ['count', 'prev', 'page', 'next', 'limit'],
    //     jump: function (obj, first) {
    //         console.log(obj)
    //         if (!first) {
    //             //do something
    //             query.pagenum = obj.curr
    //             query.pagesize = obj.limt
    //             getList()
    //         }
    //     },
    // })
    layui.use('laypage', function () {
        var laypage = layui.laypage
        //执行一个laypage实例
        laypage.render({
            elem: 'page',
            count: total,
            curr: query.pagenum,
            limit: query.pagesize,
            limits: [2, 3, 5, 10],
            layout: ['count', 'prev', 'page', 'next', 'limit'],
            jump: function (obj, first) {
                console.log(obj)
                if (!first) {
                    //do something
                    query.pagenum = obj.curr
                    query.pagesize = obj.limit
                    getList()
                }
            },
        })
    })
}
$('tbody').on('click', '.del', e => {
    // /my/article/delete/
    let id = $(e.target).attr('myid')
    axios
        .get(`${bsaeUrl}/my/article/delete/${id}`, {
            headers: {
                Authorization: token,
            },
        })
        .then(res => {
            if (res.data.status === 0) {
                getList()
            }
        })
})
