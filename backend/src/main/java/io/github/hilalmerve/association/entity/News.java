package io.github.hilalmerve.association.entity;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Entity
@DiscriminatorValue("NEWS")
@Getter
@Setter
public class News extends Event {

    private String newsLink;
}
