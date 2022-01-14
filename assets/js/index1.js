$(function(){
  getUserInfo()

var layer = layui.layer
$('#btnLogout').on('click',function(){
layer.confirm('确认退出？',{ icon:3, title: '提示'},function(index){
  localStorage.removeItem('token')
  location.href = 'login.html'
  layer.close(index)
})
})
})
function getUserInfo(){
  $.ajax({
    ty:'GET',
    url:'/my/userinfo',
   
    success:function(res){
      // console.log(res);
     if(res.status != 0){
       return layui.layer.msg('获取失败')
     }
     renderAvatar(res.data)

    }
  })
}

//渲染头像
function renderAvatar(user){
  //获取用户名
  var name = user.nickname || user.username
  //设置文本
  $('#welcome').html('欢迎&nbsp;&nbsp;' + name)

  if(user.user_pic != null){
    //渲染头像
    $('.layui-nav-img').attr('src',user.user_pic).show()
    $('.text-avatar').hide()
  }else{
    //渲染文本头像
    $('.layui-nav-img').hide()
    var first = name[0].toUpperCase()
    $('.text-avatar').html(first).show()
  }

}