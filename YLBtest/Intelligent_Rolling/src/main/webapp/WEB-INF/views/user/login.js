layui.use(['form', 'layer'],function () {
    var $ = layui.$
        ,form = layui.form
        ,layer = layui.layer;

    showPsd();
    hidePsd();

    form.render();

    form.on('submit(LAY-user-login)',function (data) {
        console.log(data);
        var field = data.field;
        var username = field.username;
        if(username==""){
            layer.msg("用户名不能为空！");
        }
        //由于显示/隐藏密码的工作原理，此时存在两个密码invisible和visible，为了方便后续操作，将visible的值赋给password（极端情况不考虑）
        var invisible = field.password_invisible;
        var visible = field.password_visible;
        var password = "";
        if(invisible==""&&visible==""){
            layer.msg("密码不能为空！");
        }
        else{
            if(visible==""){
                visible = invisible;
            }
            password = visible;
        }
        console.log(password);
        $.ajax({
            url:"../../login",
            type:"post",
            data:{
                'username': username
                ,'password': password
            },
            success:function (data) {
                console.log(data);
                console.log(username);
                if(data==0){
                    layer.msg("登录成功");
                    window.location.href = "../../";
                }
                else{
                    layer.msg("登录失败，用户名或密码错误");
                    setTimeout(function () { location.reload() }, 1200);
                }
            }
        })


    });
});
//对应html中密码显示/不显示部分
//当点击眼睛图标时有两件事：1、切换两个标签的显示状态；2、将当前显示状态input框中的值赋给当前隐藏状态input框
var visible = document.getElementById('psd_visible');
var invisible = document.getElementById('psd_invisible');
var inputVisible = document.getElementById('password_visible');
var inputInvisible = document.getElementById("password_invisible");
function showPsd() {
    var val = inputInvisible.value;
    inputVisible.value = val;
    invisible.style.display = "none";
    visible.style.display = "";
}
function hidePsd() {
    var val = inputVisible.value;
    inputInvisible.value = val;
    invisible.style.display = "";
    visible.style.display = "none";
}



