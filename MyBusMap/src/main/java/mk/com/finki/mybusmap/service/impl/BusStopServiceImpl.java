package mk.com.finki.mybusmap.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import mk.com.finki.mybusmap.exceptions.ResourceNotFoundException;
import mk.com.finki.mybusmap.model.BusStop;
import mk.com.finki.mybusmap.model.dto.BusStopDto;
import mk.com.finki.mybusmap.repository.BusStopRepository;
import mk.com.finki.mybusmap.service.BusStopService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class BusStopServiceImpl implements BusStopService {
    private final BusStopRepository busStopRepository;

    @Override
    public List<BusStop> getAllBusStops() {
        return busStopRepository.findAll();
    }

    @Override
    public BusStop createBusStop(BusStopDto busStopDto) {
        BusStop busStop = new BusStop();
        busStop.setName(busStopDto.getName());
        busStop.setLatitude(busStopDto.getLatitude());
        busStop.setLongitude(busStopDto.getLongitude());
        BusStop savedBusStop = busStopRepository.save(busStop);
        log.info("Bus stop with name {} has been created", busStop.getName());
        return savedBusStop;
    }

    @Override
    public BusStop getBusStopById(Long id) {
        return busStopRepository.findById(id).orElseThrow(() -> {
            log.error("Bus stop with id {} not found", id);
            return new ResourceNotFoundException("Bus stop with id "+ id +" not found");
        });
    }

    @Override
    public BusStop updateBusStop(Long id, BusStopDto busStopDto) {
        BusStop busStop = busStopRepository.findById(id).orElseThrow(() -> {
            log.error("Bus stop with id {} not found", id);
            return new ResourceNotFoundException("Bus stop with id "+ id +" not found");
        });
        busStop.setName(busStopDto.getName());
        busStop.setLatitude(busStopDto.getLatitude());
        busStop.setLongitude(busStopDto.getLongitude());
        BusStop savedBusStop = busStopRepository.save(busStop);
        log.info("Bus stop with name {} has been successfully updated", busStop.getName());
        return savedBusStop;
    }

    @Override
    public void deleteBusStop(Long id) {
        busStopRepository.deleteById(id);
        log.info("Bus stop with id {} has been successfully deleted", id);
    }

    @Override
    public Optional<BusStop> findBusStopByName(String name) {
        return busStopRepository.findByName(name);
    }
}
