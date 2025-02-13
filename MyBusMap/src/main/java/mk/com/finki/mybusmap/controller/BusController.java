package mk.com.finki.mybusmap.controller;

import lombok.RequiredArgsConstructor;
import mk.com.finki.mybusmap.model.Bus;
import mk.com.finki.mybusmap.model.dto.BusDto;
import mk.com.finki.mybusmap.service.BusService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/bus")
@RequiredArgsConstructor
public class BusController {
    private final BusService busService;

    @GetMapping
    public List<Bus> getAllBuses() {
        return busService.getAllBuses();
    }

    @GetMapping("/{id}")
    public Bus getBusById(@PathVariable Long id) {
        return busService.getBusById(id);
    }

    @GetMapping("/number/{busNumber}")
    public Bus getBusByNumber(@PathVariable String busNumber) {
        return busService.getBusByNumber(busNumber);
    }

    @PostMapping("/add")
    public Bus createBus(@RequestBody BusDto busDto) {
        return busService.createBus(busDto);
    }

    @PostMapping("/edit/{id}")
    public Bus updateBus(@PathVariable Long id, @RequestBody BusDto busDto) {
        return busService.updateBus(id, busDto);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteBus(@PathVariable Long id) {
        busService.deleteBus(id);
    }
}
