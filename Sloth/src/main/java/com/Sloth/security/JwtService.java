package com.Sloth.security;

import java.security.Key;
import java.sql.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

    private static final String SECRET_KEY = "VpvE9UbH3pfDnNuPm3jzXI2TQe8Ivd4cfAZs4faSjSFj/gDjOp4cBOD3pFj5IBkz";
    private Date tokenExpiration = new Date(System.currentTimeMillis() + 1000 * 60 * 24);

    //Subject will be the username.
    public String extractUserName(String token){
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver){
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    //Generate a token without extra claims
    public String generateToken(UserDetails user){
        return generateToken(new HashMap<>(), user);
    }

    
    //Generate a token including extra claims.
    public String generateToken(Map<String, Object> extraClaims, UserDetails user){
        return Jwts.builder()
        .setClaims(extraClaims)
        .setSubject(user.getUsername())
        .setIssuedAt(new Date(System.currentTimeMillis()))
        .setExpiration(tokenExpiration)
        .signWith(getSignInKey(), SignatureAlgorithm.HS256)
        .compact();
    }

    public boolean isTokenValid(String token, UserDetails user){
        final String username = extractUserName(token);
        return (username.equals(user.getUsername())) && !isTokenExpired(token);
    }

    public boolean isTokenExpired(String token){
        return extractExpiration(token).before(tokenExpiration);
    }

    public Date extractExpiration(String token){
        return (Date) extractClaim(token, Claims::getExpiration);
    }

    private Claims extractAllClaims(String token){
        return Jwts.parserBuilder()
                    .setSigningKey(getSignInKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
    }

    private Key getSignInKey(){
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

}
