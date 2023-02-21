package com.example.asig1.Controller;

import com.example.asig1.Model.Role;
import com.example.asig1.Service.RoleService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST,RequestMethod.PUT,RequestMethod.DELETE}, maxAge=180)
@AllArgsConstructor
@RequestMapping(path = "/api/role")
public class RoleController {
    private RoleService service;

    @PostMapping(path = "/add")
    public ResponseEntity<?> saveRole(@RequestBody Role role){
        this.service.saveRole(role);

        return ResponseEntity.ok().build();
    }
}
