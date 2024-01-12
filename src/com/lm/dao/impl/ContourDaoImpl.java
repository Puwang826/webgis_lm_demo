package com.lm.dao.impl;

import com.lm.dao.ContourDao;
import com.lm.pojo.Contour;
import org.postgresql.util.PGobject;

import java.math.BigDecimal;
import java.util.List;

public class ContourDaoImpl extends BaseDao implements ContourDao {
    /**
     * @return
     */
    @Override
    public String getgeojson() {
        String sql = "SELECT row_to_json(fc) AS geojson " +
                "FROM (" +
                "    SELECT " +
                "        'FeatureCollection' AS type, " +
                "        array_to_json(array_agg(f)) AS features " +
                "    FROM (" +
                "        SELECT " +
                "            'Feature' AS type, " +
                "            ST_AsGeoJSON(geom)::json AS geometry, " +
                "            row_to_json((SELECT a FROM (SELECT ELEV) AS a)) AS properties " +
                "        FROM " +
                "            lushan_contour " +
                "    ) AS f " +
                ") AS fc;";

        Object result = queryForSingleValue(sql);
        if (result instanceof PGobject) {
            PGobject pgObject = (PGobject) result;
            // 获取数据库返回的 JSON 字符串
            String geoJson = pgObject.getValue();
            return geoJson;
        }
        return null; // 或者根据需要返回合适的值
    }

    /**
     * @return
     */
    @Override
    public BigDecimal queryelevByPointJson(String json){
        String sql = "SELECT CAST(elev AS NUMERIC) FROM lushan_contour ORDER BY geom <-> ST_GeomFromGeoJSON(?)::geometry LIMIT 1";
        return (BigDecimal)queryForSingleValue(sql,json);
    }

    /**
     * @return
     */
    @Override
    public List<Contour> queryContourByElev(BigDecimal elev) {
        String sql = "select gid, elev, ST_AsGeoJSON(geom) as json from lushan_contour where elev = ?";
        return queryForList(Contour.class, sql, elev);
    }
}
