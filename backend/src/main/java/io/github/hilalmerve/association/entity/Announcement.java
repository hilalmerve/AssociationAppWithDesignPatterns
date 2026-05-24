package io.github.hilalmerve.association.entity;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Entity
@DiscriminatorValue("ANNOUNCEMENT")
@Getter
@Setter
public class Announcement extends Event {

    private String imagePath;

}
