// HeaderNav.js
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const HeaderNav = () => {
    const location = useLocation();
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Re-check login state on every route change
    useEffect(() => {
        setIsLoggedIn(!!localStorage.getItem("authToken"));
    }, [location]);

    // Fetch weather data
    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const apiKey = "dba061bf0951b0b23084972863347638";
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?q=Bitola&units=metric&appid=${apiKey}`
                );
                if (response.status === 200) {
                    setWeather(response.data);
                } else {
                    throw new Error("Failed to fetch weather data");
                }
            } catch (error) {
                console.error("Error fetching weather data:", error);
                setError("Unable to load weather information");
            }
        };

        fetchWeather();
    }, []);

    // Check if link is active based on current path
    const isActive = (path) => location.pathname === path;

    // Navigation items including the new "Мои Линии"
    const navItems = [
        { name: "Дома", path: "/home" },
        { name: "Автобуси", path: "/buses" },
        { name: "Линии", path: "/bus-lines" },
        { name: "Распоред", path: "/schedules" },
        { name: "Постојки", path: "/bus-stops" },
        { name: "Мапа", path: "/maps" },
        { name: "Мои Линии", path: "/saved-bus-lines" },
    ];

    // Logout function
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        setIsLoggedIn(false);
    };

    return (
        <nav
            className="navbar navbar-expand-lg"
            style={{
                backgroundColor: "#e1e1e1",
                padding: "8px 15px",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                fontFamily: "'Lora', serif",
                position: "sticky",
                top: "0",
                zIndex: "1000",
                height: "100px",
            }}
        >
            <div className="container-fluid">
                <Link
                    className="navbar-brand d-flex align-items-center"
                    to="/home"
                    style={{ textDecoration: "none" }}
                >
                    <img
                        src={require("./logoNav.png")}
                        alt="Logo"
                        style={{
                            height: "120px",
                            width: "auto",
                            marginRight: "10px",
                        }}
                    />
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <style>
                        {`
              .nav-link {
                position: relative;
                text-decoration: none;
                color: #08374b;
                transition: color 0.3s ease;
                font-family: 'M PLUS Rounded 1c', sans-serif;
                font-weight: 600;
                font-size: 1.3rem;
              }
              .nav-link:hover,
              .nav-link.active {
                color: #08374b;
              }
              .nav-link::after {
                content: "";
                position: absolute;
                bottom: -2px;
                left: 0;
                width: 0;
                height: 2px;
                background-color: #08374b;
                transition: width 0.3s ease;
              }
              .nav-link:hover::after,
              .nav-link.active::after {
                width: 100%;
              }
            `}
                    </style>
                    <ul
                        className="navbar-nav mx-auto"
                        style={{ display: "flex", gap: "20px" }}
                    >
                        {navItems.map((item) => (
                            <li className="nav-item" key={item.path}>
                                <Link
                                    className={`nav-link ${isActive(item.path) ? "active" : ""}`}
                                    to={item.path}
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Weather and Login/Register or User Greeting */}
                <div className="d-flex align-items-center" style={{ gap: "15px" }}>
                    <div
                        style={{
                            fontFamily: "'M PLUS Rounded 1c', serif",
                            fontSize: "1.2rem",
                            color: "#08374b",
                            fontWeight: "500",
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            marginRight: "18px",
                        }}
                    >
                        {weather ? (
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <img
                                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                                    alt={weather.weather[0].description}
                                    style={{ width: "50px", height: "50px" }}
                                />
                                <span>
                  {weather.name}, {weather.main.temp.toFixed(1)}°C
                </span>
                            </div>
                        ) : error ? (
                            <span>{error}</span>
                        ) : (
                            <span>Loading weather...</span>
                        )}
                    </div>

                    {isLoggedIn ? (
                        <div
                            style={{
                                marginLeft: "20px",
                                fontWeight: "bold",
                                fontFamily: "'M PLUS Rounded 1c', sans-serif",
                            }}
                        >
                            Здраво, корисник
                            <button
                                onClick={handleLogout}
                                className="btn btn-danger ms-3"
                                style={{
                                    fontFamily: "'M PLUS Rounded 1c', sans-serif",
                                    fontWeight: "600",
                                    textTransform: "uppercase",
                                    padding: "8px 20px",
                                    borderRadius: "20px",
                                    border: "none",
                                    transition: "all 0.3s ease",
                                }}
                            >
                                Одјава
                            </button>
                        </div>
                    ) : (
                        <div className="d-flex gap-2">
                            <Link
                                to="/login"
                                className="btn"
                                style={{
                                    fontFamily: "'M PLUS Rounded 1c', sans-serif",
                                    backgroundColor: "#08374b",
                                    color: "#ffffff",
                                    fontWeight: "600",
                                    textTransform: "uppercase",
                                    padding: "8px 20px",
                                    borderRadius: "20px",
                                    border: "none",
                                    transition: "all 0.3s ease",
                                }}
                                onMouseEnter={(e) =>
                                    (e.target.style.backgroundColor = "#49dede")
                                }
                                onMouseLeave={(e) =>
                                    (e.target.style.backgroundColor = "#08374b")
                                }
                            >
                                Најава
                            </Link>
                            <Link
                                to="/register"
                                className="btn"
                                style={{
                                    fontFamily: "'M PLUS Rounded 1c', sans-serif",
                                    backgroundColor: "#ffffff",
                                    color: "#08374b",
                                    fontWeight: "600",
                                    textTransform: "uppercase",
                                    padding: "8px 20px",
                                    borderRadius: "20px",
                                    border: "2px solid #08374b",
                                    transition: "all 0.3s ease",
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = "#08374b";
                                    e.target.style.color = "#ffffff";
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.backgroundColor = "#ffffff";
                                    e.target.style.color = "#08374b";
                                }}
                            >
                                Регистрација
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default HeaderNav;
