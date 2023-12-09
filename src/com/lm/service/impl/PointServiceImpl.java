package com.lm.service.impl;

import com.lm.dao.PointDao;
import com.lm.dao.impl.PointDaoImpl;
import com.lm.pojo.Point;
import com.lm.service.PointService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class PointServiceImpl implements PointService {

    private PointDao pointDao = new PointDaoImpl();

    /**
     * @param point
     */
    @Override
    public void addPoint(Point point) {
        pointDao.savePoint(point);
    }

    /**
     * @param id
     * @return
     */
    @Override
    public Point exactQuery(int id) {
        return pointDao.queryPointByGid(id);
    }

    /**
     * @param name
     * @return
     */
    @Override
    public List<Point> fuzzyQuery(String name) {
        return pointDao.queryPointByName(name);
    }

    /**
     * @return
     */
    @Override
    public Map<String, Object> meaningsCount() {
        Map<String, Object> meaningCountMap = new HashMap<>();
        List<Object> allMeanings = pointDao.getallMeaning();

        for (Object meaning : allMeanings) {
            Object count = pointDao.countPointsByMeaning(meaning.toString());
            meaningCountMap.put(meaning.toString(), count);
        }

        return meaningCountMap;
    }


}
