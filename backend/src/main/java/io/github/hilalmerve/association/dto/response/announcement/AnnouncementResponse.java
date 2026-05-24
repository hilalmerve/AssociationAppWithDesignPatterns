package io.github.hilalmerve.association.dto.response.announcement;

import java.time.LocalDate;

public record AnnouncementResponse(
        Long id,
        String title,
        String description,
        LocalDate validUntil,
        String imagePath
) {}
