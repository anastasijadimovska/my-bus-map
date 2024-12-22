package mk.com.finki.mybusmap.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BusSchedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "bus_stop_id")
    private BusStop busStop;
    @ManyToOne
    @JoinColumn(name = "bus_id")
    private Bus bus;
    private LocalTime arrivalTime;
}
