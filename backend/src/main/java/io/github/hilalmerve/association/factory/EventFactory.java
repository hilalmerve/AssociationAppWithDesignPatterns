package io.github.hilalmerve.association.factory;

import io.github.hilalmerve.association.common.enums.EventType;
import io.github.hilalmerve.association.entity.Announcement;
import io.github.hilalmerve.association.entity.Event;
import io.github.hilalmerve.association.entity.News;
import org.springframework.stereotype.Component;

@Component
public class EventFactory {

    public Event createEvent(EventType type) {

        return switch (type) {
            case NEWS -> new News();
            case ANNOUNCEMENT -> new Announcement();
        };
    }
}
