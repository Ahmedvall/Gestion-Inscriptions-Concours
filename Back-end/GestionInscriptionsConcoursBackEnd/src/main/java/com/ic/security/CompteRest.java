package com.ic.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ic.entities.Users;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/compte")
public class CompteRest {
	
	@Autowired private CompteDAO compteDAO; 
	
	
	@PostMapping("/login")
	public Users login(@RequestBody Users user) {
		return compteDAO.getUserByEmailAndPwd(user);
	}
	
	@PostMapping("/mdifierPwd")
	public void restaurerMotDePass() {
		
	}

}
