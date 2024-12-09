package mk.com.finki.mybusmap.model.dto;

import lombok.Data;

@Data
public class BusStopDto {
    private String name;
    private double longitude;
    private double latitude;
}
