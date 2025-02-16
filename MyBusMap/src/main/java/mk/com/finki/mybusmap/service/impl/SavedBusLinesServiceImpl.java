package mk.com.finki.mybusmap.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import mk.com.finki.mybusmap.exceptions.ResourceNotFoundException;
import mk.com.finki.mybusmap.model.BusLine;
import mk.com.finki.mybusmap.model.SavedBusLines;
import mk.com.finki.mybusmap.model.UserInfo;
import mk.com.finki.mybusmap.model.dto.SavedBusLinesDto;
import mk.com.finki.mybusmap.repository.BusLineRepository;
import mk.com.finki.mybusmap.repository.SavedBusLinesRepository;
import mk.com.finki.mybusmap.repository.UserInfoRepository;
import mk.com.finki.mybusmap.service.SavedBusLinesService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class SavedBusLinesServiceImpl implements SavedBusLinesService {
    private final SavedBusLinesRepository savedBusLinesRepository;
    private final UserInfoRepository userInfoRepository;
    private final BusLineRepository busLineRepository;

    @Override
    public SavedBusLines createSavedBusLines(SavedBusLinesDto savedBusLinesDto) {
        List<BusLine> busLines = busLineRepository.findAllById(savedBusLinesDto.getBusLineIds());
        UserInfo userInfo = userInfoRepository.findByEmail(savedBusLinesDto.getEmail()).orElseThrow(() -> {
            log.error("User info with id {} not found", savedBusLinesDto.getEmail());
            return new ResourceNotFoundException("User info with id "+ savedBusLinesDto.getEmail() +" not found");
        });
        SavedBusLines savedBusLines = new SavedBusLines();
        savedBusLines.setBusLines(busLines);
        savedBusLines.setUserInfo(userInfo);
        SavedBusLines savedSavedBusLines = savedBusLinesRepository.save(savedBusLines);
        log.info("Saved bus lines for user {} have been created", userInfo.getEmail());
        return savedSavedBusLines;
    }

    @Override
    public SavedBusLines getSavedBusLinesById(Long id) {
        return savedBusLinesRepository.findById(id).orElseThrow(() -> {
            log.error("Saved bus lines with id {} not found", id);
            return new ResourceNotFoundException("Saved bus lines with id "+ id +" not found");
        });
    }

    @Override
    public SavedBusLines getSavedBusLinesByUserInfoId(String email) {
        return savedBusLinesRepository.findByUserInfo_Email(email).orElseThrow(() -> {
            log.error("Saved bus lines for user with email {} not found", email);
            return new ResourceNotFoundException("Saved bus lines for user with email "+ email +" not found");
        });
    }

    @Override
    public SavedBusLines updateSavedBusLines(String email, SavedBusLinesDto savedBusLinesDto) {
        SavedBusLines foundSavedBusLines ;
        if(savedBusLinesRepository.findByUserInfo_Email(email).isEmpty()) {
            return createSavedBusLines(savedBusLinesDto);
        }
        foundSavedBusLines = savedBusLinesRepository.findByUserInfo_Email(email).orElseThrow(() -> {
            log.error("Saved bus lines for user with email {} not found", email);
            return new ResourceNotFoundException("Saved bus lines for user with email "+ email +" not found");
        });
        List<BusLine> busLines = busLineRepository.findAllById(savedBusLinesDto.getBusLineIds());
        UserInfo userInfo = userInfoRepository.findByEmail(savedBusLinesDto.getEmail()).orElseThrow(() -> {
            log.error("User info with id {} not found", savedBusLinesDto.getEmail());
            return new ResourceNotFoundException("User info with id "+ savedBusLinesDto.getEmail() +" not found");
        });
        List<BusLine> savedBusLines = foundSavedBusLines.getBusLines();
        savedBusLines.addAll(busLines);
        foundSavedBusLines.setBusLines(savedBusLines);
        foundSavedBusLines.setUserInfo(userInfo);
        SavedBusLines savedSavedBusLines = savedBusLinesRepository.save(foundSavedBusLines);
        log.info("Saved bus lines for user {} have been updated", userInfo.getEmail());
        return savedSavedBusLines;
    }

    @Override
    public void deleteSavedBusLines(Long id) {
        savedBusLinesRepository.deleteById(id);
        log.info("Saved bus lines with id {} have been deleted", id);
    }
}
