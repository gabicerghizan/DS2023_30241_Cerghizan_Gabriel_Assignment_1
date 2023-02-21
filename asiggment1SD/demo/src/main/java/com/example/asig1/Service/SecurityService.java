package com.example.asig1.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import org.springframework.stereotype.Service;


@Service
public class SecurityService {
    public String[] extractRolesFromToken(DecodedJWT token){
        return token.getClaim("roles").asArray(String.class);
    }

    public String extractUsernameFromToken(DecodedJWT token){
        return token.getSubject();
    }

    public DecodedJWT decodedJWT(String token){
        Algorithm algorithm=Algorithm.HMAC256("secret".getBytes());
        JWTVerifier jwtVerifier= JWT.require(algorithm).build();

        return jwtVerifier.verify(token);
    }
}
