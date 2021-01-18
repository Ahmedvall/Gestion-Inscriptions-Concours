package com.ic.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ic.entities.Postuler;

public interface PostulerRepository extends JpaRepository<Postuler, Long> {

}
