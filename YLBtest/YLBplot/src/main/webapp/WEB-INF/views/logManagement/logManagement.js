layui.config({
    base: '../../layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index'  //主入口模块
}).use(['index', 'useradmin', 'table', 'laydate','form'], function () {
    var $ = layui.$
        , form = layui.form
        , table = layui.table
        , laydate = layui.laydate;

    form.render();

    //加载操作用户
    selectOperator();

    var operator = "";
    form.on('submit(LAY-log-search)',function (data) {
        var field = data.field;
        var table = layui.table;
        operator = field.operator;
        table.render({
            elem:$('#logTable')
            ,url:'../../logTable'
            ,where: {
                'operator': operator
            }
            ,cols:[[
                {field: 'operator', title: '操作人',width: '20%', align: 'center'}
                ,{field: 'operateType', title: '操作类型', width: '30%', align: 'center'}
                ,{field: 'operateResult', title: '操作结果', width: "10%", align: 'center'}
                ,{field: 'operateDate', title:'操作时间', width:'40%', align:'center'}
                ]]
                ,cellMinwidth:200
                ,page:true
                ,limit:20
                ,text:'对不起，加载出现异常！'
            });
    });
});

function selectOperator() {
    var $ = layui.$;
    var form = layui.form;
    $.ajax({
        url: '../../getOperator',
        type: 'post',
        dataType: 'json',
        success: function (data) {
            var operator = document.getElementById("operator");
            for(var i = 0; i < data.length;i++){
                if(data[i]!=null){
                    var option = document.createElement("option");
                    option.setAttribute("value", data[i].username);
                    option.innerText = data[i].username;
                    operator.appendChild(option);
                    form.render("select");
                }
            }
        }
    });
}