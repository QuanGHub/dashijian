$(function(){
  //区注册链接
  $('#link_reg').on('click', function() {
    $('.login-box').hide()
    $('.reg-box').show()
  })

  // 点击“去登录”的链接
  $('#link_login').on('click', function() {
    $('.login-box').show()
    $('.reg-box').hide()
  })

  var form = layui.form
  var layer = layui.layer
  form.verify({
    // 自定义了一个叫做 pwd 校验规则
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    repwd: function(value){
      //判断两次密码输入是否一致，不一致提示消息
      var pwd = $('.reg-box [name=password]').val()
      if(pwd !== value){
        return '两次密码不一致'
      }
    }
  })
   // 监听注册表单的提交事件
   $('#form_reg').on('submit', function(e) {
    // 1. 阻止默认的提交行为
    e.preventDefault()
    
    var data = {
      username: $('#form_reg [name=username]').val(),
      password: $('#form_reg [name=password]').val()
    }
    $.post('/api/reguser', data, function(res) {
      if (res.status !== 0) {
        return layer.msg(res.message)
      }
      layer.msg('注册成功，请登录！')
     
      $('#link_login').click()
    })
  })

  // 监听登录表单的提交事件
  $('#form_login').submit(function(e) {
    // 阻止默认提交
    e.preventDefault()
    $.ajax({
      url: '/api/login',
      type: 'POST',
      // 获取表单中的数据
      data: $(this).serialize(),
      success: function(res) {
        if (res.status !== 0) {
          return layer.msg('登录失败！')
        }
        layer.msg('登录成功！')
        
        localStorage.setItem('token', res.token)
        
        location.href = 'index1.html'
      }
    })
  })
})