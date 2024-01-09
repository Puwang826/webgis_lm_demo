package com.lm.utils;

import com.alibaba.druid.pool.DruidDataSource;
import com.alibaba.druid.pool.DruidDataSourceFactory;

import java.io.InputStream;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Properties;

public class JdbcUtils {
        /*
        创建数据库连接池
         */
        private static DruidDataSource dataSource;

        static {


                try {
                        Properties properties = new Properties();
                        //读取属性配置文件
                        InputStream inputStream = JdbcUtils.class.getClassLoader().getResourceAsStream("jdbc.properties");
                        //从流中加载数据
                        properties.load(inputStream);
                        //创建数据库连接池
                        dataSource = (DruidDataSource) DruidDataSourceFactory.createDataSource(properties);
                } catch (Exception e) {
                        throw new RuntimeException(e);
                }
        }
        /*
        数据库连接
         */
        public static Connection getConnecction() {

                Connection conn = null;
                //crtl alt+t 快捷键trycatch

                try {
                        conn = dataSource.getConnection();
                } catch (SQLException e) {
                        throw new RuntimeException(e);
                }

                return conn;
        }
        /*
        关闭数据库
         */

        public static  void  close(Connection conn) {
                if(conn != null){
                        try {
                                conn.close();
                        } catch (SQLException e) {
                                throw new RuntimeException(e);
                        }
                }
        }

}
