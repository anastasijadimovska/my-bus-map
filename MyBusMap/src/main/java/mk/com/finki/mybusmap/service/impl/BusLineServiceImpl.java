package mk.com.finki.mybusmap.service.impl;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import mk.com.finki.mybusmap.model.Bus;
import mk.com.finki.mybusmap.model.BusLine;
import mk.com.finki.mybusmap.model.dto.BusLineDto;
import mk.com.finki.mybusmap.repository.BusLineRepository;
import mk.com.finki.mybusmap.repository.BusRepository;
import mk.com.finki.mybusmap.service.BusLineService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class BusLineServiceImpl implements BusLineService {
    private final BusLineRepository busLineRepository;
    private final BusRepository busRepository;

    @Override
    public List<BusLine> getAllBusLines() {
        return busLineRepository.findAll();
    }

    @Override
    public BusLine getBusLineById(Long id) {
        return busLineRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("BusLine not found with ID: " + id));
    }

    @Override
    public BusLine createBusLine(BusLineDto busLineDto) {
        Bus bus = busRepository.findById(busLineDto.getBusId())
                .orElseThrow(() -> new RuntimeException("Bus not found with ID: " + busLineDto.getBusId()));

        BusLine busLine = new BusLine();
        busLine.setName(busLineDto.getName());
        busLine.setBus(bus);

        return busLineRepository.save(busLine);
    }

    @Override
    public BusLine updateBusLine(Long id, BusLineDto busLineDto) {
        BusLine busLine = busLineRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("BusLine not found with ID: " + id));

        Bus bus = busRepository.findById(busLineDto.getBusId())
                .orElseThrow(() -> new RuntimeException("Bus not found with ID: " + busLineDto.getBusId()));

        busLine.setName(busLineDto.getName());
        busLine.setBus(bus);

        return busLineRepository.save(busLine);
    }

    @Override
    public void deleteBusLine(Long id) {
        busLineRepository.deleteById(id);
        log.info("Bus line with id {} has been successfully deleted", id);
    }
}
