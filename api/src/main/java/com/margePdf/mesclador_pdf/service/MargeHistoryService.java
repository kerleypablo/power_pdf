package com.margePdf.mesclador_pdf.service;

import com.margePdf.mesclador_pdf.model.MargeHistory;
import com.margePdf.mesclador_pdf.repository.MargeHistoryRepository;
import org.apache.pdfbox.multipdf.PDFMergerUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@Service
public class MargeHistoryService {

    @Autowired
    private MargeHistoryRepository margeHistoryRepository;

    public List<MargeHistory> getMargeHistoryByEmail(String email) {
        return margeHistoryRepository.findByEmailAndDeletedAtIsNull(email);
    }

    public MargeHistory saveMargeHistory(String email, String fileName, String pdfContent) {
        MargeHistory margeHistory = new MargeHistory();
        margeHistory.setEmail(email);
        margeHistory.setFileName(fileName);
        margeHistory.setPdfContent(pdfContent);
        margeHistory.setCreatedAt(LocalDateTime.now());

        return margeHistoryRepository.save(margeHistory);
    }

    public void deleteMergeHistory(Long id) {
        Optional<MargeHistory> mergeHistoryOptional = margeHistoryRepository.findById(id);
        if (mergeHistoryOptional.isPresent()) {
            MargeHistory mergeHistory = mergeHistoryOptional.get();
            mergeHistory.setDeletedAt(LocalDateTime.now());
            margeHistoryRepository.save(mergeHistory);
        } else {
            throw new RuntimeException("Histórico de mesclagem não encontrado.");
        }
    }

    public Optional<MargeHistory> findById(Long id) {
        return margeHistoryRepository.findById(id);
    }

    public String margePdfs(List<String> pdfsBase64) throws Exception{
        PDFMergerUtility pdfMerge = new PDFMergerUtility();
        ByteArrayOutputStream mergedPdfOutputStream = new ByteArrayOutputStream();

        for (String pdfBase64 : pdfsBase64) {
            byte[] pdfBytes= Base64.getDecoder().decode(pdfBase64);
            pdfMerge.addSource(new ByteArrayInputStream(pdfBytes));
        }

        pdfMerge.setDestinationStream(mergedPdfOutputStream);
        pdfMerge.mergeDocuments(null);

        byte[] mergedPdfBytes = mergedPdfOutputStream.toByteArray();
        return Base64.getEncoder().encodeToString(mergedPdfBytes);

    }
}
