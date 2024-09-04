package com.margePdf.mesclador_pdf.dto;


import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class MargeHistoryDTO {

    private Long id;
    private String name;
    private String link;
    private LocalDateTime createdAt;

    
}
