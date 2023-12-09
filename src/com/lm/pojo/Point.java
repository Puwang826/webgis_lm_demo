package com.lm.pojo;

public class Point {
    private Integer gid;
    private String name;
    private String json;
    private String meaning;

    public Integer getGid() {
        return gid;
    }

    public void setGid(Integer gid) {
        this.gid = gid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getJson() {
        return json;
    }

    public void setJson(String json) {
        this.json = json;
    }

    public String getMeaning() {
        return meaning;
    }

    public void setMeaning(String meaning) {
        this.meaning = meaning;
    }

    @Override
    public String toString() {
        return "Point{" +
                "gid=" + gid +
                ", name='" + name + '\'' +
                ", json='" + json + '\'' +
                ", meaning='" + meaning + '\'' +
                '}';
    }

    public Point() {
    }

    public Point(Integer gid, String name, String json, String meaning) {
        this.gid = gid;
        this.name = name;
        this.json = json;
        this.meaning = meaning;
    }

}
