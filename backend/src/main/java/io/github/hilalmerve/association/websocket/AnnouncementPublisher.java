package io.github.hilalmerve.association.websocket;

import io.github.hilalmerve.association.dto.response.announcement.AnnouncementResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AnnouncementPublisher {

    private final SimpMessagingTemplate messagingTemplate;

    public void publish(AnnouncementResponse announcementResponse) {

        messagingTemplate.convertAndSend(
                "/topic/announcements",
                announcementResponse
        );
    }
}
