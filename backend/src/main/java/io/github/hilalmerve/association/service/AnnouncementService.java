package io.github.hilalmerve.association.service;

import io.github.hilalmerve.association.common.enums.EventType;
import io.github.hilalmerve.association.dto.request.announcement.CreateAnnouncementRequest;
import io.github.hilalmerve.association.dto.request.announcement.UpdateAnnouncementRequest;
import io.github.hilalmerve.association.dto.response.announcement.AnnouncementResponse;
import io.github.hilalmerve.association.entity.Announcement;
import io.github.hilalmerve.association.exception.NotFoundException;
import io.github.hilalmerve.association.factory.EventFactory;
import io.github.hilalmerve.association.repository.AnnouncementRepository;
import io.github.hilalmerve.association.util.mapper.AnnouncementMapper;
import io.github.hilalmerve.association.websocket.AnnouncementPublisher;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AnnouncementService {

    private final EventFactory eventFactory;
    private final AnnouncementMapper announcementMapper;
    //private final EventRepository eventRepository;
    private final AnnouncementRepository announcementRepository;
    private final AnnouncementPublisher publisher;

//    public Long save(CreateAnnouncementRequest request) {
//
//        Announcement announcement = (Announcement) eventFactory.createEvent(EventType.ANNOUNCEMENT);
//
//        announcementMapper.createEntity(request, announcement);
//
//        Announcement saved = announcementRepository.save(announcement);
//
//        publisher.publish(announcementMapper.toResponse(saved));
//
//        return announcementMapper.toResponse(saved).id();
//    }

    public Long save(String title, String description, LocalDate validUntil, MultipartFile image) {

        Announcement announcement = (Announcement) eventFactory.createEvent(EventType.ANNOUNCEMENT);

        String imagePath = null;

        if (image != null && !image.isEmpty()) {

            try {
                String fileName = UUID.randomUUID() + "_" + image.getOriginalFilename();

                Path uploadDir = Paths.get("uploads");

                // 🔥 klasörü oluştur (en kritik satır)
                Files.createDirectories(uploadDir);

                Path filePath = uploadDir.resolve(fileName);

                Files.copy(image.getInputStream(), filePath);

                imagePath = "/uploads/" + fileName;

            } catch (IOException e) {
                throw new RuntimeException("File upload failed", e);
            }
        }

        announcement.setTitle(title);
        announcement.setDescription(description);
        announcement.setValidUntil(validUntil);
        announcement.setImagePath(imagePath);

        Announcement saved = announcementRepository.save(announcement);

        publisher.publish(announcementMapper.toResponse(saved));

        return announcementMapper.toResponse(saved).id();
    }

    public Long addAnnouncement(CreateAnnouncementRequest request) {
        Announcement announcement = (Announcement) eventFactory.createEvent(EventType.ANNOUNCEMENT);

        announcementMapper.createEntity(request, announcement);
        Announcement saved = announcementRepository.save(announcement);

        return announcementMapper.toResponse(saved).id();
    }

    public AnnouncementResponse updateAnnouncement(Long id, UpdateAnnouncementRequest request) {
        Announcement announcement = getAnnouncementEntity(id);

        announcementMapper.updateEntity(request, announcement);
        Announcement saved = announcementRepository.save(announcement);

        return announcementMapper.toResponse(saved);
    }

    public void deleteAnnouncement(Long id) {
        Announcement announcement = getAnnouncementEntity(id);

        announcementRepository.delete(announcement);
    }

    public List<AnnouncementResponse> getAllAnnouncements() {
        return announcementRepository.findAll().stream()
                .map(announcementMapper::toResponse)
                .toList();
    }

    public AnnouncementResponse getAnnouncement(Long id) {
        Announcement announcement = getAnnouncementEntity(id);

        return announcementMapper.toResponse(announcement);
    }

    private Announcement getAnnouncementEntity(Long id) {
        return announcementRepository
                .findById(id)
                .orElseThrow(() -> new NotFoundException("Announcement not found"));
    }
}
