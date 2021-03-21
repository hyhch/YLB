package com.hhu.service;

import com.hhu.dao.LogTableDao;
import com.hhu.model.LogTable;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;


@Service
public class LogTableServiceImpl implements LogTableService {
    @Resource
    private LogTableDao logTableDao;

    /**
     * @param operator
     * @param operateType
     * @param operateDate
     * @param operateResult
     */
    @Override
    public void addLog(String operator, String operateType, String operateDate, String operateResult) {
        //如果操作人为空，则将其置为“未登录用户”
        if (operator == null) {
            operator = "未登录用户";
        }
        logTableDao.addLog(operator, operateType, operateDate, operateResult);
    }

    /**
     * @param operator
     * @return
     */
    @Override
    public List<LogTable> logTable(String operator) {
        return logTableDao.logTable(operator);
    }

    /**
     * @return
     */
    @Override
    public List<LogTable> logTable1() {
        return logTableDao.logTable1();
    }


}
