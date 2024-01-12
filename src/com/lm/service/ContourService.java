package com.lm.service;

import com.lm.pojo.Point;

import java.math.BigDecimal;

public interface ContourService {
    public String ContourJson();
    public BigDecimal getPointElve(Point point);
    public BigDecimal getAnyElve(String json);

}
