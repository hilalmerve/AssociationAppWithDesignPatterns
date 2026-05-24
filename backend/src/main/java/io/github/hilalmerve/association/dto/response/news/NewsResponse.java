package io.github.hilalmerve.association.dto.response.news;

import java.time.LocalDate;

public record NewsResponse(
        Long id,
        String title,
        String description,
        LocalDate validUntil,
        String newsLink
) {}
