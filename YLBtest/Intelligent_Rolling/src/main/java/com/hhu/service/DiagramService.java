package com.hhu.service;

import com.hhu.model.Diagram;

import java.util.List;

public interface DiagramService {
    List<Integer> getTransZ();

    List<Diagram> getChosenDensity(int level);
}
