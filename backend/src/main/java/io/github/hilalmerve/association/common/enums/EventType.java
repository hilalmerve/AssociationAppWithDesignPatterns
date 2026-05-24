package io.github.hilalmerve.association.common.enums;

public enum EventType {
    NEWS,
    ANNOUNCEMENT;

    public static EventType from(String value) {
        return EventType.valueOf(value.toUpperCase());
    }
}
