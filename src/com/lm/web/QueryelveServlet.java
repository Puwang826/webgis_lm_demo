package com.lm.web;

import com.google.gson.Gson;
import com.lm.service.ContourService;
import com.lm.service.impl.ContourServiceImpl;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.math.BigDecimal;

public class QueryelveServlet extends HttpServlet {
    private ContourService contourService = new ContourServiceImpl();
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setCharacterEncoding("UTF-8");
        String lat = req.getParameter("lat");
        String lng = req.getParameter("lng");
        String json = "{\"type\":\"Point\",\"coordinates\":[" + lng + "," + lat + "]}";
        BigDecimal queryResult = contourService.getAnyElve(json);
        // 使用 Gson 库将对象转换为 JSON 字符串
        Gson gson = new Gson();
        String jsonResult = gson.toJson(queryResult);
        // 设置返回值为 UTF-8
        resp.setCharacterEncoding("UTF-8");
        // 将 JSON 响应写回到前端
        resp.setContentType("application/json");
        resp.getWriter().write(jsonResult);
    }
}
