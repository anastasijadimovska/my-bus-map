package mk.com.finki.mybusmap.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import mk.com.finki.mybusmap.exceptions.BadRequestException;
import mk.com.finki.mybusmap.model.UserInfo;
import mk.com.finki.mybusmap.model.dto.AuthRequest;
import mk.com.finki.mybusmap.service.JwtService;
import mk.com.finki.mybusmap.service.UserInfoService;
import mk.com.finki.mybusmap.service.impl.TokenBlacklistServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/auth")
public class UserController {

    @Autowired
    private UserInfoService service;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenBlacklistServiceImpl blacklistService;


    @PostMapping("/addNewUser")
    public String addNewUser(@RequestBody @Valid UserInfo userInfo) {
        return service.addUser(userInfo);
    }

    @PostMapping("/generateToken")
    public String authenticateAndGetToken(@RequestBody AuthRequest authRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword())
        );
        if (authentication.isAuthenticated()) {
            return jwtService.generateToken(authRequest.getEmail());
        } else {
            throw new UsernameNotFoundException("Invalid user request!");
        }
    }

    @GetMapping("/user/activeUser")
    public String activeUser(){
        return "The user is logged in!";
    }

    @PostMapping("/logout")
    public String logout(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new BadRequestException("No valid token provided");
        }
        String token = authHeader.substring(7);
        blacklistService.addToBlacklist(token);
        return "Logged out successfully, token blacklisted";
    }

}