package mk.com.finki.mybusmap.model.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.time.LocalTime;

@Data
public class BusScheduleDto {
    private Long busId;
    private Long busStopId;
    @Schema(example = "10:30:00")
    private LocalTime arrivalTime;
}
