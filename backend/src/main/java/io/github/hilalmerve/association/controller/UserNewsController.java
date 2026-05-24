package io.github.hilalmerve.association.controller;

import io.github.hilalmerve.association.dto.response.news.NewsResponse;
import io.github.hilalmerve.association.service.NewsService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/user/news")
public class UserNewsController {

    private final NewsService newsService;

    public UserNewsController(NewsService newsService) {
        this.newsService = newsService;
    }

    @GetMapping
    public ResponseEntity<List<NewsResponse>> getAllNews() {
        return new ResponseEntity<>(newsService.getAllNews(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<NewsResponse> getNews(@PathVariable Long id) {
        return new ResponseEntity<>(newsService.getNews(id), HttpStatus.OK);
    }

}
