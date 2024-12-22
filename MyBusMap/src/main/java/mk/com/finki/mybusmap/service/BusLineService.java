package mk.com.finki.mybusmap.service;

import mk.com.finki.mybusmap.model.BusLine;
import mk.com.finki.mybusmap.model.dto.BusLineDto;

import java.util.List;

public interface BusLineService {
    List<BusLine> getAllBusLines();
    BusLine createBusLine(BusLineDto busLineDto);
    BusLine getBusLineById(Long id);
    BusLine updateBusLine(Long id, BusLineDto busLineDto);
    void deleteBusLine(Long id);
}
