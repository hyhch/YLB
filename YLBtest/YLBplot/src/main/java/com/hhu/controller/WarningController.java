package com.hhu.controller;

import com.hhu.model.GranularWarning;
import com.hhu.service.WarningService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @author ：jin
 * @description:
 * @date ：Created in 2021/2/4 20:10
 */
@Controller
@RequestMapping("/")
public class WarningController {

    @Autowired
    private WarningService warningService;

    /**
     * 返回级配预警条件
     * @return
     */
    @ResponseBody
    @RequestMapping("/getGranularWarning")
    public GranularWarning getGranularWarning(){
        return warningService.getGranularWarning();
    }

    /**
     * 更新级配预警条件
     * @return
     */
    @ResponseBody
    @RequestMapping("/updateGranularWarning")
    public int updateGranularWarning(Long newVal_x,Long newVal_y_min,Long newVal_y_max){
        return warningService.updateGranularWarning(newVal_x,newVal_y_min,newVal_y_max);
    }

    /**
     * 返回密度预警条件
     * @return
     */
    @ResponseBody
    @RequestMapping("/getDensityWarning")
    public Long getDensityWarning(){
        return warningService.getDensityWarning();
    }

    /**
     * 更新密度预警条件
     * @return
     */
    @ResponseBody
    @RequestMapping("/updateDensityWarning")
    public int updateDensityWarning(Long newVal){
        return warningService.updateDensityWarning(newVal);
    }
}
