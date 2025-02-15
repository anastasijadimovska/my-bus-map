package mk.com.finki.mybusmap.data;

import jakarta.annotation.PostConstruct;
import mk.com.finki.mybusmap.model.*;
import mk.com.finki.mybusmap.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Component
public class DataInitializer {
    @Autowired
    private BusRepository busRepository;

    @Autowired
    private BusStopRepository busStopRepository;

    @Autowired
    private BusLineRepository busLineRepository;

    @Autowired
    private BusScheduleRepository busScheduleRepository;

    @Autowired
    private SavedBusLinesRepository savedBusLinesRepository;

    @Autowired
    private UserInfoRepository userInfoRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    @PostConstruct
    public void init() {
        Bus bus1 = new Bus();
        bus1.setBusNumber("1");
        bus1.setOwnerName("ДООЕЛ ЛУКА ЕКСПРЕС - БИТОЛА");
        bus1 = busRepository.save(bus1);

        Bus bus2 = new Bus();
        bus2.setBusNumber("4");
        bus2.setOwnerName("ТРАНСКОП АД - БИТОЛА");
        bus2 = busRepository.save(bus2);

        Bus bus5 = new Bus();
        bus5.setBusNumber("5");
        bus5.setOwnerName("ДООЕЛ ГОПЕШ ТРАНС - БИТОЛА");
        bus5 = busRepository.save(bus5);

        List<BusStop> stops = List.of(
                new BusStop(null, "Дисконт", 43.33, 45.44),
                new BusStop(null, "Болница", 21.319858, 41.024626),
                new BusStop(null, "Ракометно",21.337699, 41.023472),
                new BusStop(null, "Ат Пазар", 21.341623, 41.03190),
                new BusStop(null, "Шехерезада",21.33448, 41.03202),
                new BusStop(null, "Горно Оризари", 21.341813,  41.052243)
        );
        List<BusStop> savedStops = busStopRepository.saveAll(stops);

        BusLine line1 = new BusLine();
        line1.setName("Линија 1");
        line1.setBus(bus1);
        line1 = busLineRepository.save(line1);

        BusLine line4 = new BusLine();
        line4.setName("Линија 4");
        line4.setBus(bus2);
        line4 = busLineRepository.save(line4);

        BusLine line5 = new BusLine();
        line5.setName("Линија 5");
        line5.setBus(bus5);
        line5 = busLineRepository.save(line5);

//        List<BusSchedule> line1Schedules = List.of(
//                new BusSchedule(null, savedStops.get(0), bus1, line1, LocalTime.of(6, 20)),
//                new BusSchedule(null, savedStops.get(1), bus1, line1, LocalTime.of(6, 30)),
//                new BusSchedule(null, savedStops.get(2), bus1, line1, LocalTime.of(6, 35)),
//                new BusSchedule(null, savedStops.get(3), bus1, line1, LocalTime.of(6, 45))
//        );
//        List<BusSchedule> savedLine1Schedules = busScheduleRepository.saveAll(line1Schedules);
//        line1.setBusSchedules(savedLine1Schedules);
//        busLineRepository.save(line1);
//
//        List<BusSchedule> line4Schedules = List.of(
//                new BusSchedule(null, savedStops.get(4), bus2, line4, LocalTime.of(6, 15)),
//                new BusSchedule(null, savedStops.get(1), bus2, line4, LocalTime.of(6, 25)),
//                new BusSchedule(null, savedStops.get(3), bus2, line4, LocalTime.of(6, 35)),
//                new BusSchedule(null, savedStops.get(5), bus2, line4, LocalTime.of(6, 45))
//        );
//        List<BusSchedule> savedLine4Schedules = busScheduleRepository.saveAll(line4Schedules);
//        line4.setBusSchedules(savedLine4Schedules);
//        busLineRepository.save(line4);
//
//        List<BusSchedule> schedules = new ArrayList<>();
//
//        schedules.add(new BusSchedule(null, savedStops.get(0), bus5, line5, LocalTime.of(6, 15)));
//        schedules.add(new BusSchedule(null, savedStops.get(0), bus5, line5, LocalTime.of(7, 0)));
//        schedules.add(new BusSchedule(null, savedStops.get(0), bus5, line5, LocalTime.of(7, 45)));
//        schedules.add(new BusSchedule(null, savedStops.get(0), bus5, line5, LocalTime.of(8, 30)));
//
//        schedules.add(new BusSchedule(null, savedStops.get(1), bus5, line5, LocalTime.of(6, 25)));
//        schedules.add(new BusSchedule(null, savedStops.get(1), bus5, line5, LocalTime.of(7, 10)));
//        schedules.add(new BusSchedule(null, savedStops.get(1), bus5, line5, LocalTime.of(7, 55)));
//        schedules.add(new BusSchedule(null, savedStops.get(1), bus5, line5, LocalTime.of(8, 40)));
//
//        schedules.add(new BusSchedule(null, savedStops.get(2), bus5, line5, LocalTime.of(6, 30)));
//        schedules.add(new BusSchedule(null, savedStops.get(2), bus5, line5, LocalTime.of(7, 15)));
//        schedules.add(new BusSchedule(null, savedStops.get(2), bus5, line5, LocalTime.of(8, 0)));
//        schedules.add(new BusSchedule(null, savedStops.get(2), bus5, line5, LocalTime.of(8, 45)));
//
//        schedules.add(new BusSchedule(null, savedStops.get(3), bus5, line5, LocalTime.of(6, 40)));
//        schedules.add(new BusSchedule(null, savedStops.get(3), bus5, line5, LocalTime.of(7, 25)));
//        schedules.add(new BusSchedule(null, savedStops.get(3), bus5, line5, LocalTime.of(8, 10)));
//        schedules.add(new BusSchedule(null, savedStops.get(3), bus5, line5, LocalTime.of(8, 55)));
//
//        List<BusSchedule> savedSchedules = busScheduleRepository.saveAll(schedules);
//
//        line5.setBusSchedules(savedSchedules);
//        busLineRepository.save(line5);

        UserInfo userInfo = new UserInfo();
        userInfo.setEmail("john.doe@gmail.com");
        userInfo.setPassword(passwordEncoder.encode("Test123!"));
        userInfo.setRoles("ROLE_USER");
        userInfoRepository.save(userInfo);

        UserInfo userInfo1 = new UserInfo();
        userInfo1.setEmail("example@gmail.com");
        userInfo1.setPassword(passwordEncoder.encode("Test123!"));
        userInfo1.setRoles("ROLE_USER");
        userInfoRepository.save(userInfo1);

        SavedBusLines savedBusLines = new SavedBusLines();
        savedBusLines.setBusLines(List.of(line1));
        savedBusLines.setUserInfo(userInfo);
        savedBusLinesRepository.save(savedBusLines);

        SavedBusLines savedBusLines1 = new SavedBusLines();
        savedBusLines1.setBusLines(List.of(line1, line5));
        savedBusLines1.setUserInfo(userInfo1);
        savedBusLinesRepository.save(savedBusLines1);
    }
}
