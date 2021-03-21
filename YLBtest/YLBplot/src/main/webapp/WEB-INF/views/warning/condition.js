layui.config({
    base: '../../layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(['index', 'form', 'upload','table', 'laydate'], function () {
    var $ = layui.$
        , form = layui.form
        , upload = layui.upload
        , table = layui.table
        ,laydate=layui.laydate;
    var formSelects = layui.formSelects;


    //获取当前预警条件
    //密度预警条件
    $.ajax({
        url: "../../getDensityWarning",
        type: "post",
        dataType: "json",
        success: function (result) {
            $("#density").val(result);
        }
    });

    //级配预警条件
    $.ajax({
        url: "../../getGranularWarning",
        type: "post",
        dataType: "json",
        success: function (result) {
            console.log("result是"+result)
            $("#granular_x").val(result.x);
            $("#granular_y_min").val(result.y_min);
            $("#granular_y_max").val(result.y_max);
        }
    });

    //监听表单提交
    //密度
    form.on('submit(formDensity)', function(data){
        var field = data.field;
        var newVal = field.density;

        // layer.msg(JSON.stringify(data.field));

        $.ajax({
            url:"../../getUserInfo"
            ,type:"post"
            ,dataType:"json"
            , success:function (result) {
                if (result[0].authority == 1) {
                    $.ajax({
                        url: "../../updateDensityWarning",
                        type: "post",
                        data: {'newVal': newVal},
                        dataType: "json",
                        success: function (result) {
                            if (result == 1) {
                                layer.msg("修改成功！");
                            } else {
                                layer.msg("请稍后再试！");
                            }
                        }
                    });
                } else {
                    layer.msg("对不起，您不具备修改权限，请与管理员联系！")
                }
            }
        });
        return false;
    });

    //级配
    form.on('submit(formGranular)', function(data){
        var field = data.field;
        var newVal_x = field.granular_x;
        var newVal_y_min = field.granular_y_min;
        var newVal_y_max = field.granular_y_max;

        // layer.msg(JSON.stringify(data.field));
        $.ajax({
            url:"../../getUserInfo"
            ,type:"post"
            ,dataType:"json"
            , success:function (result) {
                if (result[0].authority == 1) {
                    $.ajax({
                        url: "../../updateGranularWarning",
                        type: "post",
                        data: {'newVal_x':newVal_x,
                            'newVal_y_min':newVal_y_min,
                            'newVal_y_max':newVal_y_max},
                        dataType: "json",
                        success: function (result) {
                            if (result == 1) {
                                layer.msg("修改成功！");
                            } else {
                                layer.msg("请稍后再试！");
                            }
                        }
                    });
                } else {
                    layer.msg("对不起，您不具备修改权限，请与管理员联系！")
                }
            }
        });
        return false;
    });


});