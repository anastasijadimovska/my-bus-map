package mk.com.finki.mybusmap.repository;

import mk.com.finki.mybusmap.model.BusSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BusScheduleRepository extends JpaRepository<BusSchedule, Long> {
}
