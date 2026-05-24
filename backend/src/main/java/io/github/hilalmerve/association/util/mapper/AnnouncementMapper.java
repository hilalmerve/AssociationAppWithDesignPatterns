package io.github.hilalmerve.association.util.mapper;

import io.github.hilalmerve.association.dto.request.announcement.CreateAnnouncementRequest;
import io.github.hilalmerve.association.dto.request.announcement.UpdateAnnouncementRequest;
import io.github.hilalmerve.association.dto.response.announcement.AnnouncementResponse;
import io.github.hilalmerve.association.entity.Announcement;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;


@Mapper(componentModel = "spring")
public interface AnnouncementMapper {

    Announcement toEntity(CreateAnnouncementRequest request);

    void createEntity(CreateAnnouncementRequest request,
                      @MappingTarget Announcement announcement);

    void updateEntity(UpdateAnnouncementRequest request,
                      @MappingTarget Announcement announcement);

    AnnouncementResponse toResponse(Announcement entity);

}

