package com.hhu.controller;

import com.hhu.dao.WaterPressureDataDao;
import com.hhu.model.WaterPressureData;
import com.hhu.service.WaterPressureDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.List;

@Controller
@RequestMapping("/")
public class WaterPressureDataController {
    @Resource
    private WaterPressureDataService service;

    @Autowired
    private WaterPressureDataDao dao;

    @ResponseBody
    @RequestMapping("getWaterPressureData")
    public List<WaterPressureData> getWaterPressureData() {
        return service.select_wt_Data();
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
