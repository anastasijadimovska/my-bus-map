package mk.com.finki.mybusmap.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import mk.com.finki.mybusmap.exceptions.ResourceNotFoundException;
import mk.com.finki.mybusmap.model.Bus;
import mk.com.finki.mybusmap.model.BusSchedule;
import mk.com.finki.mybusmap.model.BusStop;
import mk.com.finki.mybusmap.model.dto.BusScheduleDto;
import mk.com.finki.mybusmap.repository.BusRepository;
import mk.com.finki.mybusmap.repository.BusScheduleRepository;
import mk.com.finki.mybusmap.repository.BusStopRepository;
import mk.com.finki.mybusmap.service.BusScheduleService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class BusScheduleServiceImpl implements BusScheduleService {
    private final BusRepository busRepository;
    private final BusStopRepository busStopRepository;
    private final BusScheduleRepository busScheduleRepository;

    @Override
    public List<BusSchedule> getAllBusSchedules() {
        return busScheduleRepository.findAll();
    }

    @Override
    public BusSchedule createBusSchedule(BusScheduleDto busScheduleDto) {
        Bus bus = busRepository.findById(busScheduleDto.getBusId()).orElseThrow(() -> {
            log.error("Bus with id {} not found", busScheduleDto.getBusId());
            return new ResourceNotFoundException("Bus with id "+ busScheduleDto.getBusId() +" not found");
        });
        BusStop busStop = busStopRepository.findById(busScheduleDto.getBusStopId()).orElseThrow(() -> {
            log.error("Bus stop with id {} not found", busScheduleDto.getBusStopId());
            return new ResourceNotFoundException("Bus stop with id "+ busScheduleDto.getBusStopId() +" not found");
        });
        BusSchedule busSchedule = new BusSchedule();
        busSchedule.setBus(bus);
        busSchedule.setBusStop(busStop);
        busSchedule.setArrivalTime(busScheduleDto.getArrivalTime());
        BusSchedule savedBusSchedule = busScheduleRepository.save(busSchedule);
        log.info("Bus schedule for bus {} and bus stop {} has been created", bus.getBusNumber(), busStop.getName());
        return savedBusSchedule;
    }

    @Override
    public BusSchedule getBusScheduleById(Long id) {
        return busScheduleRepository.findById(id).orElseThrow(() -> {
            log.error("Bus schedule with id {} not found", id);
            return new ResourceNotFoundException("Bus schedule with id "+ id +" not found");
        });
    }

    @Override
    public BusSchedule updateBusSchedule(Long id, BusScheduleDto busScheduleDto) {
        BusSchedule busSchedule = busScheduleRepository.findById(id).orElseThrow(() -> {
            log.error("Bus schedule with id {} not found", id);
            return new ResourceNotFoundException("Bus schedule with id "+ id +" not found");
        });
        Bus bus = busRepository.findById(busScheduleDto.getBusId()).orElseThrow(() -> {
            log.error("Bus with id {} not found", busScheduleDto.getBusId());
            return new ResourceNotFoundException("Bus with id "+ busScheduleDto.getBusId() +" not found");
        });
        BusStop busStop = busStopRepository.findById(busScheduleDto.getBusStopId()).orElseThrow(() -> {
            log.error("Bus stop with id {} not found", busScheduleDto.getBusStopId());
            return new ResourceNotFoundException("Bus stop with id "+ busScheduleDto.getBusStopId() +" not found");
        });
        busSchedule.setBus(bus);
        busSchedule.setBusStop(busStop);
        busSchedule.setArrivalTime(busScheduleDto.getArrivalTime());
        BusSchedule updatedBusSchedule = busScheduleRepository.save(busSchedule);
        log.info("Bus schedule for bus {} and bus stop {} has been successfully updated", bus.getBusNumber(), busStop.getName());
        return updatedBusSchedule;
    }

    @Override
    public void deleteBusSchedule(Long id) {
        busScheduleRepository.deleteById(id);
        log.info("Bus schedule with id {} has been successfully deleted", id);
    }
}
