package mk.com.finki.mybusmap.service;

import mk.com.finki.mybusmap.model.Bus;
import mk.com.finki.mybusmap.model.dto.BusDto;

import java.util.List;

public interface BusService {
    List<Bus> getAllBuses();
    Bus createBus(BusDto busDto);
    Bus getBusById(Long id);
    Bus getBusByNumber(String busNumber);
    Bus updateBus(Long id, BusDto busDto);
    void deleteBus(Long id);
}
