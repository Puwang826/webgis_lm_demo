package com.lm.dao;

import com.lm.pojo.Contour;

import java.math.BigDecimal;
import java.util.List;

public interface ContourDao {
    public String getgeojson();
    public List<Contour> queryContourByElev(BigDecimal elev);
    public BigDecimal queryelevByPointJson(String json);

}
