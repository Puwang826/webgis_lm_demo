package com.lm.service.impl;

import com.google.gson.Gson;
import com.lm.dao.ContourDao;
import com.lm.dao.impl.ContourDaoImpl;
import com.lm.pojo.Point;
import com.lm.service.ContourService;

import java.math.BigDecimal;

public class ContourServiceImpl implements ContourService {
    private ContourDao contourDao = new ContourDaoImpl();

    /**
     *
     * @return
     */
    @Override
    public String ContourJson() {
        String Countourjson = contourDao.getgeojson();
        Gson gson = new Gson();
        return gson.toJson(Countourjson);
    }

    /**
     * @param point
     * @return
     */

    @Override
    public BigDecimal getPointElve(Point point) {
        return contourDao.queryelevByPointJson(point.getJson());
    }

    /**
     * @param json
     * @return
     */

    @Override
    public BigDecimal getAnyElve(String json) {
        return contourDao.queryelevByPointJson(json);
    }
}
