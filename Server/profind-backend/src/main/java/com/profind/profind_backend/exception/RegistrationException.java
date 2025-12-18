package com.profind.profind_backend.exception;

public class RegistrationException extends RuntimeException {
    private final String errorCode;

    public RegistrationException(String errorCode, String message) {
        super(message);
        this.errorCode = errorCode;
    }

    public String getErrorCode() {
        return errorCode;
    }
}
