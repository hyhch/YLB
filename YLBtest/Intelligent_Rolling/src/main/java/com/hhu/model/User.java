package com.hhu.model;

public class User {
    private String id;
    private String username;
    private String password;
    private String realname;
    private String note;
    private int authority;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRealname() {
        return realname;
    }

    public void setRealname(String realname) {
        this.realname = realname;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public int getAuthority() {
        return authority;
    }

    public void setAuthority(int authority) {
        this.authority = authority;
    }

    public User(String id, String username, String password, String realname, String note, int authority) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.realname = realname;
        this.note = note;
        this.authority = authority;
    }

    public User() {
    }
}
