package com.challenge.invoice_api.dto.response;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InvoiceResponseDTO {

    private Long id;
    private String invoiceNumber;
    private LocalDate date;
    private CustomerResponseDTO customer;
    private List<InvoiceItemResponseDTO> items;
    private BigDecimal total;
}