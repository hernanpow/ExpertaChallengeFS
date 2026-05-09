package com.challenge.invoice_api.service.impl;

import com.challenge.invoice_api.dto.request.CustomerRequestDTO;
import com.challenge.invoice_api.dto.response.CustomerResponseDTO;
import com.challenge.invoice_api.exception.DuplicateResourceException;
import com.challenge.invoice_api.model.Customer;
import com.challenge.invoice_api.repository.CustomerRepository;
import com.challenge.invoice_api.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;

    @Override
    @Transactional
    public CustomerResponseDTO create(CustomerRequestDTO request) {
        if (customerRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException("Customer", "email", request.getEmail());
        }

        Customer customer = Customer.builder()
                .name(request.getName())
                .email(request.getEmail())
                .address(request.getAddress())
                .build();

        Customer saved = customerRepository.save(customer);
        return toResponseDTO(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CustomerResponseDTO> findAll() {
        return customerRepository.findAll()
                .stream()
                .map(this::toResponseDTO)
                .toList();
    }

    private CustomerResponseDTO toResponseDTO(Customer customer) {
        return CustomerResponseDTO.builder()
                .id(customer.getId())
                .name(customer.getName())
                .email(customer.getEmail())
                .address(customer.getAddress())
                .build();
    }
}