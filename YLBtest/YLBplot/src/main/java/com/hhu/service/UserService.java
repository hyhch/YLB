package com.hhu.service;

import com.hhu.model.User;

import java.util.List;

public interface UserService {
    boolean login(String username, String password);

    List<User> getUserInfo(String username);

    void update_password(String username, String password);

    List<User> usersTableShow();

    void delete_user(String id);

    void update_user(String id, String username, String realname, String password,int authority, String note);

    void insert_user(String username, String realname, String password,int authority, String note);
}
