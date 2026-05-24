package io.github.hilalmerve.association.dto.request.announcement;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public record UpdateAnnouncementRequest(

        @NotBlank
        @Size(max = 255)
        String title,

        @NotBlank
        String description,

        @NotNull
        LocalDate validUntil,

        @NotBlank
        String imagePath
) {}
