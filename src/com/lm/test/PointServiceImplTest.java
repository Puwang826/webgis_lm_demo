package com.lm.test;

import com.lm.service.PointService;
import com.lm.service.impl.PointServiceImpl;
import org.junit.Test;

public class PointServiceImplTest {
    PointService pointService= new PointServiceImpl();;
    @Test
    public void addPoint() {
    }

    @Test
    public void exactQuery() {
        System.out.println(pointService.exactQuery(1));
    }

    @Test
    public void fuzzyQuery() {
        System.out.println(pointService.fuzzyQuery("五"));
    }

    @Test
    public void meaningsCount() {
        System.out.println(pointService.meaningsCount());
    }
}