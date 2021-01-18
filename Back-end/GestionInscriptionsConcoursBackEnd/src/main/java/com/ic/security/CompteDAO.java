package com.ic.security;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ic.entities.Users;
import com.ic.repository.UsersRepository;

@Service
public class CompteDAO {
	
	@Autowired private UsersRepository usersRepository;
	
	public Users getUserByEmailAndPwd(Users userAuth) {
		Optional<Users> user = usersRepository.findByMailAndMotDePass(userAuth.getMail(), userAuth.getMotDePass());
		
		if(user.isPresent()) return user.get();
		else return null;
	}

}
