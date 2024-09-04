package com.margePdf.mesclador_pdf.repository;

import com.margePdf.mesclador_pdf.dto.MergesPerDayDTO;
import com.margePdf.mesclador_pdf.model.MargeHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MargeHistoryRepository extends JpaRepository<MargeHistory, Long> {
    List<MargeHistory> findByEmail(String email);

    List<MargeHistory> findByEmailAndDeletedAtIsNull(String email);

    @Query("SELECT new com.margePdf.mesclador_pdf.dto.MergesPerDayDTO(DATE(mh.createdAt), COUNT(mh)) FROM MargeHistory mh GROUP BY DATE(mh.createdAt)")
    List<MergesPerDayDTO> findMergesPerDay();

}
