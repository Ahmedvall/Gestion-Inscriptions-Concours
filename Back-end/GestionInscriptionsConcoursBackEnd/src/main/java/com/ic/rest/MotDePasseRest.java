package com.ic.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ic.dao.MotDePasseDAO;
import com.ic.dao.MotDePasseDAO.Message;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/motdepasse")
public class MotDePasseRest {
	
	@Autowired MotDePasseDAO motDePasseDAO;

	@GetMapping("/oublier/{email}")
	public ResponseEntity<Message> forgotPassword(@PathVariable String email) {
		ResponseEntity<Message> m = motDePasseDAO.forgotPassword(email);
		return m;
	}
	
	@GetMapping("/restaurer/{idUser}/{password}")
	public ResponseEntity<Message> restPassword(@PathVariable Long idUser, @PathVariable String password) {
		ResponseEntity<Message> m = motDePasseDAO.resetPassword(idUser, password);
		return m;
	}
}
