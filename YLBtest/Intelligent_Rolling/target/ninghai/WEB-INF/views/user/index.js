layui.config({
    base: 'layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(['index', 'layer', 'laydate'],function () {
    var $ = layui.$
        ,layer = layui.layer
        ,laydate = layui.laydate;

    //验证是否登录
    $.ajax({
        url: "../../ninghai_war_exploded/checkLogin",
        type: "post",
        success: function (data) {
            console.log(data);
            if (data != 0) {
                layer.msg("当前用户未登录");
                setTimeout(function () {window.location.href = "views/user/login.html" }, 1200);
            }
            //从session中取出登录信息
            $.ajax({
                url:"../../ninghai_war_exploded/getRealName",
                type:"post",
                success:function (result) {
                    var realname = result;
                    document.getElementById('user').innerHTML = realname;
                }
            });
        }
    });


    //右上角时间
    laydate.render({
        elem: '#date' //指定元素
        ,value: new Date().toLocaleDateString().split('/').join('-')
        ,done: function (value, date, endDate) {
            // $(".layadmin-iframe")[0].contentWindow.workProcess(value);
            // console.log(window['main-content']);
            window['main-content'].workProcess(value);
            window['main-content'].setDT(value);
        }
    });

    // var $ = layui.$;
    $("#date").change(function (ev) {
        console.log(ev.target);
        console.log(ev);
    });

});

// //退出登录
function LogoutF() {
    var $ = layui.$;
    var layer = layui.layer;
    //清空session并且跳转到登录页面
    $.ajax({
        //服务器用：
        url:"../../ninghai_war_exploded/logout",
        //idea用：
        //url:"../../logout",
        type:"post",
        success:function (result) {
            layer.msg("已退出登录");
            setTimeout(function () {window.location.href = "views/user/login.html" }, 1200);
        }
    });
}