package com.library.model;

public class User {
    private String name;
    private boolean isPremium;

    public User(String name) {this(name, false);}
    public User(String name, boolean isPremium) {
        this.name = name;
        this.isPremium = isPremium;
    }

    public String getName() {return name;}
    public boolean isPremium() {return isPremium;}
    public void setName(String name) {this.name = name;}
    public void setPremium(boolean premium) {this.isPremium = premium;}

    @Override
    public String toString() {
        return "User{name='" + name + "', premium=" + isPremium + "}";
    }
}