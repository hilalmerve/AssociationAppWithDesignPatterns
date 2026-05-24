package io.github.hilalmerve.association.config;

import io.github.hilalmerve.association.service.JwtService;
import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    private final JwtService jwtService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String path = request.getRequestURI();

        // 🔥 AUTH ENDPOINT SKIP
        if (path.startsWith("/api/auth")) {
            filterChain.doFilter(request, response);
            return;
        }

        if (request.getRequestURI().contains("/api/auth/login")) {
            filterChain.doFilter(request, response);
            return;
        }

        String authHeader = request.getHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {

            String token = authHeader.substring(7);

            if (jwtService.isTokenValid(token)) {

                Claims claims = jwtService.extractClaims(token);

                String username = claims.getSubject();
                String role = claims.get("role", String.class);

                UsernamePasswordAuthenticationToken auth =
                        new UsernamePasswordAuthenticationToken(
                                username,
                                null,
                                List.of(new SimpleGrantedAuthority("ROLE_" + role))
                        );

                SecurityContextHolder.getContext().setAuthentication(auth);
            }
        }

        filterChain.doFilter(request, response);
    }

    /*@Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        String path = request.getRequestURI();

        if (path.startsWith("/api/auth")) {
            filterChain.doFilter(request, response);
            return;
        }

        if (authHeader != null && authHeader.startsWith("Bearer ")) {

            String token = authHeader.substring(7);

            // 🔥 VALIDATE ET
            if (jwtService.isTokenValid(token)) {

                Claims claims = jwtService.extractClaims(token);

                String username = claims.getSubject();
                String role = claims.get("role", String.class);

                // 🔥 Spring Security context'e user koy
                UsernamePasswordAuthenticationToken auth =
                        new UsernamePasswordAuthenticationToken(
                                username,
                                null,
                                List.of(new SimpleGrantedAuthority("ROLE_" + role))
                        );

                SecurityContextHolder.getContext().setAuthentication(auth);
            }
        }

        filterChain.doFilter(request, response);
    }*/

//    @Override
//    protected void doFilterInternal(HttpServletRequest request,
//                                    HttpServletResponse response,
//                                    FilterChain filterChain)
//            throws ServletException, IOException {
//
//        // 🔥 1. SECURITY CONTEXT TEMİZLE
//        SecurityContextHolder.clearContext();
//
//        String path = request.getRequestURI();
//
//// 1. public endpointler
//        if (path.startsWith("/api/auth")
//                || path.startsWith("/uploads")
//                || path.startsWith("/images")
//                || path.startsWith("/ws")
//                || path.matches(".*\\.(png|jpg|jpeg|svg)$")) {
//            filterChain.doFilter(request, response);
//            return;
//        }
//
//// 2. token yoksa çık
//        String authHeader = request.getHeader("Authorization");
//        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
//            filterChain.doFilter(request, response);
//            return;
//        }
//
//        String token = authHeader.substring(7);
//
//        // 🔥 4. TOKEN GEÇERSİZSE ÇIK
//        if (!jwtService.isTokenValid(token)) {
//            filterChain.doFilter(request, response);
//            return;
//        }
//
//        // 🔥 5. CLAIMS OKU
//        Claims claims = jwtService.extractClaims(token);
//
//        String username = claims.getSubject();
//        String role = claims.get("role", String.class);
//
//        // 🔥 6. AUTH SET ET
//        UsernamePasswordAuthenticationToken auth =
//                new UsernamePasswordAuthenticationToken(
//                        username,
//                        null,
//                        List.of(new SimpleGrantedAuthority(role))
//                );
//
//        SecurityContextHolder.getContext().setAuthentication(auth);
//
//        filterChain.doFilter(request, response);
//    }
}
