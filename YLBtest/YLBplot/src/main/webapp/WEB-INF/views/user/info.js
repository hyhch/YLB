layui.config({
    base:'../../layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index'  //主入口模块
}).use(['index','useradmin', 'table', 'form', 'layer'],function () {
    var $ = layui.$
        ,form = layui.form
        ,table = layui.table
        ,layer = layui.layer;


    //验证是否登录
    $.ajax({
        url: "../../checkLogin",
        type: "post",
        success: function (data) {
            console.log(data);
            if (data != 0) {
                layer.msg("当前用户未登录");
                setTimeout(function () {window.location.href = "views/user/login.html" }, 1200);
            }
            //从session中取出登录信息
            $.ajax({
                url:"../../getLoginName",
                type:"post",
                success:function (result) {
                    console.log(result);
                    var username = result;
                    document.getElementById("username").value = username;
                    //根据session中保存的用户名查询出该用户的基本信息
                    $.ajax({
                        url:"../../getUserInfo"
                        ,type:"post"
                        ,dataType:"json"
                        ,data:{
                            'username':username
                        },
                        success:function (info) {
                            console.log(info);
                            document.getElementById("name").value = info[0].realname;
                            document.getElementById("note").value = info[0].note;
                        }
                    })
                }
            });
        }
    });


});