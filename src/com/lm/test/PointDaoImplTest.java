package com.lm.test;

import com.lm.dao.PointDao;
import com.lm.dao.impl.PointDaoImpl;
import com.lm.pojo.Point;
import org.junit.Test;

public class PointDaoImplTest {
    PointDao pointDao = new PointDaoImpl();
    @Test
    public void queryPointByName() {

        System.out.println(pointDao.queryPointByName("三"));
    }

    @Test
    public void savePoint() {
        System.out.println(pointDao.savePoint(new Point(3,"三叠泉", "{\"type\":\"Point\",\"coordinates\":[116.044124,29.555220]}",null)));
    }

    @Test
    public void queryPointByGid() {
        System.out.println(pointDao.queryPointByGid(1));
    }

    @Test
    public void countPointsByMeaning() {
        System.out.println(pointDao.countPointsByMeaning("构造地貌"));
    }
    @Test
    public void getallMeaning(){
        System.out.println(pointDao.getallMeaning());
    }
}