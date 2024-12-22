package mk.com.finki.mybusmap.service;

import mk.com.finki.mybusmap.model.SavedBusLines;
import mk.com.finki.mybusmap.model.dto.SavedBusLinesDto;

public interface SavedBusLinesService {
    SavedBusLines createSavedBusLines(SavedBusLinesDto savedBusLinesDto);
    SavedBusLines getSavedBusLinesById(Long id);
    SavedBusLines getSavedBusLinesByUserInfoId(String email);
    SavedBusLines updateSavedBusLines(Long id, SavedBusLinesDto savedBusLinesDto);
    void deleteSavedBusLines(Long id);
}
