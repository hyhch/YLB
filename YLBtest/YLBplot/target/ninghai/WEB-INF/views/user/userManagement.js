layui.config({
    base: '../../layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(['layer', 'table', 'laydate'], function () {
    var $ = layui.$
        , layer = layui.layer
        , table = layui.table;

    var user;
    $.ajax({
        url: '../../getUserInfo'
        , type: 'post'
        , dataType: 'json'
        , async: false
        , success: function (result) {
            user = result[0];
        }
    });

    console.log("user是" + user.authority);

    var table_users_show = table.render({
        elem: $('#usersTableShow')
        , url: '../../usersTableShow'
        , cols: [[
            {field: 'username', title: '用户名', align: 'center', sort: true}
            , {field: 'realname', title: '真实姓名', align: 'center'}
            , {field: 'note', title: '备注', align: 'center'}
        ]]
        , page: true
        , limit: 20
        , text: {
            none: '暂无用户信息'
        }
    });

    if(user.authority == 1){
        $('#users_management').show();
        $('#users_show').hide();

        var table_users = table.render({
            elem: $('#usersTable')
            , url: '../../usersTableShow'
            , cols: [[
                {field: 'username', title: '用户名', align: 'center', sort: true}
                , {field: 'realname', title: '真实姓名', align: 'center'}
                , {field: 'note', title: '备注', align: 'center'}
                , {field: 'authority', title: '权限等级', align: 'center'}
                , {title: '操作', align: 'center', fixed: 'right', toolbar: '#users-table'}
            ]]
            , page: true
            , limit: 20
            , text: {
                none: '暂无用户信息'
            }
        });

        //监听表格工具栏
        table.on('tool(usersTable)', function (obj) {
            var data = obj.data;
            if(obj.event === 'del'){
                var id = data.id;
                if(user.id === parseInt(id)){
                    layer.msg("不可删除当前登录用户！");
                }
                else {
                    layer.confirm('确定删除？', function (index) {
                        $.ajax({
                            url: '../../delete_user'
                            , type: 'post'
                            , data: {
                                "id": id
                            }
                            , success: function (result) {
                                layer.msg( "“"+ data.realname + "”用户信息已删除");
                                table_users.reload();
                            }
                            , error:function (result) {
                                layer.msg( "“"+ data.realname + "”用户信息删除失败，请重试");
                                table_users.reload();
                            }
                        })
                    });
                }
            }
            else if(obj.event === 'edit'){
                layer.open({
                    type: 2
                    , title: '用户信息管理'
                    , content: 'userManagementContent.html'
                    , btnAlign: 'c'
                    , maxmin: true
                    , area: ['500px','420px']
                    , success: function (layero, index) {
                        var body = layer.getChildFrame('body', index);
                        var iframeWin = window[layero.find('iframe')[0]['name']];
                        body.find('input#username').val(data.username);
                        body.find('input#realname').val(data.realname);
                        body.find('input#password').val(data.password);
                        body.find('select#authority').val(data.authority);
                        body.find('input#note').val(data.note);
                        iframeWin.toAuthorityChild(data.id);
                    }
                    , btn: ['保存']
                    , yes: function (index, layero) {
                        var formSubmit=layer.getChildFrame('form', index);
                        // 获取表单中的提交按钮
                        var submited = formSubmit.find('button')[0];
                        // 触发点击事件，会对表单进行验证，验证成功则提交表单，失败则返回错误信息
                        submited.click();
                    }
                    , end: function () {
                        //如果修改的是当前登录用户，需要刷新全局来加载更新后的session
                        if(user.id === parseInt(data.id)){
                            layer.msg("当前登录用户信息已被修改<br>页面将重置以应用更新");
                            setTimeout(function () { parent.location.reload() }, 2600);
                        }
                        //否则只需刷新当前页面
                        else {
                            window.location.reload();
                        }
                    }
                });
            }
        });

        $('.layui-btn.layuiadmin-btn-useradmin').on('click', function () {
            var type = $(this).data('type');
            active[type] ? active[type].call(this) : '';
        });

        var active = {
            add: function () {
                layer.open({
                    type: 2
                    , title: '新增用户'
                    , content: 'userManagementContent.html'
                    , btnAlign: 'c'
                    , maxmin: true
                    , area: ['500px','420px']
                    , success: function (layero, index) {
                        var body = layer.getChildFrame('body', index);
                        var iframeWin = window[layero.find('iframe')[0]['name']];
                    }
                    , btn: ['保存']
                    , yes: function (index, layero) {
                        var formSubmit=layer.getChildFrame('form', index);
                        // 获取表单中的提交按钮
                        var submited = formSubmit.find('button')[1];
                        // 触发点击事件，会对表单进行验证，验证成功则提交表单，失败则返回错误信息
                        submited.click();
                    }
                });
            }
        }
    }


});

function reloadF() {
    var $ = layui.$
        , table = layui.table;

    table.reload('usersTable');
}