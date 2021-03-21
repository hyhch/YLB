package com.hhu.controller;

import com.hhu.dao.AccelerationDataDao;
import com.hhu.model.AccelerationData;
import com.hhu.service.AccelerationDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.List;

@Controller
@RequestMapping("/")
public class AccelerationDataController {
    @Resource
    private AccelerationDataService service;

    @Autowired
    private AccelerationDataDao dao;

    @ResponseBody
    @RequestMapping("getAccelerationData")
    public List<AccelerationData> getAccelerationData() {
        return service.select_ac_Data();
    }

   /* @ResponseBody
    @RequestMapping("getProcessedData")
    public List<ProcessedPhoto> getProcessedData() {
        return service.selectProcessedData();
    }

    @ResponseBody
    @RequestMapping("getImage")
    public byte[] getImage(HttpServletRequest request) {
        try {
            return service.getImage(request.getParameter("image"));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return  null;
    }*/
}
