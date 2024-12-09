package mk.com.finki.mybusmap.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import mk.com.finki.mybusmap.exceptions.ResourceNotFoundException;
import mk.com.finki.mybusmap.model.Bus;
import mk.com.finki.mybusmap.model.dto.BusDto;
import org.springframework.stereotype.Service;
import mk.com.finki.mybusmap.repository.BusRepository;
import mk.com.finki.mybusmap.service.BusService;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class BusServiceImpl implements BusService {
    private final BusRepository busRepository;

    @Override
    public List<Bus> getAllBuses() {
        return busRepository.findAll();
    }

    @Override
    public Bus createBus(BusDto busDto) {
        Bus bus = new Bus();
        bus.setBusNumber(busDto.getBusNumber());
        bus.setOwnerName(busDto.getOwnerName());
        Bus savedBus = busRepository.save(bus);
        log.info("Bus with number {} has been created", bus.getBusNumber());
        return savedBus;
    }

    @Override
    public Bus getBusById(Long id) {
        return busRepository.findById(id).orElseThrow(() -> {
            log.error("Bus with id {} not found", id);
            return new ResourceNotFoundException("Bus with id "+ id +" not found");
        });
    }

    @Override
    public Bus getBusByNumber(String busNumber) {
        return busRepository.findByBusNumber(busNumber).orElseThrow(() -> {
            log.error("Bus with number {} not found", busNumber);
            return new ResourceNotFoundException("Bus with number "+ busNumber +" not found");
        });
    }

    @Override
    public Bus updateBus(Long id, BusDto busDto) {
        Bus bus = busRepository.findById(id).orElseThrow(() -> {
                log.error("Bus with id {} not found", id);
                return new ResourceNotFoundException("Bus with id "+ id +" not found");
        });
        bus.setBusNumber(busDto.getBusNumber());
        bus.setOwnerName(busDto.getOwnerName());
        Bus savedBus = busRepository.save(bus);
        log.info("Bus with number {} has been successfully updated", bus.getBusNumber());
        return savedBus;
    }

    @Override
    public void deleteBus(Long id) {
        busRepository.deleteById(id);
        log.info("Bus with id {} has been deleted", id);
    }
}
