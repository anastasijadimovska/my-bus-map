package mk.com.finki.mybusmap.repository;

import mk.com.finki.mybusmap.model.BusSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalTime;
import java.util.List;

@Repository
public interface BusScheduleRepository extends JpaRepository<BusSchedule, Long> {
    List<BusSchedule> findAllByBusStop_Id(Long busStopId);
    List<BusSchedule> findAllByArrivalTimeAndBusStop_Id(LocalTime arrivalTime, Long busStopId);
    List<BusSchedule> findAllByBus_Id(Long busId);
}
