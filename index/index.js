//验证token
if (!localStorage.getItem('token')) {
    location.href = '/login.html'
}
