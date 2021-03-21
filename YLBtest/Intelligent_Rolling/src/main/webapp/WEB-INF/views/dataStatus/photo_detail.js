/*
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

    // 获取的标签
    let photoBox = document.getElementById('photo-box');
    let lastBtn = document.getElementById('last-btn');
    let nextBtn = document.getElementById('next-btn');
    let preview = document.getElementById('preview');
    let previewList = document.getElementById('preview-list');
    let photoName = document.getElementById('photo-name'); // 图片名内容
    let pname = document.getElementById('pname'); // 图片名


    function getImage(callback) {
        // 获取搜索值
        let search = window.location.search;
        let sl = search.substring(1).split('&');

        let hided = false; // 标志是否隐藏
        // 如果只有一张图片，则隐藏两个按钮和预览
        if (sl.length <= 1) {
            lastBtn.style.display = 'none';
            nextBtn.style.display = 'none';
            preview.style.display = 'none';
            photoName.style.display = 'none';
            hided = true;
        }

        let list = []; // 存储创建的li和img
        let index = 0;
        let count = sl.length; // 由于是异步请求，则需要等到请求结束后再添加单击信息

        // 请求图片
        for (let i = 0; i < sl.length; i++) {
            request({
                url: '../../getImage',
                method: 'POST',
                resType: 'blob',
                send: sl[i],
                result: function(res, status) {
                    let img = new Image();
                    img.src = window.URL.createObjectURL(res);
                    img.onload = function() {
                        // window.URL.revokeObjectURL(this.src);
                        // 将该图片添加到列表中
                        if (!hided) {
                            list.push({
                                li: null,
                                img: img,
                                order: i // 由于异步，所以要保证顺序
                            });
                        } else
                            list.push({
                                img: this
                            });
                        index++;
                        // 异步结束
                        if (index == count) {
                            // 代表全部加载完成
                            callback(list, hided);
                        }
                    };
                }
            });
        }
    }

    function lessCompare(a, b) {
        x = a.order;
        y = b.order;
        if (x < y) {
            return -1;
        } else if (x > y) {
            return 1;
        } else {
            return 0;
        }
    }

    getImage(function(list, hided) {
        let selectedIndex = 0; // 当前选中的图片
        // 由于异步加载图片的原因，进行一次排序
        list.sort(lessCompare);
        // 加载完后，将第一张显示到图片上
        if (list.length > 0) {
            photoBox.src = list[0].img.src;
        }

        if (hided)
            return;

        for (let i = 0; i < list.length; i++) {
            let li = document.createElement('li');
            li.setAttribute('class', 'preview-item');
            li.appendChild(list[i].img);
            list[i].li = li;
            previewList.appendChild(li);
        }


        // 设置图片名
        pname.innerText = '过程图2';

        // 第一个被选择，并且添加单击事件
        list[0].li.setAttribute('class', 'preview-item preview-item-selected');

        // 添加单击事件
        for (let i = 0; i < list.length; i++) {
            list[i].li.addEventListener('click', function() {
                photoBox.src = list[i].img.src;
                // 取消上一个选择的外观
                list[selectedIndex].li.setAttribute('class', 'preview-item');
                this.setAttribute('class', 'preview-item preview-item-selected');
                selectedIndex = i;
                // 设置图片名
                pname.innerText = '过程图' + (i + 2);
            });
        }

        // 设置上一个和下一个的按钮点击事件
        lastBtn.addEventListener('click', function() {
            list[selectedIndex].li.setAttribute('class', 'preview-item');
            if (selectedIndex > 0) {
                selectedIndex--;
            } else {
                selectedIndex = list.length - 1;
            }
            list[selectedIndex].li.setAttribute('class', 'preview-item preview-item-selected');
            photoBox.src = list[selectedIndex].img.src;
            // 设置图片名
            pname.innerText = '过程图' + (selectedIndex + 2);
        });
        nextBtn.addEventListener('click', function() {
            list[selectedIndex].li.setAttribute('class', 'preview-item');
            if (selectedIndex < list.length - 1) {
                selectedIndex++;
            } else {
                selectedIndex = 0;
            }
            list[selectedIndex].li.setAttribute('class', 'preview-item preview-item-selected');
            photoBox.src = list[selectedIndex].img.src;
            // 设置图片名
            pname.innerText = '过程图' + (selectedIndex + 2);
        });
    });
}());*/
