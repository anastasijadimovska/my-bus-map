import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const HeaderNav = () => {
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);

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
                {/* Logo */}
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

                {/* Hamburger Toggle Button */}
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

                {/* Collapsible Menu */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <style>
                        {`
                            .nav-link {
                                position: relative;
                                text-decoration: none;
                                color: #08374b;
                                transition: color 0.3s ease;
                            }
                            .nav-link:hover {
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
                            .nav-link:hover::after {
                                width: 100%;
                            }
                        `}
                    </style>
                    <ul className="navbar-nav mx-auto" style={{ display: "flex", gap: "20px" }}>
                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                to="/home"
                                style={{
                                    fontFamily: "'M PLUS Rounded 1c', sans-serif",
                                    fontWeight: "600",
                                    fontSize: "1.3rem",
                                }}
                            >
                                Дома
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                to="/buses"
                                style={{
                                    fontFamily: "'M PLUS Rounded 1c', sans-serif",
                                    fontWeight: "600",
                                    fontSize: "1.3rem",
                                }}
                            >
                                Автобуси
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                to="/bus-lines"
                                style={{
                                    fontFamily: "'M PLUS Rounded 1c', sans-serif",
                                    fontWeight: "600",
                                    fontSize: "1.3rem",
                                }}
                            >
                                Линии
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                to="/schedules"
                                style={{
                                    fontFamily: "'M PLUS Rounded 1c', sans-serif",
                                    fontWeight: "600",
                                    fontSize: "1.3rem",
                                }}
                            >
                                Распоред
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                to="/bus-stops"
                                style={{
                                    fontFamily: "'M PLUS Rounded 1c', sans-serif",
                                    fontWeight: "600",
                                    fontSize: "1.3rem",
                                }}
                            >
                                Постојки
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Weather and Buttons */}
                <div className="d-flex align-items-center" style={{ gap: "15px" }}>
                    {/* Weather Info */}
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
                                    style={{
                                        width: "50px",
                                        height: "50px",
                                    }}
                                />
                                <span>
                                    {weather.name},{" "}
                                    {weather.main.temp.toFixed(1)}°C
                                </span>
                            </div>
                        ) : error ? (
                            <span>{error}</span>
                        ) : (
                            <span>Loading weather...</span>
                        )}
                    </div>

                    {/* Buttons */}
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
                            onMouseEnter={(e) => (e.target.style.backgroundColor = "#49dede")}
                            onMouseLeave={(e) => (e.target.style.backgroundColor = "#08374b")}
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
                            onMouseEnter={(e) =>
                                (e.target.style.backgroundColor = "#08374b") &&
                                (e.target.style.color = "#ffffff")
                            }
                            onMouseLeave={(e) =>
                                (e.target.style.backgroundColor = "#ffffff") &&
                                (e.target.style.color = "#08374b")
                            }
                        >
                            Регистрација
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default HeaderNav;
