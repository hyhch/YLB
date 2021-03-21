package com.hhu.controller;

import com.hhu.model.Diagram;
import com.hhu.service.DiagramService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.List;

@Controller
@RequestMapping("/")
public class DiagramController {

    @Resource
    private DiagramService diagramService;

    /**
     * 返回等级
     *
     * @return
     */
    @ResponseBody
    @RequestMapping("getTransZ")
    public List<Integer> getTransZ() {
        return diagramService.getTransZ();
    }

    /**
     * 返回密度数组
     *
     * @param level
     * @return
     */
    @ResponseBody
    @RequestMapping("getChosenDensity")
    public List<Diagram> getChosenDensity(int level) {

        return diagramService.getChosenDensity(level);
    }
}

