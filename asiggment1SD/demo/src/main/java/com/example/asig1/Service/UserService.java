package com.example.asig1.Service;


import com.example.asig1.DTO.UserDTO;
import com.example.asig1.Exception.UserNotFoundException;
import com.example.asig1.Mapper.UserMapper;
import com.example.asig1.Model.Role;
import com.example.asig1.Model.User;
import com.example.asig1.Repository.RoleRepository;
import com.example.asig1.Repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicReference;

import static java.util.Arrays.stream;

@AllArgsConstructor
@Service
@Transactional

public class UserService implements UserDetailsService {
    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private BCryptPasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);

        if(user == null) {
            throw new UserNotFoundException("User not found.");
        }

        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        user.getRoles().forEach(role -> authorities.add(new SimpleGrantedAuthority(role.getName())));

        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), authorities);
    }

    public UserDTO getUserByUsername(String username) throws ChangeSetPersister.NotFoundException {
        User user = this.userRepository.findByUsername(username);
        if(user == null) {
            throw new ChangeSetPersister.NotFoundException();
        }

        return UserMapper.toUserDTO(user);
    }

    public UserDTO getUserById(Long id) throws UserNotFoundException {
        Optional<User> user = this.userRepository.findById(id);
        if(user.isEmpty()){
            throw new UserNotFoundException("Invalid id");
        }

        return UserMapper.toUserDTO(user.get());
    }

    public void addUser(User user) {
        this.userRepository.save(user);
    }

    public void addDefaultRoleToUser(User user){
        Role role = this.roleRepository.findByName("ROLE_USER");
        user.getRoles().add(role);

        this.userRepository.flush();
    }

    public void deleteUser(Long id) {
        this.userRepository.deleteById(id);
    }

    public void updateUserInfo(Long id, UserDTO newUser) {
        User databaseUser = this.userRepository.findById(id).get();
        databaseUser.setUsername(newUser.getUsername());
        databaseUser.setEmail(newUser.getEmail());
        databaseUser.setFirstname(newUser.getFirstName());
        databaseUser.setLastname(newUser.getLastName());

        this.userRepository.save(databaseUser);
    }

    public boolean userAlreadyExists(User user) {
        String username = user.getUsername();
        String email = user.getEmail();
        User userByUsername = userRepository.findByUsername(username);
        User userByEmail = userRepository.findByEmail(email);

        return !(userByUsername == null && userByEmail == null);
    }

    public User hashUsersPassword(User user) {
        String password = user.getPassword();
        String newPassword = passwordEncoder.encode(password);

        user.setPassword(newPassword);

        return user;
    }

    public void addRoleToUser(String username, String roleName) {
        User user = this.userRepository.findByUsername(username);
        Role role = this.roleRepository.findByName(roleName);
        user.getRoles().add(role);

        this.userRepository.flush();
    }

    public List<User> getAllUsers(){

        return this.userRepository.findAll();
    }

    public boolean userHasRights(String username, String[] roles) throws ChangeSetPersister.NotFoundException {
        UserDTO userDTO = this.getUserByUsername(username);

        AtomicReference<Boolean> isAdmin = new AtomicReference<>(false);
        stream(roles).forEach(role -> {
            if(role.equals("ROLE_MANAGER")) {
                isAdmin.set(true);
            }
        });

        return userDTO.getUsername().equals(username) || isAdmin.get();
    }

}
