package com.lm.test;

import com.lm.utils.JdbcUtils;
import org.junit.Test;

public class JdbcUtilsTset {
    @Test
    public void testjdbcUtils(){
        System.out.println(JdbcUtils.getConnecction());
    }
}
