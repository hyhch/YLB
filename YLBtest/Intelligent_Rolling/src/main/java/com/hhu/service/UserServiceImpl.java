package com.hhu.service;

import com.hhu.annotation.LogAnnotation;
import com.hhu.dao.UserDao;
import com.hhu.model.User;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;


@Service
public class UserServiceImpl implements UserService {
    @Resource
    private UserDao userDao;

    @LogAnnotation(operateType = "用户登录")
    @Override
    public boolean login(String username, String password){
        User user = userDao.selectUsername(username);
        if(user!=null){
            if(user.getUsername().equals(username)&&user.getPassword().equals(password)){
                return true;
            }
        }
        return false;
    }

    @LogAnnotation(operateType = "查询用户名")
    @Override
    public List<User> getUserInfo(String username) {
        return userDao.getUserInfo(username);
    }

    @Override
    public List<User> usersTableShow(){
        return userDao.usersTableShow();
    }


    @LogAnnotation(operateType = "修改密码")
    @Override
    public void update_password(String username, String password){
        userDao.update_password(username,password);
    }


    @Override
    public void delete_user(String id){
        userDao.delete_user(id);
    }

    @Override
    public void update_user(String id,String username,String realname,String password,int authority,String note){
        userDao.update_user(id, username, realname, password,authority, note);
    }

    @Override
    public void insert_user(String username,String realname,String password,int authority,String note){
        userDao.insert_user(username, realname, password,authority, note);
    }
}
