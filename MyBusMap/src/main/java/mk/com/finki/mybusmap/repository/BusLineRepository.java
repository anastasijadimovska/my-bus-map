package mk.com.finki.mybusmap.repository;

import mk.com.finki.mybusmap.model.BusLine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BusLineRepository extends JpaRepository<BusLine, Long> {
}
