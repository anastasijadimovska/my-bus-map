package mk.com.finki.mybusmap.controllers;

import lombok.RequiredArgsConstructor;
import mk.com.finki.mybusmap.model.BusSchedule;
import mk.com.finki.mybusmap.model.dto.BusScheduleDto;
import mk.com.finki.mybusmap.service.BusScheduleService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bus-schedule")
@RequiredArgsConstructor
public class BusScheduleController {
    private final BusScheduleService busScheduleService;

    @GetMapping
    public List<BusSchedule> getAllBusSchedules() {
        return busScheduleService.getAllBusSchedules();
    }

    @GetMapping("/{id}")
    public BusSchedule getBusScheduleById(@PathVariable Long id) {
        return busScheduleService.getBusScheduleById(id);
    }

    @PostMapping("/add")
    public BusSchedule createBusSchedule(@RequestBody BusScheduleDto busScheduleDto) {
        return busScheduleService.createBusSchedule(busScheduleDto);
    }

    @PostMapping("/edit/{id}")
    public BusSchedule updateBusSchedule(@PathVariable Long id, @RequestBody BusScheduleDto busScheduleDto) {
        return busScheduleService.updateBusSchedule(id, busScheduleDto);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteBusSchedule(@PathVariable Long id) {
        busScheduleService.deleteBusSchedule(id);
    }
}
