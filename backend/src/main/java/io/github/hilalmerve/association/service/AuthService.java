package io.github.hilalmerve.association.service;

import io.github.hilalmerve.association.dto.request.LoginRequest;
import io.github.hilalmerve.association.entity.User;
import io.github.hilalmerve.association.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public String login(LoginRequest req) {

        User user = userRepository.findByUsername(req.username())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(req.password(), user.getPassword())) {
            throw new RuntimeException("Wrong password");
        }

        return jwtService.generateToken(user);
    }
}
