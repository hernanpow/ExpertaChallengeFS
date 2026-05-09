package com.challenge.invoice_api.service;

import com.challenge.invoice_api.dto.request.InvoiceRequestDTO;
import com.challenge.invoice_api.dto.response.InvoiceResponseDTO;

public interface InvoiceService {

    InvoiceResponseDTO create(InvoiceRequestDTO request);
}