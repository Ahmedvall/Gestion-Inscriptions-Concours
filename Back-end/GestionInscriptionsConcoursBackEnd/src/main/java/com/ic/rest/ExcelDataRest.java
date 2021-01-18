package com.ic.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ic.dao.ExcelDataDAO;
import com.ic.dao.SupprimerDataDAO;
import com.ic.excelModel.Principal;
import com.ic.repository.CandidatRepository;

@CrossOrigin("http://localhost:4200")
@RestController

public class ExcelDataRest {
	
	@Autowired ExcelDataDAO excelDataDAO;
	@Autowired SupprimerDataDAO supprimerDataDAO;
	@Autowired CandidatRepository candidatRepository;

	@PostMapping("/importer")
	public void importerDatas(@RequestBody List<Principal> listPrincipal) {
		supprimerDataDAO.supprimerContenueBDD();
		excelDataDAO.importer(listPrincipal);
	}
	
	
	@GetMapping("/exporter")
	public List<Principal> exporterDatas() {
		return excelDataDAO.exporter();
	}

	
}
