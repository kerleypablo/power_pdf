package com.margePdf.mesclador_pdf.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "marge_history")
@Data
public class MargeHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String email;

    @Column(name = "file_name", nullable = false)
    private String fileName;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String pdfContent;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "deleted_at ", nullable = true)
    private LocalDateTime deletedAt ;
}
