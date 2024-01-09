package com.lm.web;

import com.lm.pojo.Point;
import com.lm.service.PointService;
import com.lm.service.impl.PointServiceImpl;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class AddpointServlet extends HttpServlet {
    private PointService pointService = new PointServiceImpl();
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setCharacterEncoding("UTF-8");
        String name = req.getParameter("name");
        String meaning = req.getParameter("meaning");
        String lat = req.getParameter("lat");
        String lng = req.getParameter("lng");
        String json = "{\"type\":\"Point\",\"coordinates\":[" + lng + "," + lat + "]}";
        System.out.println(json);
        pointService.addPoint(new Point(null, name, json, meaning));

    }
}
