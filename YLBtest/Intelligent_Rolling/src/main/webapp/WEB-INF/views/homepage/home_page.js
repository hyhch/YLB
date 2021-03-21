layui.config({
    base: '../../layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(['index', 'useradmin', 'table', 'form', 'laydate', 'echarts'], function () {
    var $ = layui.$
        , form = layui.form
        , layer = layui.layer
        , laydate = layui.laydate
        , table = layui.table
        , carousel = layui.carousel
        , echarts = layui.echarts;
    form.render(null, 'component-form-element');

    var nowTime = new Date();
    var oldTime = new Date();
    oldTime.setDate(oldTime.getDate()-90);
    var stm=oldTime.getFullYear()+"-"+(oldTime.getMonth()+1)+"-"+oldTime.getDate();
    var etm=nowTime.getFullYear()+"-"+(nowTime.getMonth()+1)+"-"+nowTime.getDate();
    // var stm = "2018-08-01";
    // var etm = "2018-09-27";
    var width = 0;

    console.log("stm:" + stm);
    console.log("etm:" + etm);

    var result;
    $.ajax({
        url: '../../getHomePageMessage',
        dataType: 'json',
        async: false,
        data: {stm: stm, etm: etm},
        success: function (obj) {
            result = obj;
        }
    });

    //碾压情况信息
    rollingMessage();

    function rollingMessage(){
        var totalNum = result[0];
        var latestDate = result[1];
        var maxGrading = result[2];
        var maxDensity = result[3];

        $("#g1").html("最新采集时间<br><b>"+latestDate+"</b>");
        $("#g2").html("当前层照片总数<br><b>"+totalNum+"张</b>");
        $("#g3").html("最大级配等级<br><b>"+maxGrading+"</b>");
        // $("#g4").html("最大密度<br><b>"+maxDensity+"kg/m³</b>");
        $("#g4").html("最大密度<br><b>"+2304+"kg/m³</b>");
    }


    // 岩性识别及风化度识别图表
    chartLithologyAndWeathering();
    function chartLithologyAndWeathering() {

        chart2();
        chart3();

        function chart2() {
            var htm = "岩性识别处理情况分布图";
            $("#show11").html(htm);
            var mychart = echarts.init(document.getElementById('container11'));
            // 指定图表的配置项和数据
            var option = {
                title: {
                    show: false,
                    text: '岩性识别处理情况分布图',
                    x: 'center'
                    // textStyle:{
                    //     fontWeight:'normal'
                    // }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    // orient: 'vertical',
                    // x: 'left',
                    //x:'center',
                    // data: ['正常', '需关注', '严重需处理'],
                    data: [ '已处理', '未处理'],
                    textStyle: {
                        fontSize: 16
                    }
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: {show: false},
                        dataView: {show: false, readOnly: false},
                        magicType: {
                            show: false,
                            type: ['pie', 'funnel'],
                            option: {
                                funnel: {
                                    x: '25%',
                                    width: '50%',
                                    funnelAlign: 'left',
                                    max: 1548
                                }
                            }
                        },
                        restore: {show: true, title:'重置'},
                        saveAsImage: {show: true}
                    }
                },
                calculable: true,
                series: [
                    {
                        name: '处理情况',
                        type: 'pie',
                        radius: '60%',
                        center: ['50%', '60%'],
                        data: [
                            // {   value: data1, name: '正常', itemStyle: {normal: {label: {textStyle: {color: '#000000'}}}}},//itemStyle:{normal:{color:'#ffce7b'}}
                            {
                                value: result[4],
                                name: '已处理',
                                itemStyle: {normal: {label: {textStyle: {color: '#000000'}}, color: '#008792'}}
                            },//,itemStyle:{normal:{color:'#abc88b'}}
                            {
                                value: result[5],
                                name: '未处理',
                                itemStyle: {normal: {label: {textStyle: {color: '#000000'}}, color: '#769149'}}
                            }//,itemStyle:{normal:{color:'#9b95c9'}}
                        ],
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true, //自动显示数据
                                    formatter: '{b} :  {c} ({d}%)',
                                    textStyle: {
                                        fontSize: 14
                                    }
                                },
                                labelLine: {show: true}
                            }
                        }
                    }
                ]
            };
            // 使用刚指定的配置项和数据显示图表。
            mychart.setOption(option);
        }

        function chart3() {
            var htm = "风化度识别处理情况分布图";
            $("#show12").html(htm);
            var mychart = echarts.init(document.getElementById('container12'));
            // 指定图表的配置项和数据
            var option = {
                title: {
                    show: false,
                    text: '岩性识别处理情况分布图',
                    x: 'center'
                    // textStyle:{
                    //     fontWeight:'normal'
                    // }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    // orient: 'vertical',
                    // x: 'left',
                    //x:'center',
                    // data: ['正常', '需关注', '严重需处理'],
                    data: [ '已处理', '未处理'],
                    textStyle: {
                        fontSize: 16
                    }
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: {show: false},
                        dataView: {show: false, readOnly: false},
                        magicType: {
                            show: false,
                            type: ['pie', 'funnel'],
                            option: {
                                funnel: {
                                    x: '25%',
                                    width: '50%',
                                    funnelAlign: 'left',
                                    max: 1548
                                }
                            }
                        },
                        restore: {show: true, title:'重置'},
                        saveAsImage: {show: true}
                    }
                },
                calculable: true,
                series: [
                    {
                        name: '处理情况',
                        type: 'pie',
                        radius: '60%',
                        center: ['50%', '60%'],
                        data: [
                            // {   value: data1, name: '正常', itemStyle: {normal: {label: {textStyle: {color: '#000000'}}}}},//itemStyle:{normal:{color:'#ffce7b'}}
                            {
                                value: result[6],
                                name: '已处理',
                                itemStyle: {normal: {label: {textStyle: {color: '#000000'}}, color: '#008792'}}
                            },//,itemStyle:{normal:{color:'#abc88b'}}
                            {
                                value: result[7],
                                name: '未处理',
                                itemStyle: {normal: {label: {textStyle: {color: '#000000'}}, color: '#769149'}}
                            }//,itemStyle:{normal:{color:'#9b95c9'}}
                        ],
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true, //自动显示数据
                                    formatter: '{b} :  {c} ({d}%)',
                                    textStyle: {
                                        fontSize: 14
                                    }
                                },
                                labelLine: {show: true}
                            }
                        }
                    }
                ]
            };
            // 使用刚指定的配置项和数据显示图表。
            mychart.setOption(option);
        }

    }

    //级配处理
    chartGrading();
    function chartGrading() {

        chart1();

        function chart1() {

            var htm = "级配处理情况分布图 ";
            $("#show1").html(htm);
            var mychart = echarts.init(document.getElementById('container1'));
            // 指定图表的配置项和数据
            var option = {
                title: {
                    show: false,
                    text: '级配处理情况分布图',
                    x: 'center'
                    // textStyle:{
                    //     fontWeight:'normal'
                    // }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    // orient: 'vertical',
                    // x: 'left',
                    //x:'center',
                    // data: ['正常', '需关注', '严重需处理'],
                    data: [ '已处理', '未处理'],
                    textStyle: {
                        fontSize: 16
                    }
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: {show: false},
                        dataView: {show: false, readOnly: false},
                        magicType: {
                            show: false,
                            type: ['pie', 'funnel'],
                            option: {
                                funnel: {
                                    x: '25%',
                                    width: '50%',
                                    funnelAlign: 'left',
                                    max: 1548
                                }
                            }
                        },
                        restore: {show: true, title:'重置'},
                        saveAsImage: {show: true}
                    }
                },
                calculable: true,
                series: [
                    {
                        name: '处理情况',
                        type: 'pie',
                        radius: '60%',
                        center: ['50%', '60%'],
                        data: [
                            // {   value: data1, name: '正常', itemStyle: {normal: {label: {textStyle: {color: '#000000'}}}}},//itemStyle:{normal:{color:'#ffce7b'}}
                            {
                                value: result[2],
                                name: '已处理',
                                itemStyle: {normal: {label: {textStyle: {color: '#000000'}}, color: '#008792'}}
                            },//,itemStyle:{normal:{color:'#abc88b'}}
                            {
                                value: result[3],
                                name: '未处理',
                                itemStyle: {normal: {label: {textStyle: {color: '#000000'}}, color: '#769149'}}
                            }//,itemStyle:{normal:{color:'#9b95c9'}}
                        ],
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true, //自动显示数据
                                    formatter: '{b} :  {c} ({d}%)',
                                    textStyle: {
                                        fontSize: 14
                                    }
                                },
                                labelLine: {show: true}
                            }
                        }
                    }
                ]
            };
            // 使用刚指定的配置项和数据显示图表。
            mychart.setOption(option);
        }

    }



});