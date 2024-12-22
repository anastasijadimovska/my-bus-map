package mk.com.finki.mybusmap.service;

import mk.com.finki.mybusmap.model.BusStop;
import mk.com.finki.mybusmap.model.dto.BusStopDto;

import java.util.List;
import java.util.Optional;

public interface BusStopService {
    List<BusStop> getAllBusStops();
    BusStop createBusStop(BusStopDto busStopDto);
    BusStop getBusStopById(Long id);
    BusStop updateBusStop(Long id, BusStopDto busStopDto);
    void deleteBusStop(Long id);
    Optional<BusStop> findBusStopByName(String name);
}
