layui.define(['table', 'form'], function(exports){
    var $ = layui.$
        ,table = layui.table
        ,form = layui.form;

    //用户管理
    table.render({
        elem: '#LAY-hydraulic-manage'
        ,url: layui.setter.base + 'json/useradmin/demo.js' //模拟接口
        ,cols: [[
            {type: 'checkbox', fixed: 'left'}
            ,{field: 'time',  title: '时间',width:120, sort: true}
            ,{field: 'responsible_name', title: '负责人', width: 80}
            ,{field: 'inspect_name', title: '巡检人员', width: 120}
            ,{field: 'record_name', title: '记录人',width:80}
            ,{field: 'upstream', title: '上游水位m',width:100}
            ,{field: 'downstream', title: '下游水位m',width:100}
            ,{field: 'flood', title: '泄洪m³/s',width:100}
            ,{field: 'rainfall', title: '降雨mm',width:100}
            ,{field: 'part', title: '部位',width:100}
            ,{field: 'type', width: 100, title: '类型'}
            ,{field: 'describe', title: '问题描述',width:200}
            ,{field: 'details', title: '详情',width:100}
            ,{title: '操作', width: 150, align:'center', fixed: 'right', toolbar: '#table-hydraulic-inspect'}
        ]]
        ,page: true
        ,limit: 30
        ,height: 'full-220'
        ,text: '对不起，加载出现异常！'
    });

    //监听工具条
    table.on('tool(LAY-hydraulic-manage)', function(obj){
        var data = obj.data;
        if(obj.event === 'del'){
            layer.prompt({
                formType: 1
                ,title: '敏感操作，请验证口令'
            }, function(value, index){
                layer.close(index);

                layer.confirm('真的删除行么', function(index){
                    obj.del();
                    layer.close(index);
                });
            });
        } else if(obj.event === 'edit'){
            var tr = $(obj.tr);

            layer.open({
                type: 2
                ,title: '编辑用户'
                ,content: '../../views/pauth/userform.html'
                ,maxmin: true
                ,area: ['500px', '450px']
                ,btn: ['确定', '取消']
                ,yes: function(index, layero){
                    var iframeWindow = window['layui-layer-iframe'+ index]
                        ,submitID = 'LAY-user-front-submit'
                        ,submit = layero.find('iframe').contents().find('#'+ submitID);

                    //监听提交
                    iframeWindow.layui.form.on('submit('+ submitID +')', function(data){
                        var field = data.field; //获取提交的字段

                        //提交 Ajax 成功后，静态更新表格中的数据
                        //$.ajax({});
                        table.reload('LAY-user-front-submit'); //数据刷新
                        layer.close(index); //关闭弹层
                    });

                    submit.trigger('click');
                }
                ,success: function(layero, index){

                }
            });
        }
    });
    exports('hydraulicinspect', {})
});