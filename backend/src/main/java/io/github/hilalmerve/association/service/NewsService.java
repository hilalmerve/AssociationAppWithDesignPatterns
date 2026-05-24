package io.github.hilalmerve.association.service;

import io.github.hilalmerve.association.common.enums.EventType;
import io.github.hilalmerve.association.dto.request.news.CreateNewsRequest;
import io.github.hilalmerve.association.dto.request.news.UpdateNewsRequest;
import io.github.hilalmerve.association.dto.response.news.NewsResponse;
import io.github.hilalmerve.association.entity.News;
import io.github.hilalmerve.association.exception.NotFoundException;
import io.github.hilalmerve.association.factory.EventFactory;
import io.github.hilalmerve.association.repository.NewsRepository;
import io.github.hilalmerve.association.util.mapper.NewsMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NewsService {

    private final EventFactory eventFactory;
    private final NewsMapper newsMapper;
    //private final EventRepository eventRepository;
    private final NewsRepository newsRepository;

    public Long addNews(CreateNewsRequest request) {
        News news = (News) eventFactory.createEvent(EventType.NEWS);

        newsMapper.createEntity(request, news);

        return newsRepository.save(news).getId();
    }

    public NewsResponse updateNews(Long id, UpdateNewsRequest request) {
        News news = getNewsEntity(id);

        newsMapper.updateEntity(request, news);
        News saved = newsRepository.save(news);

        return newsMapper.toResponse(saved);
    }

    public void deleteNews(Long id) {
        News news = getNewsEntity(id);

        newsRepository.delete(news);
    }

    public List<NewsResponse> getAllNews() {
        return newsRepository.findAll().stream()
                .map(newsMapper::toResponse)
                .toList();
    }

    public NewsResponse getNews(Long id) {
        News news = getNewsEntity(id);

        return newsMapper.toResponse(news);
    }

    private News getNewsEntity(Long id) {
        return newsRepository
                .findById(id)
                .orElseThrow(() -> new NotFoundException("News not found"));
    }
}
