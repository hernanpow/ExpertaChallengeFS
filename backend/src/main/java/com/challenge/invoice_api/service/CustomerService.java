package com.challenge.invoice_api.service;

import com.challenge.invoice_api.dto.request.CustomerRequestDTO;
import com.challenge.invoice_api.dto.response.CustomerResponseDTO;

import java.util.List;

public interface CustomerService {

    CustomerResponseDTO create(CustomerRequestDTO request);
    List<CustomerResponseDTO> findAll();
}