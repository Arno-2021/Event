axios.defaults.baseURL = 'http://api-breakingnews-web.itheima.net'
// axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
axios.interceptors.request.use(
    function (config) {
        // 在发送请求之前做些什么
        if (!config.url.startsWith('/api')) {
            config.headers.Authorization = localStorage.getItem('token')
        }
        return config
    },
    function (error) {
        // 对请求错误做些什么
        return Promise.reject(error)
    }
)
//login注册API
const registerApi = (data,callback)=>{
    axios.post(`/api/reguser`, data).then(res => {
       callback(res)
    })
}
//login登录API
const loginApi = (data,callback)=>{
    axios.post(`/api/login`, data).then(res => {
        callback(res)
    })
}
//index,user,avatar获取用户信息API
const getUserApi = callback => {
    axios.get(`/my/userinfo`).then(res => {
        callback(res)
    })
}
//user修改用户信息API
const editUserInfoApi = (data, callback) => {
    axios.post(`/my/userinfo`, data).then(res => {
        callback(res)
    })
}
//user修改密码API
const rePwdApi = (data, callback) => {
    axios.post(`/my/updatepwd`, data).then(res => {
        callback(res)
    })
}
//user修改头像API
const avatarApi = (data, callback) => {
    axios.post(`/my/update/avatar`, data).then(res => {
        callback(res)
    })
}
//category,publisher,list读取分类信息API
const loadCateApi = callback => {
    axios.get(`/my/article/cates`).then(res => {
        callback(res)
    })
}
//category新增分类信息API
const addCateApi = (data, callback) => {
    axios.post(`/my/article/addcates`, data).then(res => {
        callback(res)
    })
}
//category删除分类信息API
const delCateApi = (id, callback) => {
    axios.get(`/my/article/deletecate/${id}`).then(res => {
        callback(res)
    })
}
//category获取编辑分类
const editGetCateApi = (Id, callback) => {
    axios.get(`/my/article/cates/${Id}`).then(res => {
        callback(res)
    })
}
//category编辑分类
const editCateApi = (data, callback) => {
    axios.post(`/my/article/updatecate`, data).then(res => {
        callback(res)
    })
}
//publisher发表文章API
const pubArticle = (data, callback) => {
    axios.post(`/my/article/add`, data).then(res => {
        callback(res)
    })
}
//list获取文章列表API
const getListApi = (query, callback) => {
    axios
        .get(`/my/article/list`, {
            params: query,
        })
        .then(res => {
            callback(res)
        })
}
//list删除文章API
const delArticleApi = (id, callback) => {
    axios.get(`/my/article/delete/${id}`).then(res => {
        callback(res)
    })
}
