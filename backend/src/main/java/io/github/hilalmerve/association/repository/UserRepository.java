package io.github.hilalmerve.association.repository;

import io.github.hilalmerve.association.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
   Optional<User> findByUsername(String username);

    boolean existsByUsername(String admin);
}
