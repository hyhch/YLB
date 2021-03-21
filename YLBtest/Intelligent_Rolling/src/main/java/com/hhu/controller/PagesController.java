package com.hhu.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class PagesController {

    @RequestMapping({"index", ""})
    public String demo() {
        return "index";
    }

}
