package com.ic.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ic.entities.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {
	
	Optional<Role> findByNomRole(String nomRole);
	
}
