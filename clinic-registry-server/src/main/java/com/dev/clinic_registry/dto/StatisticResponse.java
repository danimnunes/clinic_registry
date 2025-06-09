package com.dev.clinic_registry.dto;

public class StatisticResponse {
    private String label;
    private int value;

    public StatisticResponse(String label, int value) {
        this.label = label;
        this.value = value;
    }

    public String getLabel() {
        return label;
    }

    public int getValue() {
        return value;
    }
}

