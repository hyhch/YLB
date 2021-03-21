<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>硬梁包可视化施工管理平台</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <link rel="shortcut icon" href="views/assets/img/bitbug_favicon.icon" type="image/x-icon"/>
    <link rel="stylesheet" href="layuiadmin/layui/css/layui.css" media="all">
    <link rel="stylesheet" href="layuiadmin/style/admin.css" media="all">
    <link rel="stylesheet" href="layuiadmin/style/login.css" media="all">
    <link rel="stylesheet" href="views/assets/css/jh.css" media="all">
</head>
<body class="layui-layout-body">
<div class="LAY-app">
    <div class="layui-layout layui-layout-admin">
        <!-- 头部区域 -->
        <div class="layui-header">
            <ul class="layui-nav layui-layout-left">
                <li class="layui-nav-item layadmin-flexible" lay-unselect>
                    <a href="javascript:;" layadmin-event="flexible" title="侧边伸缩">
                        <i class="layui-icon layui-icon-shrink-right" id="LAY_app_flexible"></i>
                    </a>
                </li>
                <li class="layui-nav-item" lay-unselect>
                    <a href="javascript:" layadmin-event="refresh" title="刷新">
                        <i class="layui-icon layui-icon-refresh-3"></i>
                    </a>
                </li>
                <li class="layui-nav-item" lay-unselect>
                    <a href="javascript:" layadmin-event="refresh" class="jhtitle">
                        硬梁包可视化施工管理平台
                    </a>
                </li>
            </ul>
            <ul class="layui-nav layui-layout-right" lay-filter="layadmin-layout-right">
                <li class="layui-nav-item layui-hide-xs" lay-unselect>
                    <a href="javascript:" layadmin-event="theme">
                        <i class="layui-icon layui-icon-theme"></i>
                    </a>
                </li>
                <li class="layui-nav-item layui-hide-xs" lay-unselect>
                    <a href="javascript:" layadmin-event="note">
                        <i class="layui-icon layui-icon-note"></i>
                    </a>
                </li>
                <li class="layui-nav-item layui-hide-xs" lay-unselect>
                    <a href="javascript:" layadmin-event="fullscreen">
                        <i class="layui-icon layui-icon-screen-full"></i>
                    </a>
                </li>
                <li class="layui-nav-item" lay-unselect>
                    <a href="javascript:">
                        <cite id="user" style="text-align: center">河海大学</cite>
                    </a>
                    <dl class="layui-nav-child">
                        <dd><a lay-href="views/user/info.html">基本资料</a></dd>
                        <dd><a lay-href="views/user/password.html">修改密码</a></dd>
                        <hr>
                        <dd style="text-align: center;"><a onclick="LogoutF()">退出</a></dd>
                    </dl>
                </li>
                <li class="layui-nav-item" lay-unselect>
                    <a href="javascript:" id="date"></a>
                </li>
            </ul>
        </div>

        <!-- 侧边菜单 -->
        <div class="layui-side layui-side-menu">
            <div class="layui-side-scroll">
                <div class="layui-logo" lay-href="homePage">
                    <span style="font-size: large;">硬梁包可视化施工管理平台</span>
                </div>
                <ul class="layui-nav layui-nav-tree" lay-shrink="all" id="LAY-system-side-menu" lay-filter="layadmin-system-side-menu">

                    <li data-name="packing_data" class="layui-nav-item layui-nav-itemed" >
                        <a lay-href="views/packing_data_page/packing_data_page.html" lay-tips="填料数据" lay-direction="2" >
                            <i class="layui-icon layui-icon-home"></i>
                            <cite>填料数据</cite>
                        </a>
                    </li>
       <%--             <li data-name="photo" class="layui-nav-item">
                        <a href="javascript:" lay-tips="照片导出" lay-direction="2" lay-href="views/photoExport/photoExport.html">
                            <i class="layui-icon layui-icon-engine"></i>
                            <cite>照片导出</cite>
                        </a>
                    </li>--%>

     <%--               <li data-name="dataList" class="layui-nav-item">
                        <a href="javascript:" lay-tips="数据状况" lay-direction="2">
                            <i class="layui-icon layui-icon-console"></i>
                            <cite>数据状况</cite>
                            <span class="layui-nav-more"></span>
                        </a>
                        <dl class="layui-nav-child">
                            <dd><a href="javascript:;" lay-href="views/dataStatus/observed_data.html">原始数据</a></dd>
                        </dl>
                        <dl class="layui-nav-child">
                            <dd><a href="javascript:;" lay-href="views/dataStatus/processed_data.html">处理数据</a></dd>
                        </dl>
                    </li>--%>
                    <li data-name="observed_data" class="layui-nav-item">
                        <a href="javascript:" lay-tips="观测数据" lay-direction="2" lay-href="views/dataStatus/observed_data.html">
                            <i class="layui-icon layui-icon-engine"></i>
                            <cite>观测数据</cite>
                        </a>
                    </li>

                   <li data-name="water_pressure_data" class="layui-nav-item">
                        <a href="javascript:" lay-tips="水压数据" lay-direction="2" lay-href="views/dataStatus/water_pressure_data.html">
                            <i class="layui-icon layui-icon-engine"></i>
                            <cite>水压数据</cite>
                        </a>
                    </li>

                    <li data-name="acceleration_data" class="layui-nav-item">
                        <a href="javascript:" lay-tips="加速度数据" lay-direction="2" lay-href="views/dataStatus/acceleration_data.html">
                            <i class="layui-icon layui-icon-engine"></i>
                            <cite>加速度数据</cite>
                        </a>
                    </li>

                  <%--  <li data-name="density" class="layui-nav-item">
                        <a href="javascript:" lay-tips="密实度云图" lay-direction="2" lay-href="views/compactness/diagram.html">
                            <i class="layui-icon layui-icon-chart-screen"></i>
                            <cite>密实度云图</cite>
                        </a>
                    </li>

                    <li data-name="warning" class="layui-nav-item">
                        <a href="javascript:" lay-tips="预警条件" lay-direction="2" lay-href="views/warning/condition.html">
                            <i class="layui-icon layui-icon-form"></i>
                            <cite>预警条件</cite>
                        </a>
                    </li>

                    <li data-name="log" class="layui-nav-item">
                        <a href="javascript:" lay-tips="日志管理" lay-direction="2" lay-href="views/logManagement/logManagement.html">
                            <i class="layui-icon layui-icon-survey"></i>
                            <cite>日志管理</cite>
                        </a>
                    </li>--%>

          <%--          <li data-name="user" id="user_manage" class="layui-nav-item layui-nav-itemed">
                        <a href="javascript:" lay-tips="用户权限" lay-direction="2" lay-href="views/user/userManagement.html">
                            <i class="layui-icon layui-icon-user"></i>
                            <cite>用户管理</cite>
                        </a>
                    </li>--%>

                </ul>
            </div>
        </div>

        <!-- 页面标签 -->
        <div class="layadmin-pagetabs" id="LAY_app_tabs">
            <div class="layui-icon layadmin-tabs-control layui-icon-prev" layadmin-event="leftPage"></div>
            <div class="layui-icon layadmin-tabs-control layui-icon-next" layadmin-event="rightPage"></div>
            <div class="layui-icon layadmin-tabs-control layui-icon-down">
                <ul class="layui-nav layadmin-tabs-select" lay-filter="layadmin-pagetabs-nav">
                    <li class="layui-nav-item" lay-unselect>
                        <a href="javascript:"></a>
                        <dl class="layui-nav-child layui-anim-fadein">
                            <dd layadmin-event="closeThisTabs"><a href="javascript:">关闭当前标签页</a></dd>
                            <dd layadmin-event="closeOtherTabs"><a href="javascript:">关闭其它标签页</a></dd>
                            <dd layadmin-event="closeAllTabs"><a href="javascript:">关闭全部标签页</a></dd>
                        </dl>
                    </li>
                </ul>
            </div>
            <div class="layui-tab" lay-unauto lay-allowClose="true" lay-filter="layadmin-layout-tabs">
                <ul class="layui-tab-title" id="LAY_app_tabsheader">
                    <li lay-id="homePage" lay-attr="homePage" class="layui-this">
                        <i class="layui-icon layui-icon-home"></i></li>
                </ul>
            </div>
        </div>

        <!-- 主体内容 -->
        <div class="layui-body" id="LAY_app_body">
            <div class="layadmin-tabsbody-item layui-show">
                <iframe src="views/homepage/home_page.html" name="main-content" frameborder="0" class="layadmin-iframe"></iframe>
            </div>
        </div>

        <!-- 辅助元素，一般用于移动设备下遮罩 -->
        <div class="layadmin-body-shade" layadmin-event="shade"></div>
    </div>
</div>

<script src="layuiadmin/layui/layui.js"></script>
<%--<script src="views/assets/js/index.js"></script>--%>
<script src="views/user/index.js"></script>
</body>


