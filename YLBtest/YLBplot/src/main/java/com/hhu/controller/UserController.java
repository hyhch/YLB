package com.hhu.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.hhu.annotation.LogAnnotation;
import com.hhu.dao.UserDao;
import com.hhu.model.Tablemap;
import com.hhu.model.User;
import com.hhu.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;

@Controller
@RequestMapping("/")
public class UserController {
    @Resource
    private UserService userService;

    @Autowired
    private UserDao userDao;

    /**
     *
     *
     * @param user
     * @param request
     * @return
     */
    @LogAnnotation(operateType = "用户登录")
    @ResponseBody
    @PostMapping("login")
    public int login(User user, HttpServletRequest request) {
        boolean loginType = userService.login(user.getUsername(), user.getPassword());
        //登陆成功
        if (loginType) {
            request.setAttribute("user", user);
            //创建session并把用户名和密码保存到session里
            HttpSession session = request.getSession();
            session.setAttribute("username", user.getUsername());
            session.setAttribute("password", user.getPassword());
            session.setAttribute("user", user);
            return 0;
        } else {
            return 1;
        }
    }

    /**
     * 宁海
     *
     * @param session
     * @return
     */
    @ResponseBody
    @RequestMapping("logout")
    public int logout(HttpSession session) {
        //清空session
        if (session != null) {
            session.invalidate();
        }
        return 0;
    }

    /**
     * 宁海
     *
     * @param request
     * @return
     */
    @ResponseBody
    @RequestMapping("checkLogin")
    public int check(HttpServletRequest request) {
        //得到session对象
        HttpSession session = request.getSession(false);
        if (session == null) {
            return 1;
        }
        String loginName = (String) session.getAttribute("username");
        //没有登陆成功（用户名为空），向前台返回2
        if (loginName == null) {
            return 2;
        }
        return 0;
    }

    /**
     * 宁海
     *
     * @param request
     * @return
     */
    @ResponseBody
    @RequestMapping("getLoginName")
    public String getLoginName(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        //这个为工号
        String loginName = (String) session.getAttribute("username");
        return loginName;
    }

    /**
     * 宁海
     *
     * @param request
     * @return
     */
    @ResponseBody
    @RequestMapping("getRealName")
    public String getRealName(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        //这个为工号
        String loginName = (String) session.getAttribute("username");
        //真实姓名
        String realName = userDao.getRealName(loginName);
        return realName;
    }

    /**
     * 宁海
     *
     * @param request
     * @return
     */
    @ResponseBody
    @RequestMapping("getLoginPassword")
    public String getLoginPassword(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        String loginPassword = (String) session.getAttribute("password");
        return loginPassword;
    }

    /**
     * 宁海
     *
     * @param request
     * @return
     */
    @LogAnnotation(operateType = "查询用户个人资料")
    @ResponseBody
    @RequestMapping("getUserInfo")
    public List<User> getUserInfo(HttpServletRequest request) {
//        String username = "";
//        username = request.getParameter("username");
//        return userService.getUserInfo(username);
        HttpSession session = request.getSession(false);
        String username = (String) session.getAttribute("username");
        return userService.getUserInfo(username);
    }

    /**
     * 用户管理表格
     * @param request
     * @return
     */
    @ResponseBody
    @RequestMapping("usersTableShow")
    public Tablemap<List<User>> usersTableShow(HttpServletRequest request){
        String pageNo = request.getParameter("page");
        String pageLimit = request.getParameter("limit");
//        int total = 1;
//        total = userService.usersTableShow().size();
        PageHelper.startPage(Integer.parseInt(pageNo), Integer.parseInt(pageLimit));
        List<User> all_info = userService.usersTableShow();
        PageInfo<User> pageInfo = new PageInfo<>(all_info);
//        List<User> back_json = BeanUtil.toPagedResult(all_info).getDataList();
//        if (total == 0){
//            back_json = new ArrayList<User>();
//        }
        return new Tablemap<List<User>>(0,"", (int) pageInfo.getTotal(),pageInfo.getList());
    }


    @ResponseBody
    @RequestMapping("getUserAuthority")
    public int getUserAuthority(HttpServletRequest request) {
        //得到session对象
        HttpSession session = request.getSession(false);
        User user = (User) session.getAttribute("user");
        return user.getAuthority();
    }


    /**
     * 宁海
     *
     * @param request
     * @return
     */
    @LogAnnotation(operateType = "修改密码")
    @ResponseBody
    @RequestMapping("update_password")
    public boolean update_password(HttpServletRequest request) {
        String username = "", password = "";
        username = request.getParameter("username");
        password = request.getParameter("password");
        userService.update_password(username, password);
        return true;
    }


    @LogAnnotation(operateType = "删除用户")
    @ResponseBody
    @RequestMapping("delete_user")
    public boolean deleteUser(HttpServletRequest request) {
        String id = "";
        id = request.getParameter("id");
        userService.delete_user(id);
        return true;
    }

    @LogAnnotation(operateType = "更新用户信息")
    @ResponseBody
    @RequestMapping("update_user")
    public boolean update_user(HttpServletRequest request) {
        String id = "", username = "", realname = "", password = "", note = "";
        id = request.getParameter("id");
        username = request.getParameter("username");
        realname = request.getParameter("realname");
        password = request.getParameter("password");
        note = request.getParameter("note");
        int authority = Integer.parseInt(request.getParameter("authority"));
        userService.update_user(id, username, realname, password,authority, note);
        return true;
    }

    @LogAnnotation(operateType = "新增用户")
    @ResponseBody
    @RequestMapping("insert_user")
    public boolean insert_user(HttpServletRequest request) {
        String username = "", realname = "", password = "", note = "";
        username = request.getParameter("username");
        realname = request.getParameter("realname");
        password = request.getParameter("password");
        note = request.getParameter("note");
        int authority = Integer.parseInt(request.getParameter("authority"));

        userService.insert_user(username, realname, password,authority, note);
        return true;
    }


}
