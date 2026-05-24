package io.github.hilalmerve.association.controller;

import io.github.hilalmerve.association.dto.request.announcement.CreateAnnouncementRequest;
import io.github.hilalmerve.association.dto.request.announcement.UpdateAnnouncementRequest;
import io.github.hilalmerve.association.dto.response.announcement.AnnouncementResponse;
import io.github.hilalmerve.association.service.AnnouncementService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/admin/announcements")
public class AdminAnnouncementController {

    private final AnnouncementService announcementService;

    public AdminAnnouncementController(AnnouncementService announcementService) {
        this.announcementService = announcementService;
    }

//    @PostMapping("/add")
//    public ResponseEntity<Long> addAnnouncement(@Valid @RequestBody CreateAnnouncementRequest request) {
////        return new ResponseEntity<>(announcementService.addAnnouncement(request), HttpStatus.CREATED);
//        return new ResponseEntity<>(announcementService.save(request), HttpStatus.CREATED);
//    }
@PostMapping(value = "/add", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
public ResponseEntity<Long> addAnnouncement(
        @RequestParam String title,
        @RequestParam String description,
        @RequestParam LocalDate validUntil,
        @RequestParam(required = false) MultipartFile image
) {
    return new ResponseEntity<>(
            announcementService.save(title, description, validUntil, image),
            HttpStatus.CREATED
    );
}

    @PutMapping("/{id}")
    public ResponseEntity<AnnouncementResponse> updateAnnouncement(@PathVariable @Positive Long id, @Valid @RequestBody UpdateAnnouncementRequest request) {
        return new ResponseEntity<>(announcementService.updateAnnouncement(id, request), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAnnouncement(@PathVariable @Positive Long id) {
        announcementService.deleteAnnouncement(id);
        return ResponseEntity.noContent().build();
    }
}
