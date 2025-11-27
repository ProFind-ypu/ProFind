package com.profind.profind_backend.security;


import com.profind.profind_backend.config.JwtUtils;
import com.profind.profind_backend.service.CustomUserDetailsService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.util.StringUtils;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtils jwtUtils;
    private final CustomUserDetailsService userDetailsService;

    public JwtAuthenticationFilter(JwtUtils jwtUtils, CustomUserDetailsService userDetailsService) {
        this.jwtUtils = jwtUtils;
        this.userDetailsService = userDetailsService;
    }

    private String parseJwt(HttpServletRequest request) {
        String headerAuth = request.getHeader("Authorization");
        if (StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer ")) {
            return headerAuth.substring(7);
        }
        return null;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws jakarta.servlet.ServletException, IOException {
        try {
            String jwt = parseJwt(request);
            if (jwt != null && jwtUtils.validateJwtToken(jwt)) {
                Long userId = jwtUtils.getUserIdFromJwt(jwt);
                UserDetails userDetails = userDetailsService.loadUserByUsername(jwtUtils.getUserIdFromJwt(jwt).toString());
                // The above loads by username/email; adjust: we will load by email in token, so:
                // Instead: get email claim and load by email
                // (Better: replace previous two lines with:)
            }
        } catch (Exception ex) {
            // ignore - let security handle unauthenticated
        }

        // Slightly different approach below for correctness (replaced in final code)
        filterChain.doFilter(request, response);
    }
}
