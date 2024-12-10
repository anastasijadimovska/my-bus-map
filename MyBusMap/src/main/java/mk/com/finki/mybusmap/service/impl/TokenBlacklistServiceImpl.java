package mk.com.finki.mybusmap.service.impl;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class TokenBlacklistServiceImpl {
    private final Set<String> blacklist = new HashSet<>();

    public void addToBlacklist(String token) {
        blacklist.add(token);
        SecurityContextHolder.clearContext();
        System.out.println("Token blacklisted: " + token);
    }

    public boolean isBlacklisted(String token) {
        boolean result = blacklist.contains(token);
        System.out.println("Checking if token is blacklisted: " + token + " -> " + result);
        return result;
    }
}

