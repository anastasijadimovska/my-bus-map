package mk.com.finki.mybusmap.model.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class BusScheduleDto {
    private Long busId;
    private Long busStopId;
    private LocalDateTime arrivalTime;
}
