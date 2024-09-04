package com.margePdf.mesclador_pdf.controller;

import com.margePdf.mesclador_pdf.dto.MargeHistoryDTO;
import com.margePdf.mesclador_pdf.dto.MargeRequestDTO;
import com.margePdf.mesclador_pdf.model.MargeHistory;
import com.margePdf.mesclador_pdf.service.MargeHistoryService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/merge-history")
public class MergeHistoryController {

    @Autowired
    private MargeHistoryService margeHistoryService;

    @GetMapping("/{email}")
    public ResponseEntity<List<MargeHistoryDTO>> getMargeHistory(@PathVariable String email) {
        List<MargeHistory> historyList = margeHistoryService.getMargeHistoryByEmail(email);

        List<MargeHistoryDTO> dtoList = historyList.stream()
                .map(history -> new MargeHistoryDTO(
                        history.getId(),
                        history.getFileName(),
                        "/api/merge-history/download/" + history.getId(),
                        history.getCreatedAt()
                ))
                .toList();

        return ResponseEntity.ok(dtoList);
    }

    @PostMapping
    public ResponseEntity<?> createMergeHistory(@Valid @RequestBody MargeRequestDTO request) {
        if (request.getEmail() == null || request.getEmail().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("O e-mail é obrigatório para realizar a mesclagem.");
        }

        try {

            String mergedPdfBase64 = margeHistoryService.margePdfs(request.getPdfContentList());

            MargeHistory savedHistory = margeHistoryService.saveMargeHistory(
                    request.getEmail(),
                    request.getFileName(),
                    mergedPdfBase64
            );

            String downloadLink = "/api/merge-history/download/" + savedHistory.getId();

            MargeHistoryDTO dto = new MargeHistoryDTO(
                    savedHistory.getId(),
                    savedHistory.getFileName(),
                    downloadLink,
                    savedHistory.getCreatedAt()
            );

            return ResponseEntity.ok(dto);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao mesclar PDFs.");
        }

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMergeHistory(@PathVariable Long id) {
        margeHistoryService.deleteMergeHistory(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/download/{id}")
    public ResponseEntity<byte[]> downloadMergedPdf(@PathVariable Long id) {
        Optional<MargeHistory> mergeHistoryOptional = margeHistoryService.findById(id);

        if (mergeHistoryOptional.isPresent()) {
            MargeHistory mergeHistory = mergeHistoryOptional.get();
            byte[] pdfBytes = Base64.getDecoder().decode(mergeHistory.getPdfContent());

            return ResponseEntity.ok()
                    .header("Content-Disposition", "attachment; filename=\"" + mergeHistory.getFileName() + "\"")
                    .body(pdfBytes);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}