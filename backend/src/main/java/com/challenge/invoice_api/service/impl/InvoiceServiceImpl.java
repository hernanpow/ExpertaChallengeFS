package com.challenge.invoice_api.service.impl;

import com.challenge.invoice_api.dto.request.InvoiceItemRequestDTO;
import com.challenge.invoice_api.dto.request.InvoiceRequestDTO;
import com.challenge.invoice_api.dto.response.CustomerResponseDTO;
import com.challenge.invoice_api.dto.response.InvoiceItemResponseDTO;
import com.challenge.invoice_api.dto.response.InvoiceResponseDTO;
import com.challenge.invoice_api.exception.BusinessException;
import com.challenge.invoice_api.exception.ResourceNotFoundException;
import com.challenge.invoice_api.model.Customer;
import com.challenge.invoice_api.model.Invoice;
import com.challenge.invoice_api.model.InvoiceItem;
import com.challenge.invoice_api.repository.CustomerRepository;
import com.challenge.invoice_api.repository.InvoiceRepository;
import com.challenge.invoice_api.service.InvoiceService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class InvoiceServiceImpl implements InvoiceService {

    private final InvoiceRepository invoiceRepository;
    private final CustomerRepository customerRepository;

    @Override
    @Transactional
    public InvoiceResponseDTO create(InvoiceRequestDTO request) {
        Customer customer = customerRepository.findById(request.getCustomerId())
                .orElseThrow(() -> new ResourceNotFoundException("Customer", request.getCustomerId()));

        validateNoDuplicateProducts(request.getItems());

        Invoice invoice = Invoice.builder()
                .invoiceNumber(generateInvoiceNumber())
                .date(LocalDate.now())
                .customer(customer)
                .build();

        List<InvoiceItem> items = buildItems(request.getItems(), invoice);
        invoice.setItems(items);
        invoice.calculateTotal();

        Invoice saved = invoiceRepository.save(invoice);
        return toResponseDTO(saved);
    }

    private void validateNoDuplicateProducts(List<InvoiceItemRequestDTO> items) {
        Set<String> productNames = new HashSet<>();
        items.forEach(item -> {
            String normalized = item.getProductName().trim().toLowerCase();
            if (!productNames.add(normalized)) {
                throw new BusinessException(
                        "Duplicate product in invoice: " + item.getProductName()
                );
            }
        });
    }

    private List<InvoiceItem> buildItems(List<InvoiceItemRequestDTO> itemDTOs, Invoice invoice) {
        return itemDTOs.stream()
                .map(dto -> {
                    InvoiceItem item = InvoiceItem.builder()
                            .productName(dto.getProductName())
                            .quantity(dto.getQuantity())
                            .unitPrice(dto.getUnitPrice())
                            .invoice(invoice)
                            .build();
                    item.calculateSubtotal();
                    return item;
                })
                .toList();
    }

    private String generateInvoiceNumber() {
        return "INV-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }

    private CustomerResponseDTO toCustomerResponseDTO(Customer customer) {
        return CustomerResponseDTO.builder()
                .id(customer.getId())
                .name(customer.getName())
                .email(customer.getEmail())
                .address(customer.getAddress())
                .build();
    }

    private InvoiceItemResponseDTO toItemResponseDTO(InvoiceItem item) {
        return InvoiceItemResponseDTO.builder()
                .id(item.getId())
                .productName(item.getProductName())
                .quantity(item.getQuantity())
                .unitPrice(item.getUnitPrice())
                .subtotal(item.getSubtotal())
                .build();
    }

    private InvoiceResponseDTO toResponseDTO(Invoice invoice) {
        return InvoiceResponseDTO.builder()
                .id(invoice.getId())
                .invoiceNumber(invoice.getInvoiceNumber())
                .date(invoice.getDate())
                .customer(toCustomerResponseDTO(invoice.getCustomer()))
                .items(invoice.getItems().stream().map(this::toItemResponseDTO).toList())
                .total(invoice.getTotal())
                .build();
    }
}