package com.ic.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.ic.entities.Users;
import com.ic.repository.UsersRepository;

@Service
public class MotDePasseDAO {
	
	@Autowired UsersRepository userRepo;
	
	public ResponseEntity<Message> forgotPassword(String email) {

		List<Users> lu = userRepo.findByMail(email);

		if (lu.isEmpty()) {
			System.out.println("email not found");
			return new ResponseEntity<Message>(new Message("invalid"), HttpStatus.OK);
		}
		
		if (lu.size() > 1) {
			return new ResponseEntity<Message>(new Message("invalid"), HttpStatus.OK);
		}

		return new ResponseEntity<Message>(new Message(""+lu.get(0).getId()), HttpStatus.OK);
	}

	public ResponseEntity<Message> resetPassword(Long idUser, String password) {

		Optional<Users> u = userRepo.findById(idUser);

		if (!u.isPresent()) {
			return new ResponseEntity<Message>(new Message("invalid"), HttpStatus.NOT_FOUND);
		}

		Users user = u.get();

		user.setMotDePass(password);
		userRepo.save(user);
		return new ResponseEntity<Message>(new Message("success"), HttpStatus.OK);
	}
	
	
	public static class Message {
		private String msg;
		public Message(String msg) {
			this.msg = msg;
		}
		
		public String getMessage() {
			return msg;
		}
		
		public void setMessage(String msg) {
			this.msg = msg;
		}
	}

}
