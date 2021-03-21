layui.config({
    base:'../../layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index'  //主入口模块
}).use(['index','useradmin', 'table', 'form', 'layer'],function () {
    var $ = layui.$
        , form = layui.form
        , table = layui.table
        , layer = layui.layer;

    form.on('submit(update-password)',function (data) {
        console.log(data);
        var field = data.field;
        var old_password = field.old_password;
        var new_password = field.new_password;
        var con_password = field.con_password;
        var real_password = "";
        var username = "";
        //检查两次新密码输入是否一致
        if(new_password!=con_password){
            layer.msg("两次输入的密码不一致，请重试！");
            setTimeout(function () {window.location.reload()}, 1200);
        }
        else if(new_password==con_password){
            //检查新密码是否与旧密码相同
            if(old_password==new_password){
                layer.msg("新密码不能与旧密码相同，请重试！");
                setTimeout(function () {window.location.reload()}, 1200);
            }
            //从session中取出当前登录用户的密码
            $.ajax({
                url:"../../getLoginPassword",
                type:"post",
                success:function (result) {
                    real_password = result;
                    //检查用户输入的旧密码是否正确
                    if(old_password!=real_password){
                        layer.msg("旧密码输入不正确，请重试！");
                        setTimeout(function () {window.location.reload()}, 1200);
                    }
                    //从session中取出当前登录用户的用户名
                    $.ajax({
                        url:"../../getLoginName",
                        type:"post",
                        success:function (result) {
                            username = result;
                            console.log(username);
                            //修改密码
                            $.ajax({
                                url:"../../update_password"
                                ,type:"post"
                                ,dataType:"json"
                                ,data:{
                                  'username':username
                                    ,'password':new_password
                                },
                                success:function () {
                                    layer.msg("密码修改成功，请重新登录！");
                                    //清空session并且跳转到登录页面
                                    $.ajax({
                                        url:"../../logout",
                                        type:"post",
                                        success:function () {
                                        setTimeout(function () {parent.location.href = "login.html" }, 1200);
                                    }
                                    });
                                }
                            });
                        }
                    });

                }

            });
        }
    })


});