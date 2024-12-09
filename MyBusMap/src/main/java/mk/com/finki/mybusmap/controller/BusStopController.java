package mk.com.finki.mybusmap.controller;

import lombok.RequiredArgsConstructor;
import mk.com.finki.mybusmap.model.BusStop;
import mk.com.finki.mybusmap.model.dto.BusStopDto;
import mk.com.finki.mybusmap.service.BusStopService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bus-stop")
@RequiredArgsConstructor
public class BusStopController {
    private final BusStopService busStopService;

    @GetMapping
    public List<BusStop> getAllBusStops() {
        return busStopService.getAllBusStops();
    }

    @GetMapping("/{id}")
    public BusStop getBusStopById(@PathVariable Long id) {
        return busStopService.getBusStopById(id);
    }

    @PostMapping("/add")
    public BusStop createBusStop(@RequestBody BusStopDto busStop) {
        return busStopService.createBusStop(busStop);
    }

    @PostMapping("/edit/{id}")
    public BusStop updateBusStop(@PathVariable Long id, @RequestBody BusStopDto busStop) {
        return busStopService.updateBusStop(id, busStop);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteBusStop(@PathVariable Long id) {
        busStopService.deleteBusStop(id);
    }
}
