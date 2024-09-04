package com.margePdf.mesclador_pdf.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.time.LocalDate;

@Data
@NoArgsConstructor

public class MergesPerDayDTO {
    private Date date;
    private Long mergeCount;

    public MergesPerDayDTO(Date date, Long mergeCount) {
        this.date = date;
        this.mergeCount = mergeCount;
    }

    // Getters and Setters
    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Long getMergeCount() {
        return mergeCount;
    }

    public void setMergeCount(Long mergeCount) {
        this.mergeCount = mergeCount;
    }

}
