package mk.com.finki.mybusmap.repository;

import mk.com.finki.mybusmap.model.SavedBusLines;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SavedBusLinesRepository extends JpaRepository<SavedBusLines, Long> {
}
