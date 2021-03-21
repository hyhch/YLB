layui.config({
    base: '../../layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(['index', 'form', 'upload', 'table', 'laydate',], function () {
    var $ = layui.$
        , form = layui.form
        , upload = layui.upload
        , table = layui.table
        , laydate = layui.laydate
    ;
    selectlevel();

//页面加载完成后，加载高程下拉框
    function selectlevel() {
        var $ = layui.$;
        var form = layui.form;
        $.ajax({
            url: "../../getTransZ",
            type: "post",
            dataType: "json",
            success: function (result) {
                result.sort(function (a, b) {
                    return a - b
                });
                console.log(result);
                var role = document.getElementById("level");//add_role_name给select定义的id
                //console.log(result[0]);
                for (var i = 0; i < result.length; i++) {
                    if (result[i] != null) {
                        var option = document.createElement("option");    // 创建添加option属性
                        option.setAttribute("value", result[i]);                  // 给option的value添加值
                        option.innerText = result[i];             // 打印option对应的纯文本 （超级管理员、管理员）
                        role.appendChild(option);                          // 给select 添加option子标签
                        form.render("select");// 刷性select，显示出数据
                    }

                }
            }
        });
    };

    function getdensity() {
        var $ = layui.$;
        var form = layui.form;
        $.ajax({
            url: "../../getChosenDensity",
            type: "get",
            data: {level: $("#level").val()},
            dataType: "json",
            success: function (result) {
                for (let i = 0; i < result.length; i++) {
                    result[i] = Object.values(result[i]);//将对象转为数组
                }
                showdensity(result);
            }
        });
    };

    function showdensity(result) {
        $("#showcard").show();
        var chartDom = document.getElementById('densitychart');
        $("#densitychart").css("background-image", "url('../assets/img/5971612329980_.pic_hd.jpg')");
        var myChart = echarts.init(chartDom);
        var option;

        var trans_y = ['1', '2', '3', '3', '4', '5', '6',
            '7', '8', '9', '10'];
        var trans_x = ['1', '2', '3',
            '4', '5', '6', '7', '8', '9', '10',];


        result = result.map(function (item) {
            return [item[1], item[0], item[2] || '-'];
        });

        option = {
            tooltip: {
                position: 'top'
            },
            grid: {
                height: '70%',
                top: '10%'
            },
            xAxis: {
                type: 'category',
                data: trans_y,
                splitLine: {show: false},
                axisLine: {show: false},
                axisTick: {show: false},
                splitArea: {
                    show: true
                }
            },
            yAxis: {
                type: 'category',
                data: trans_x,
                splitLine: {show: false},
                axisLine: {show: false},
                axisTick: {show: false},
                splitArea: {
                    show: true
                }
            },
            visualMap: {
                min: 2000,
                max: 2500,
                calculable: true,
                orient: 'horizontal',
                left: 'center',
                bottom: '5%'
            },
            series: [{
                name: '密实度云图',
                type: 'heatmap',
                data: result,
                label: {
                    show: true
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowColor: 'rgba(0, 0, 0, 0.9)'
                    }
                }
            }]
        };

        option && myChart.setOption(option);

    };
    form.on('submit(level_select)', function () {
        getdensity();
    });
});

