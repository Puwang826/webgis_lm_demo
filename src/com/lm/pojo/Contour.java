package com.lm.pojo;

import java.math.BigDecimal;

public class Contour {
    private Integer gid;
    private BigDecimal elev;
    private String json;
    public Contour() {

    }

    public Contour(Integer gid, BigDecimal elev, String json) {
        this.gid = gid;
        this.elev = elev;
        this.json = json;
    }

    @Override
    public String toString() {
        return "Contour{" +
                "gid=" + gid +
                ", elev=" + elev +
                ", json='" + json + '\'' +
                '}';
    }

    public Integer getGid() {
        return gid;
    }

    public void setGid(Integer gid) {
        this.gid = gid;
    }

    public BigDecimal getElev() {
        return elev;
    }

    public void setElev(BigDecimal elev) {
        this.elev = elev;
    }

    public String getJson() {
        return json;
    }

    public void setJson(String json) {
        this.json = json;
    }
}
