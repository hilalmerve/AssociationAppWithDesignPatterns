package io.github.hilalmerve.association.controller;

import io.github.hilalmerve.association.dto.request.LoginRequest;
import io.github.hilalmerve.association.dto.response.TokenResponse;
import io.github.hilalmerve.association.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<TokenResponse> login(@RequestBody LoginRequest req) {

        String jwt = authService.login(req);

        return ResponseEntity.ok(new TokenResponse(jwt));
    }
}
