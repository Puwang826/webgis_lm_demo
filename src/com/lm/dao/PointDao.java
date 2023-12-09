package com.lm.dao;

import com.lm.pojo.Point;

import java.util.List;

public interface PointDao {
    public List<Point> queryPointByName(String name);
    public int savePoint(Point point);
    public Point queryPointByGid(int id);
    public Object countPointsByMeaning(Object meaning);
    public List<Object> getallMeaning();
}

