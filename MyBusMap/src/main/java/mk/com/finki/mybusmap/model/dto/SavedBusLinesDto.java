package mk.com.finki.mybusmap.model.dto;

import lombok.Data;

import java.util.List;

@Data
public class SavedBusLinesDto {
    private String email;
    private List<Long> busLineIds;
}
