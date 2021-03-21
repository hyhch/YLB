/*
// 请求代码
(function() {
    // 发起请求
    function request(option) {
        if (!option)
            throw '未填写请求参数';

        let xhr = new XMLHttpRequest();

        xhr.open(option.method || 'GET', option.url);

        // 设置请求头
        if (option.method == 'POST')
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        if (option.send == 0)
            xhr.send(0);
        else
            xhr.send(option.send || null);

        xhr.responseType = option.resType || 'text';



        if (option.result) {
            xhr.onload = function() {
                if (!option.resType || option.resType == 'text')
                    option.result(this.responseText, this.status);
                else if (option.resType == 'json')
                    option.result(this.response, this.status);
                // 如果需要其他的返回类型
                // 可以加
                else
                    option.result(this.response, this.status);
            }
        }
    }

    // 将时间字符串转化为layui的时间格式
    function str2layuiDate(str) {
        let date = new Date(str);
        return {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            date: date.getDate(),
            hours: date.getHours(),
            minutes: date.getMinutes(),
            seconds: date.getSeconds()
        }
    }

    // 判断时间是否处于某时间内
    function betweenTime(date, start, end) {
        if (date.getTime() < start.getTime() || date.getTime() > end.getTime())
            return false;
        return true;
    }

    let messageBody = document.getElementById('message-body'); // 存放数据的表格内容
    let timeDate = document.getElementById('time-date'); // 存放筛选的时间
    let heightStart = document.getElementById('height-start'); // 存放筛选的最低高程
    let heightEnd = document.getElementById('height-end'); // 存放筛选的最高高程
    let sectionStart = document.getElementById('section-start'); // 存放筛选的最低坝段
    let sectionEnd = document.getElementById('section-end'); // 存放筛选的最高坝段
    let planeStart = document.getElementById('plane-start'); // 存放筛选的最底仓面
    let planeEnd = document.getElementById('plane-end'); // 存放筛选的最高仓面
    let standardSelect = document.getElementById('standard-select'); // 存放筛选的合格情况
    let showBtn = document.getElementById('show-btn'); // 显示按钮
    let clearBtn = document.getElementById('clear-btn'); // 清除按钮

    // 存放数据
    let datas = {
        tableData: [], // 表数据
        showTableData: [], // 临时存储筛选后数据
        screenTime: {
            start: '',
            end: ''
        }, //  筛选的时间
        screenHeight: {
            start: '',
            end: ''
        }, // 筛选的高程
        screenSection: {
            start: '',
            end: ''
        }, // 筛选的坝段
        screenPlane: {
            start: '',
            end: ''
        }, // 筛选的仓面
        // screenStandard
    };

    // 显示表格
    function showTable() {
        messageBody.innerHTML = '';
        for (let i = 0; i < datas.showTableData.length; i++) {
            let d = datas.showTableData[i];
            messageBody.innerHTML += '<tr>' +
                '<td><a class="table-link">' + d.photo_name + '</a></td>' +
                '<td>' + d.time + '</td>' +
                '<td>' + d.dam_height + '</td>' +
                '<td>' + d.dam_section + '</td>' +
                '<td>' + d.dam_plane + '</td>' +
                '<td>' + d.density + '</td>' +
                '<td>' + (d.density >= 2400 ? '合格' : '偏低') + '</td>' +
                '<td><a class="table-link">详情</a></td>' +
                '</tr>';
        }
    }

    // 设置显示图片按钮
    function setShowPhotoBtn() {
        for (let i = 0; i < datas.showTableData.length; i++) {
            // 添加超链接按钮
            // 原始图片
            let a = messageBody.childNodes[i].childNodes[0].childNodes[0];
            a.addEventListener('click', function() {
                showPhoto(i);
            });
            // 过程图图片
            let a2 = messageBody.childNodes[i].childNodes[7].childNodes[0];
            a2.addEventListener('click', function() {
                showProcessedPhoto(i);
            });
        }
    }

    //================================================================================
    // 筛选方法
    //================================================================================

    function screeningStart() {
        // 清除数组
        datas.showTableData.splice(0, datas.showTableData.length);
    }

    // 筛选
    // 全部筛选写在一起，效率比较高
    function screening() {
        for (let i = 0; i < datas.tableData.length; i++) {
            let d = datas.tableData[i];
            // 时间段
            if (datas.screenTime.start != '' && datas.screenTime.end != '')
                if (!betweenTime(new Date(d.time), datas.screenTime.start, datas.screenTime.end))
                    continue; // 如果不在时间区间内

                // 高程
            if (datas.screenHeight.start != '' && datas.screenHeight.end != '')
                if (parseFloat(d.dam_height) < parseFloat(datas.screenHeight.start) || parseFloat(d.dam_height) > parseFloat(datas.screenHeight.end))
                    continue;

                // 坝段
            if (datas.screenSection.start != '' && datas.screenSection.end != '')
                if (parseFloat(d.dam_section.substring(1)) < parseFloat(datas.screenSection.start) || parseFloat(d.row_x.substring(1)) > parseFloat(datas.screenSection.end))
                    continue;

                // 纬度
            if (datas.screenSection.start != '' && datas.screenSection.end != '')
                if (parseFloat(d.dam_plane.substring(1)) < parseFloat(datas.screenPlane.start) || parseFloat(d.dam_plane.substring(1)) > parseFloat(datas.screenPlane.end))
                    continue;

                //合格情况
            if (standardSelect.value != '')
                if (standardSelect.value == '0')
                    if (d.density >= 2400)
                        continue;
            if (standardSelect.value == '1')
                if (d.density < 2400)
                    continue;

                // 其他筛选方法

            datas.showTableData.push(d);
        }
    }
    //=================================================================================


    //================================================================================
    // Layui处理
    //================================================================================
    layui.use('laydate', function() {
        let laydate = layui.laydate;

        // 时间选择
        laydate.render({
            elem: '#time-date',
            range: true,
            type: 'datetime',
            done: function(value) {
                if (value != '') {
                    datas.screenTime.start = new Date(value.substring(0, 19));
                    datas.screenTime.end = new Date(value.substring(22));
                } else {
                    datas.screenTime.start = '';
                    datas.screenTime.end = '';
                }
            }
        });
    });

    // 渲染选择框
    layui.use('form', function() {
        let form = layui.form;
        form.render('select');
    });
    //=================================================================================

    //================================================================================
    // 控件交互
    //================================================================================
    showBtn.addEventListener('click', function() {
        screeningStart();
        screening();
        showTable();
        setShowPhotoBtn();
    });

    clearBtn.addEventListener('click', function() {
        timeDate.value = '';
        heightStart.value = '';
        heightEnd.value = '';
        sectionStart.value = '';
        sectionEnd.value = '';
        planeStart.value = '';
        planeEnd.value = '';
        standardSelect.value = '';
        layui.form.render();
        datas.screenHeight.start = '';
        datas.screenHeight.end = '';
        datas.screenSection.start = '';
        datas.screenSection.end = '';
        datas.screenPlane.start = '';
        datas.screenPlane.end = '';
    });

    // 绑定高程
    heightStart.addEventListener('input', function() {
        datas.screenHeight.start = this.value;
    });
    heightEnd.addEventListener('input', function() {
        datas.screenHeight.end = this.value;
    });
    sectionStart.addEventListener('input', function() {
        datas.screenSection.start = this.value;
    });
    sectionEnd.addEventListener('input', function() {
        datas.screenSection.end = this.value;
    });
    planeStart.addEventListener('input', function() {
        datas.screenPlane.start = this.value;
    });
    planeEnd.addEventListener('input', function() {
        datas.screenPlane.end = this.value;
    });
    //=================================================================================

    request({
        url: '../../getProcessedData',
        method: 'POST',
        resType: 'json',
        result: function(res, status) {
            datas.tableData = res;
            datas.showTableData = res.slice();
            // 渲染
            // TODO 对null的处理
            showTable();
            setShowPhotoBtn();
        }
    });

    // 显示图片
    function showPhoto(index) {
        layui.use('layer', function() {
            let layer = layui.layer;

            layer.open({
                type: 2,
                // content: ['./photo_detail.html?image=' + datas.showTableData[index].row_photo_path, 'no'],
                content: ['./photo_detail.html?image=p1.jpg', 'no'],
                area: ['620px', '390px'],
                resize: false,
                title: datas.showTableData[index].photo_name
            });
        });
    }

    // 显示过程图
    function showProcessedPhoto(index) {
        // 获取查询内容
        let d = datas.showTableData[index];
        let query = '?image=' + d.grading_photo_2 +
            '&image=' + d.grading_photo_3 +
            '&image=' + d.grading_photo_4 +
            '&image=' + d.grading_photo_5 +
            '&image=' + d.grading_photo_6 +
            '&image=' + d.grading_photo_7;
        layui.use('layer', function() {
            let layer = layui.layer;

            layer.open({
                type: 2,
                // content: ['./photo_detail.html + query, 'no'],
                content: ['./photo_detail.html?image=p1.jpg&image=p2.jpg&image=p3.jpg&image=p4.jpg&image=p5.jpg&image=p6.jpg', 'no'],
                area: ['620px', '535px'],
                resize: false,
                title: '过程图'
            });
        });
    }
}());*/
