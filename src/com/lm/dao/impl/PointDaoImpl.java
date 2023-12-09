package com.lm.dao.impl;

import com.lm.dao.PointDao;
import com.lm.pojo.Point;

import java.util.List;


//继承BaseDao，实现PointDao中的方法
public class PointDaoImpl extends BaseDao implements PointDao {

    /**
     * @param name
     * @return
     */
    @Override
    public List<Point> queryPointByName(String name) {
        String sql = "select gid, name, ST_AsGeoJSON(geom) as json, meaning from sx_point where name LIKE ?";
        String likeParameter = "%" + name + "%";
        return queryForList(Point.class, sql, likeParameter);
    }


    /**
     * @param point
     * @return
     */
    @Override
    public int savePoint(Point point) {
        String sql = "insert into sx_point(name, geom, meaning) values (?, ST_GeomFromGeoJSON(?), ?)";
        return update(sql, point.getName(), point.getJson(), point.getMeaning());
    }

    /**
     * @param id
     * @return
     */

    @Override
    public Point queryPointByGid(int id) {
        String sql = "select gid, name, ST_AsGeoJSON(geom) as json, meaning from sx_point where gid = ?";
        return queryForOne(Point.class, sql, id);
    }

    public Object countPointsByMeaning(Object meaning) {
        String sql = "SELECT COUNT(*) FROM sx_point WHERE meaning = ?";
        return queryForSingleValue(sql, meaning);
    }

    @Override
    public List<Object> getallMeaning() {
        String sql = "SELECT DISTINCT meaning FROM sx_point";
        return queryForListValue(sql,null);
    }

}
