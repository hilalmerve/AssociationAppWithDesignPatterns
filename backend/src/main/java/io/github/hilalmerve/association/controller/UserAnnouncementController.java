package io.github.hilalmerve.association.controller;

import io.github.hilalmerve.association.dto.response.announcement.AnnouncementResponse;
import io.github.hilalmerve.association.service.AnnouncementService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/user/announcements")
public class UserAnnouncementController {

    private final AnnouncementService announcementService;

    public UserAnnouncementController(AnnouncementService announcementService) {
        this.announcementService = announcementService;
    }

    @GetMapping
    public ResponseEntity<List<AnnouncementResponse>> getAllAnnouncements() {
        return new ResponseEntity<>(announcementService.getAllAnnouncements(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AnnouncementResponse> getAnnouncement(@PathVariable Long id) {
        return new ResponseEntity<>(announcementService.getAnnouncement(id), HttpStatus.OK);
    }

}
