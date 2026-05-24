package io.github.hilalmerve.association.service;

import io.github.hilalmerve.association.common.enums.EventType;
import io.github.hilalmerve.association.dto.request.announcement.CreateAnnouncementRequest;
import io.github.hilalmerve.association.entity.Announcement;
import io.github.hilalmerve.association.entity.Event;
import io.github.hilalmerve.association.factory.EventFactory;
import io.github.hilalmerve.association.repository.EventRepository;
import io.github.hilalmerve.association.util.mapper.AnnouncementMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventFactory eventFactory;
    private final AnnouncementMapper announcementMapper;
    private final EventRepository eventRepository;

    public Long processEvent(String type, CreateAnnouncementRequest request) {
        EventType eventType = EventType.from(type);
        Event event = eventFactory.createEvent(eventType);

        if (eventType == EventType.ANNOUNCEMENT) {
            announcementMapper.createEntity(request, (Announcement) event);
        }
        Event savedEvent = eventRepository.save(event);
        return savedEvent.getId();
    }

    public Long createAnnouncement(CreateAnnouncementRequest request) {
        Event event = eventFactory.createEvent(EventType.ANNOUNCEMENT);

        Announcement announcement = announcementMapper.toEntity(request);
        Announcement savedEvent = eventRepository.save(announcement);
        return savedEvent.getId();
    }
}
