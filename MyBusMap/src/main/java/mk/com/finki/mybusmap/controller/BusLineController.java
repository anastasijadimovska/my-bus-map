package mk.com.finki.mybusmap.controller;

import lombok.RequiredArgsConstructor;
import mk.com.finki.mybusmap.model.BusLine;
import mk.com.finki.mybusmap.model.dto.BusLineDto;
import mk.com.finki.mybusmap.service.BusLineService;
import mk.com.finki.mybusmap.service.BusScheduleService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bus-line")
@RequiredArgsConstructor
public class BusLineController {
    private final BusLineService busLineService;
    private final BusScheduleService busScheduleService;


    @GetMapping
    public List<BusLine> getAllBusLines() {
        return busLineService.getAllBusLines();
    }

    @GetMapping("/{id}")
    public BusLine getBusLineById(@PathVariable Long id) {
        return busLineService.getBusLineById(id);
    }

    @PostMapping("/add")
    public BusLine createBusLine(@RequestBody BusLineDto busLineDto) {
        return busLineService.createBusLine(busLineDto);
    }

    @PostMapping("/edit/{id}")
    public BusLine updateBusLine(@PathVariable Long id, @RequestBody BusLineDto busLineDto) {
        return busLineService.updateBusLine(id, busLineDto);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteBusLine(@PathVariable Long id) {
        busLineService.deleteBusLine(id);
    }

    @GetMapping("/filter")
    public List<BusLine> getBusLinesBetweenStops(@RequestParam String fromStopName, @RequestParam String toStopName) {
        return busScheduleService.getBusLinesBetweenStops(fromStopName, toStopName);
    }
}