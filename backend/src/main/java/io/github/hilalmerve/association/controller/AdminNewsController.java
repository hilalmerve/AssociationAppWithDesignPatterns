package io.github.hilalmerve.association.controller;

import io.github.hilalmerve.association.dto.request.news.CreateNewsRequest;
import io.github.hilalmerve.association.dto.request.news.UpdateNewsRequest;
import io.github.hilalmerve.association.dto.response.news.NewsResponse;
import io.github.hilalmerve.association.service.NewsService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/admin/news")
public class AdminNewsController {

    private final NewsService newsService;

    public AdminNewsController(NewsService newsService) {
        this.newsService = newsService;
    }

    @PostMapping("/add")
    public ResponseEntity<Long> addNews(@Valid @RequestBody CreateNewsRequest request) {
        return new ResponseEntity<>(newsService.addNews(request), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<NewsResponse> updateNews(@PathVariable @Positive Long id, @Valid @RequestBody UpdateNewsRequest request) {
        return new ResponseEntity<>(newsService.updateNews(id, request), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNews(@PathVariable @Positive Long id) {
        newsService.deleteNews(id);
        return ResponseEntity.noContent().build();
    }
}
