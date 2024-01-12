package com.lm.test;

import com.lm.dao.ContourDao;
import com.lm.dao.impl.ContourDaoImpl;
import org.junit.Test;

import java.math.BigDecimal;

public class ContourDaoImplTest {
    ContourDao contourDao = new ContourDaoImpl();
    @Test
    public void getgeojson() {
        System.out.println(contourDao.getgeojson());
    }

    @Test
    public void queryelevByPointJson() {
        System.out.println(contourDao.queryelevByPointJson("{\"type\":\"Point\",\"coordinates\":[116.044124,29.55522]}', meaning='流水地貌'}"));
    }

    @Test
    public void queryContourByElev() {
        System.out.println(contourDao.queryContourByElev(BigDecimal.valueOf(20.0)));
    }
}