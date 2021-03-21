layui.config({
    base:'../../layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index'  //主入口模块
}).use(['laydate','form'], function(){
    var $ = layui.$
    ,laydate = layui.laydate
    ,form = layui.form;

    var startTime = "";
    var endTime = "";

    //执行一个laydate实例
    laydate.render({
        elem: '#photo_Export' //指定元素
        ,range:true
        ,done: function(value){
            startTime = value.substring(0,10);
            endTime = value.substring(13,23);
            startTime = startTime.replace(/-/g,"/");
            endTime = endTime.replace(/-/g,"/");
            console.log(startTime);
            console.log(endTime);
        }
    });

    form.on('submit(photoExport)', function () {
        console.log(startTime);
        console.log(endTime);
        if (startTime == ""||endTime=="") {
            layer.msg("请选择导出时间");
        }
        else {
            transfer_date(startTime,endTime);
        }
    });

});

function transfer_date(startTime,endTime) {
    console.log(startTime,endTime);
    var $ = layui.$;
    $.ajax({
        url: "../../photoExport",
        type: "post",
        data: {
            "startTime":startTime,
            "endTime":endTime,
        },
        success: function (result) {
            console.log(result);
            // layer.msg("录入信息成功！");
            setTimeout(function () { location.reload() }, 1200);
            layer.msg(result);
        }
    });
}