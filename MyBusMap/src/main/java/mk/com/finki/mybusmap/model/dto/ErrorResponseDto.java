package mk.com.finki.mybusmap.model.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class ErrorResponseDto {
    private  String api_path;
    private HttpStatus error_code;
    private  String error_message;
    private LocalDateTime error_time;
}
