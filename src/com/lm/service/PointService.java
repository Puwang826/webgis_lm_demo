package com.lm.service;

import com.lm.pojo.Point;

import java.util.List;
import java.util.Map;

public interface PointService {
    public void addPoint(Point point);
    public Point exactQuery(int id);
    public List<Point> fuzzyQuery(String name);
    public Map<String, Object> meaningsCount();

}
