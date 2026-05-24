package io.github.hilalmerve.association.common.enums;

public enum UserRole {
    ADMIN,
    USER;

    public static UserRole from(String value) {
        return UserRole.valueOf(value.toUpperCase());
    }
}
