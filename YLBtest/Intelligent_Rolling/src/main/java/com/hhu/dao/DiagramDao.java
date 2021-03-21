package com.hhu.dao;

import com.hhu.model.Diagram;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DiagramDao {
    List<Integer> getTransZ();

    List<Diagram> getChosenDensity(@Param("level") int level);
}
