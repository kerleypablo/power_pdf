package com.margePdf.mesclador_pdf.repository;

import com.margePdf.mesclador_pdf.model.MargeHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MargeHistoryRepository extends JpaRepository<MargeHistory, Long> {
    List<MargeHistory> findByEmail(String email);

    List<MargeHistory> findByEmailAndDeletedAtIsNull(String email);
}
