import React from "react";
import { FaBus, FaMapMarkerAlt, FaClock } from "react-icons/fa"; // Adding bus, map, and clock icons
import coverImage from './cover.jpg';

const HomePage = () => {
    return (
        <div
            style={{
                backgroundColor: "#e1e1e1",
                fontFamily: "'M PLUS Rounded 1c', sans-serif",
                color: "#08374b",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: "80px", // To give space if you already have a header
            }}
        >
            {/* Hero Section with Cover Image */}
            <div
                style={{
                    width: "100%",
                    height: "60vh",
                    backgroundImage: `url(${coverImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#fff",
                    textAlign: "center",
                    padding: "40px",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
                }}
            >
                <h1
                    style={{
                        fontSize: "4rem",
                        fontWeight: "bold",
                        marginBottom: "20px",
                    }}
                >
                    Вашите постојки во Битола, на дофат на рака!
                </h1>
                <p
                    style={{
                        fontSize: "1.3rem",
                        fontWeight: "600",
                        marginBottom: "30px",
                        maxWidth: "600px",
                    }}
                >
                    Преку нашата апликација можете да ги следите сите автобуси и да ги најдете најблиските
                    постојки во Битола.
                </p>
            </div>

            {/* Services Section with Icons */}
            <section
                style={{
                    padding: "40px 15px",
                    backgroundColor: "#fff",
                    maxWidth: "1200px",
                    margin: "50px auto",
                    borderRadius: "10px",
                    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                    textAlign: "center",
                }}
            >
                <h2
                    style={{
                        fontSize: "2.5rem",
                        fontWeight: "bold",
                        marginBottom: "40px",
                    }}
                >
                    Нашите Услуги
                </h2>

                <div className="row" style={{ display: "flex", justifyContent: "center" }}>
                    <div
                        className="col-md-4"
                        style={{
                            padding: "20px",
                            backgroundColor: "#e1e1e1",
                            borderRadius: "10px",
                            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                            margin: "15px",
                        }}
                    >
                        <FaBus
                            style={{
                                fontSize: "3rem",
                                color: "#08374b",
                                marginBottom: "20px",
                            }}
                        />
                        <h3 style={{ fontSize: "1.8rem", fontWeight: "bold", marginBottom: "15px" }}>
                            Следење на автобусите
                        </h3>
                        <p style={{ fontSize: "1.2rem" }}>
                            Следете ги сите автобуси низ градот Битола во реално време. Знајте точно кога
                            ќе пристигне вашиот автобус.
                        </p>
                    </div>

                    <div
                        className="col-md-4"
                        style={{
                            padding: "20px",
                            backgroundColor: "#e1e1e1",
                            borderRadius: "10px",
                            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                            margin: "15px",
                        }}
                    >
                        <FaMapMarkerAlt
                            style={{
                                fontSize: "3rem",
                                color: "#08374b",
                                marginBottom: "20px",
                            }}
                        />
                        <h3 style={{ fontSize: "1.8rem", fontWeight: "bold", marginBottom: "15px" }}>
                            Локации на постојките
                        </h3>
                        <p style={{ fontSize: "1.2rem" }}>
                            Најдете ги најблиските постојки и планирајте го вашето патување со нашата интерактивна
                            мапа.
                        </p>
                    </div>

                    <div
                        className="col-md-4"
                        style={{
                            padding: "20px",
                            backgroundColor: "#e1e1e1",
                            borderRadius: "10px",
                            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                            margin: "15px",
                        }}
                    >
                        <FaClock
                            style={{
                                fontSize: "3rem",
                                color: "#08374b",
                                marginBottom: "20px",
                            }}
                        />
                        <h3 style={{ fontSize: "1.8rem", fontWeight: "bold", marginBottom: "15px" }}>
                            Работно време
                        </h3>
                        <p style={{ fontSize: "1.2rem" }}>
                            Проверете ги нашите работни часови и планирајте го вашето патување со леснотија.
                        </p>
                    </div>
                </div>
            </section>

            {/* Testimonials Section with Quotes */}
            <section
                style={{
                    padding: "50px 15px",
                    backgroundColor: "#08374b",
                    color: "#fff",
                    textAlign: "center",
                }}
            >
                <h2
                    style={{
                        fontSize: "2.5rem",
                        fontWeight: "bold",
                        marginBottom: "30px",
                    }}
                >
                    Што велат нашите корисници?
                </h2>

                <div
                    className="row"
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: "30px",
                    }}
                >
                    <div
                        className="col-md-4"
                        style={{
                            padding: "30px",
                            backgroundColor: "#fff",
                            borderRadius: "10px",
                            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                            margin: "10px",
                        }}
                    >
                        <p style={{ fontSize: "1.3rem", fontStyle: "italic", marginBottom: "15px", color:"#08374b",}}>
                            "Оваа апликација ми заштеди многу време. Лесно можам да ги следам автобусите и да
                            знам кога точно ќе стигнам."
                        </p>
                        <h5 style={{ fontSize: "1.5rem", fontWeight: "bold", color:"#08374b",}}>Јована, корисник</h5>
                    </div>

                    <div
                        className="col-md-4"
                        style={{
                            padding: "30px",
                            backgroundColor: "#fff",
                            borderRadius: "10px",
                            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                            margin: "10px",
                        }}
                    >
                        <p style={{ fontSize: "1.3rem", fontStyle: "italic", marginBottom: "15px", color:"#08374b",}}>
                            "Едноставно и интуитивно. Без никаков проблем, секогаш знам кога да излезам од
                            дома."
                        </p>
                        <h5 style={{ fontSize: "1.5rem", fontWeight: "bold", color:"#08374b",}}>Михаил, редовен патник</h5>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
