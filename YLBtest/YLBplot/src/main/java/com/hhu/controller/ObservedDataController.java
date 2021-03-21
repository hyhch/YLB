package com.hhu.controller;

import com.hhu.dao.ObservedDataDao;
//import com.hhu.dao.OriginalPhotoDao;
import com.hhu.model.ObservedData;
//import com.hhu.model.OriginalPhoto;
//import com.hhu.model.ProcessedPhoto;
import com.hhu.service.ObservedDataService;
//import com.hhu.service.OriginalPhotoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.List;

@Controller
@RequestMapping("/")
public class ObservedDataController {
    @Resource
    private ObservedDataService service;

    @Autowired
    private ObservedDataDao dao;

    @ResponseBody
    @RequestMapping("getObservedData")
    public List<ObservedData> getObservedData() {
        return service.select_ob_Data();
    }

}
