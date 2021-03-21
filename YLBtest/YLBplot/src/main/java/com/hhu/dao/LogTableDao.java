package com.hhu.dao;

import com.hhu.model.LogTable;
import com.hhu.model.User;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface LogTableDao {

    /**
     *
     * @param operator
     * @param operateType
     * @param operateDate
     * @param operateResult
     */
    void addLog(@Param(value = "operator")String operator, @Param(value = "operateType")String operateType, @Param(value = "operateDate") String operateDate, @Param(value = "operateResult") String operateResult);

    /**
     *
     * @return
     */
    List<User>getOperator();

    /**
     *
     * @param operator
     * @return
     */
    List<LogTable> logTable(@Param(value = "operator")String operator);

    /**
     *
     * @return
     */
    List<LogTable> logTable1();

}
