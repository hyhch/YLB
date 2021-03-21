package com.hhu.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.hhu.dao.LogTableDao;
import com.hhu.model.LogTable;
import com.hhu.model.Tablemap;
import com.hhu.model.User;
import com.hhu.service.LogTableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Controller
@RequestMapping("/")

public class LogTableController {

    @Resource
    private LogTableService logTableService;

    @Autowired
    private LogTableDao logTableDao;

    /**
     *
     * @return
     */
    @ResponseBody
    @RequestMapping("getOperator")
    public List<User> getOperator() {
        return logTableDao.getOperator();
    }

    /**
     *
     * @param page
     * @param limit
     * @param request
     * @return
     */
    @ResponseBody
    @RequestMapping("logTable")
    public Tablemap<List<LogTable>> logTable(int page, int limit, HttpServletRequest request) {
//        int total;
//        String pageNo = request.getParameter("page");
//        String pageLimit = request.getParameter("limit");
        String operator = request.getParameter("operator");

        if (operator != "") {
            //PageHelper.startPage(Integer.parseInt(pageNo),Integer.parseInt(pageLimit));
            PageHelper.startPage(page, limit);
            List<LogTable> all_info = logTableService.logTable(operator);
            //total = all_info.size();

            //使用pageInfo
            PageInfo<LogTable> pageInfo = new PageInfo<>(all_info);

            //List<LogTable> back_json = BeanUtil.toPagedResult(all_info).getDataList();
//            if(total == 0){
//                back_json = new ArrayList<LogTable>();
//            }
            return new Tablemap<List<LogTable>>(0, "", (int) pageInfo.getTotal(), pageInfo.getList());
        } else {
            //PageHelper.startPage(Integer.parseInt(pageNo),Integer.parseInt(pageLimit));
            PageHelper.startPage(page, limit);
            List<LogTable> all_info = logTableService.logTable1();
            //total = all_info.size();
            PageInfo<LogTable> pageInfo = new PageInfo<>(all_info);
//            List<LogTable> back_json = BeanUtil.toPagedResult(all_info).getDataList();
//            if(total == 0){
//                back_json = new ArrayList<LogTable>();
//            }
//            return new Tablemap<List<LogTable>>(0,"",total,back_json);
            return new Tablemap<List<LogTable>>(0, "", (int) pageInfo.getTotal(), pageInfo.getList());
        }

    }

}
