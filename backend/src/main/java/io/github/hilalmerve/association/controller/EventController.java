package io.github.hilalmerve.association.controller;

import io.github.hilalmerve.association.dto.request.announcement.CreateAnnouncementRequest;
import io.github.hilalmerve.association.service.EventService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/events")
public class EventController {

    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @PostMapping("/{type}/create")
    public ResponseEntity<Long> createAnnouncement(@PathVariable String type, @RequestBody CreateAnnouncementRequest request) {
        return new ResponseEntity<>(eventService.processEvent(type, request), HttpStatus.CREATED);
    }

    @PostMapping("/announcements")
    public ResponseEntity<Long> createAnnouncement(@RequestBody CreateAnnouncementRequest request) {
        return new ResponseEntity<>(eventService.createAnnouncement(request), HttpStatus.CREATED);
    }
}
