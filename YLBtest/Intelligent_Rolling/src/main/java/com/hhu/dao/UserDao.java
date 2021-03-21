package com.hhu.dao;

import com.hhu.model.*;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface UserDao {
    User selectUsername(@Param(value = "username") String username);

    List<User> getUserInfo(@Param(value = "username") String username);

    void update_password(@Param(value = "username") String username, @Param(value = "password") String password);

    List<User> usersTableShow();

    void delete_user(@Param(value = "id") String id);

    void update_user(@Param(value = "id") String id,
                     @Param(value = "username") String username,
                     @Param(value = "realname") String realname,
                     @Param(value = "password") String password,
                     @Param(value = "authority") int authority,
                     @Param(value = "note") String note);

    void insert_user(@Param(value = "username") String username,
                     @Param(value = "realname") String realname,
                     @Param(value = "password") String password,
                     @Param(value = "authority") int authority,
                     @Param(value = "note") String note);

    String getRealName(String loginName);
}
