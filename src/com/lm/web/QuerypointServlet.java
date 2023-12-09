package com.lm.web;

import com.google.gson.Gson;
import com.lm.service.PointService;
import com.lm.service.impl.PointServiceImpl;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


public class QuerypointServlet extends HttpServlet {
    private PointService pointService = new PointServiceImpl();
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // 设置 UTF-8字符集
        req.setCharacterEncoding("UTF-8");
        String name = req.getParameter("searchContent");

        // 将查询结果放入对象中
        Object queryResult = pointService.fuzzyQuery(name);

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
