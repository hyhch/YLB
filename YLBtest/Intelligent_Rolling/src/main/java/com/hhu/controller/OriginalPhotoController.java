package com.hhu.controller;

import com.hhu.dao.OriginalPhotoDao;
import com.hhu.model.OriginalPhoto;
import com.hhu.model.ProcessedPhoto;
import com.hhu.service.OriginalPhotoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;

@Controller
@RequestMapping("/")
public class OriginalPhotoController {
    @Resource
    private OriginalPhotoService service;

    @Autowired
    private OriginalPhotoDao dao;

    @ResponseBody
    @RequestMapping("getOriginalData")
    public List<OriginalPhoto> getOriginalData() {
        return service.selectData();
    }

    @ResponseBody
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
    }
}

