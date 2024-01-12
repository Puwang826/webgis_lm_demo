package com.lm.web;

import com.lm.service.ContourService;
import com.lm.service.impl.ContourServiceImpl;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class ContourjsonServlet extends HttpServlet {
    private ContourService contourService = new ContourServiceImpl();
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse resp) throws IOException {
        resp.setCharacterEncoding("UTF-8");
        // 将 JSON 响应写回到前端
        resp.setContentType("application/json");
        resp.getWriter().write(contourService.ContourJson());

    }
}