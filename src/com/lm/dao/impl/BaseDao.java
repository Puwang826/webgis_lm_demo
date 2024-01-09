package com.lm.dao.impl;

import com.lm.utils.JdbcUtils;
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.BeanHandler;
import org.apache.commons.dbutils.handlers.BeanListHandler;
import org.apache.commons.dbutils.handlers.ColumnListHandler;
import org.apache.commons.dbutils.handlers.ScalarHandler;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

public abstract class BaseDao {
    //使用dbutils进行数据库操作
    private QueryRunner queryRunner = new QueryRunner();
    //object是可变参数
    //update方法用来 增删改
    public int update(String sql, Object ... args){
        Connection connection = JdbcUtils.getConnecction();
        try {
            queryRunner.update(connection,sql,args);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }finally {
            JdbcUtils.close(connection);
        }
        return -1;
    }
    //查询返回单个JavaBean
    public <T> T queryForOne(Class<T>type,String sql,Object ... args){
        Connection connnection = JdbcUtils.getConnecction();
        try {
            return queryRunner.query(connnection,sql,new BeanHandler<T>(type),args);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }finally {
            JdbcUtils.close(connnection);
        }
    }
    //查询返回多个JavaBean
    public <T> List<T> queryForList(Class<T>type, String sql, Object ... args){
        Connection connnection = JdbcUtils.getConnecction();
        try {
            return queryRunner.query(connnection,sql,new BeanListHandler<T>(type),args);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }finally {
            JdbcUtils.close(connnection);
        }
    }
    //查询返回单个特征
    public Object queryForSingleValue(String sql,Object ... args){
        Connection connection = JdbcUtils.getConnecction();
        try {
            return queryRunner.query(connection,sql,new ScalarHandler(),args);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }finally {
            JdbcUtils.close(connection);
        }
    }
    //查询返回多个特征
    public List<Object> queryForListValue(String sql, Object... args) {
        Connection connection = JdbcUtils.getConnecction();
        try {
            return queryRunner.query(connection, sql, new ColumnListHandler(1), args);
        } catch (Exception e) {
            throw new RuntimeException(e);
        } finally {
            JdbcUtils.close(connection);
        }
    }

}


