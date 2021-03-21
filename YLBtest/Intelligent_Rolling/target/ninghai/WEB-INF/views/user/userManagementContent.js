var id;

function toAuthorityChild(i){
    id = i;
}

layui.config({
    base: '../../layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(['index', 'form', 'layer'], function () {
    var $ = layui.$
        , form = layui.form
        , layer = layui.layer;

    form.on('submit(update-user)', function (data) {
        var username = $('#username').val();
        var realname = $('#realname').val();
        var password = $('#password').val();
        var authority = $('#authority').val();
        var note = $('#note').val();
        
        $.ajax({
            url: '../../update_user'
            , type: 'post'
            , data: {
                "id": id
                , "username": username
                , "realname": realname
                , "password": password
                , "authority": authority
                , "note": note
            }
            , success: function (result) {
                layer.msg("编辑成功");
                var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
                setTimeout(function () { parent.layer.close(index);  }, 1200);//再执行关闭
            }
        })
    });

    form.on('submit(insert-user)', function (data) {
        var username = $('#username').val();
        var realname = $('#realname').val();
        var password = $('#password').val();
        var authority = $('#authority').val();
        var note = $('#note').val();

        $.ajax({
            url: '../../insert_user'
            , type: 'post'
            , data: {
                "username": username
                , "realname": realname
                , "password": password
                , "authority": authority
                , "note": note
            }
            , success: function (result) {
                layer.msg("添加用户“" + realname + "”成功");
                var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
                setTimeout(function () { parent.layer.close(index);  }, 1200);//再执行关闭
                setTimeout(function () { parent.location.reload();  }, 1200);
            }
            , error: function (result) {
                layer.msg("添加用户“" + realname + "”失败，请重试");
            }
        })
    });

});