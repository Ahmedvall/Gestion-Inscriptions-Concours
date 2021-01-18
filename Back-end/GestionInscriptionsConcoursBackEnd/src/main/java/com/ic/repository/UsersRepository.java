package com.ic.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ic.entities.Users;

public interface UsersRepository extends JpaRepository<Users, Long> {
	
	List<Users> findByMail(String mail);	
	Optional<Users> findByMailAndMotDePass(String mail, String motDePass);
	

}
