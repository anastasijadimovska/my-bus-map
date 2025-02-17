package mk.com.finki.mybusmap.config;

import lombok.RequiredArgsConstructor;
import mk.com.finki.mybusmap.model.SavedBusLines;
import mk.com.finki.mybusmap.model.dto.SavedBusLinesDto;
import mk.com.finki.mybusmap.service.SavedBusLinesService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/saved-bus-lines")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class SavedBusLinesController {
    private final SavedBusLinesService savedBusLinesService;

    @GetMapping("/{id}")
    public SavedBusLines getSavedBusLinesById(@PathVariable Long id) {
        return savedBusLinesService.getSavedBusLinesById(id);
    }

    @GetMapping("/user/{email}")
    public SavedBusLines getSavedBusLinesByUserInfoId(@PathVariable String email) {
        return savedBusLinesService.getSavedBusLinesByUserInfoId(email);
    }

    @PostMapping("/add")
    public SavedBusLines createSavedBusLines(@RequestBody SavedBusLinesDto savedBusLinesDto) {
        return savedBusLinesService.createSavedBusLines(savedBusLinesDto);
    }

    @PostMapping("/edit/{email}")
    public SavedBusLines updateSavedBusLines(@PathVariable String email, @RequestBody SavedBusLinesDto savedBusLinesDto) {
        return savedBusLinesService.updateSavedBusLines(email, savedBusLinesDto);
    }
    @GetMapping("/delete/{id}")
    public void deleteSavedBusLines(@PathVariable Long id) {
        savedBusLinesService.deleteSavedBusLines(id);
    }
}
