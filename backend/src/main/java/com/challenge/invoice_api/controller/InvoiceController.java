package com.challenge.invoice_api.controller;

import com.challenge.invoice_api.dto.request.InvoiceRequestDTO;
import com.challenge.invoice_api.dto.response.InvoiceResponseDTO;
import com.challenge.invoice_api.service.InvoiceService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/invoices")
@RequiredArgsConstructor
@Tag(name = "Invoices", description = "Invoice management endpoints")
public class InvoiceController {

    private final InvoiceService invoiceService;

    @PostMapping
    @Operation(summary = "Create a new invoice with items")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Invoice created successfully"),
            @ApiResponse(responseCode = "404", description = "Customer not found"),
            @ApiResponse(responseCode = "400", description = "Validation error or duplicate product"),
    })
    public ResponseEntity<InvoiceResponseDTO> create(@Valid @RequestBody InvoiceRequestDTO request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(invoiceService.create(request));
    }
}