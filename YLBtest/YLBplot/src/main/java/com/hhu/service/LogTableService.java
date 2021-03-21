package com.hhu.service;

import com.hhu.model.LogTable;

import java.sql.SQLException;
import java.util.List;

public interface LogTableService {
    /**
     * 增加日志
     *
     * @return
     * @throws SQLException
     * @Param log
     */
    void addLog(String operator, String operateType, String operateDate, String operateResult);

    /**
     * @param operator
     * @return
     */
    List<LogTable> logTable(String operator);

    /**
     * @return
     */
    List<LogTable> logTable1();


}
