package mk.com.finki.mybusmap.repository;

import mk.com.finki.mybusmap.model.BusLine;
import mk.com.finki.mybusmap.model.BusSchedule;
import mk.com.finki.mybusmap.model.BusStop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface BusScheduleRepository extends JpaRepository<BusSchedule, Long> {
    List<BusSchedule> findAllByBusStop_Id(Long busStopId);
    List<BusSchedule> findAllByBus_Id(Long busId);
    @Query("SELECT DISTINCT bs1.busLine FROM BusSchedule bs1 JOIN BusSchedule bs2 " +
            "ON bs1.busLine = bs2.busLine " +
            "WHERE bs1.busStop = :fromStop AND bs2.busStop = :toStop")
    List<BusLine> findBusLinesBetweenStops(@Param("fromStop") BusStop fromStop, @Param("toStop") BusStop toStop);
}
