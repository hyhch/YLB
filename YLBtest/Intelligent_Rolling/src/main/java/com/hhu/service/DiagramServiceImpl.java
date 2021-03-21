package com.hhu.service;

import com.hhu.dao.DiagramDao;
import com.hhu.model.Diagram;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DiagramServiceImpl implements DiagramService {
    @Autowired
    private DiagramDao diagramDao;

    @Override
    public List<Integer> getTransZ() {
        return diagramDao.getTransZ();
    }

    @Override
    public List<Diagram> getChosenDensity(int level) {
        return diagramDao.getChosenDensity(level);
    }
}
