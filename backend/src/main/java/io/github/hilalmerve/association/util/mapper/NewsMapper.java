package io.github.hilalmerve.association.util.mapper;

import io.github.hilalmerve.association.dto.request.news.CreateNewsRequest;
import io.github.hilalmerve.association.dto.request.news.UpdateNewsRequest;
import io.github.hilalmerve.association.dto.response.news.NewsResponse;
import io.github.hilalmerve.association.entity.News;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface NewsMapper {

    News toEntity(CreateNewsRequest request);

    void createEntity(CreateNewsRequest request,
                      @MappingTarget News news);

    void updateEntity(UpdateNewsRequest request,
                      @MappingTarget News news);

    NewsResponse toResponse(News entity);

}
