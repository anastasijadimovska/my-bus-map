package mk.com.finki.mybusmap.service;

import mk.com.finki.mybusmap.model.BusSchedule;
import mk.com.finki.mybusmap.model.dto.BusScheduleDto;

import java.util.List;

public interface BusScheduleService {
    List<BusSchedule> getAllBusSchedules();
    BusSchedule createBusSchedule(BusScheduleDto busScheduleDto);
    BusSchedule getBusScheduleById(Long id);
    BusSchedule updateBusSchedule(Long id, BusScheduleDto busScheduleDto);
    void deleteBusSchedule(Long id);
    List<BusSchedule> getBusSchedulesByBusStopId(Long busStopId);
    List<BusSchedule> findAllByArrivalTimeAndBusStop_Id(String arrivalTime, Long busStopId);
    List<BusSchedule> getBusSchedulesByBusId(Long busId);

}
