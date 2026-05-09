package com.challenge.invoice_api.model;


import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "invoices")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Invoice extends BaseEntity {
    @Column(nullable = false, unique = true)
    private String invoiceNumber;

    @Column(nullable = false)
    private LocalDate date;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    @OneToMany(mappedBy = "invoice" , cascade = CascadeType.ALL , orphanRemoval = true)
    @Builder.Default
    private List<InvoiceItem> items = new ArrayList<>();

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal total;

    @PrePersist
    @PreUpdate
    public void calculateTotal() {
        if (items != null) {
            this.total = items.stream()
                    .map(InvoiceItem::getSubtotal)
                    .reduce(BigDecimal.ZERO, BigDecimal::add);
        }
    }

}