package com.margePdf.mesclador_pdf.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import java.util.List;

@Data
public class MargeRequestDTO {
    @Email(message = "Por favor, insira um e-mail válido.")
    @NotEmpty(message = "O e-mail é obrigatório.")
    private String email;
    @NotEmpty(message = "O nome do arquivo é obrigatório.")
    private String fileName;
    @NotEmpty(message = "O conteúdo do PDF é obrigatório.")
    private List<String> pdfContentList;
}
