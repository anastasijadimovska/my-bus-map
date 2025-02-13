import React from "react";
import { FaFacebook, FaEnvelope, FaInstagram } from "react-icons/fa"; // Importing the icons from react-icons

const Footer = () => {
    return (
        <footer
            style={{
                backgroundColor: "#e1e1e1", // Same background as header
                color: "#08374b", // Same text color as header
                fontFamily: "'M PLUS Rounded 1c', sans-serif", // Same font as header
                padding: "40px 15px",
                boxShadow: "0px -4px 15px rgba(0, 0, 0, 0.1)", // Added shadow to footer
            }}
        >
            <div className="container p-4">
                <div className="row">
                    {/* First Column: Footer Content */}
                    <div className="col-lg-6 col-md-12 mb-4">
                        <h5
                            style={{
                                letterSpacing: "2px",
                                color: "#08374b",
                                marginBottom: "15px",
                                fontWeight: "bold",
                            }}
                        >
                            Контакт со нас
                        </h5>
                        <p style={{ fontSize: "1.2rem" }}>
                            Ние сме тука да ви помогнеме! Ако имате било какви прашања или потреби, контактирајте
                            нè преку некоја од нашите платформи. Моја Постојка е апликација за следење на автобуси
                            низ градот Битола, кои располага со 11 автобуси и 35 постојки.
                        </p>
                    </div>

                    {/* Second Column: Social Media Links */}
                    <div className="col-lg-3 col-md-6 mb-4">
                        <h5
                            style={{
                                letterSpacing: "2px",
                                color: "#08374b",
                                marginBottom: "15px",
                                fontWeight: "bold",
                            }}
                        >
                            Следете не
                        </h5>
                        <ul className="list-unstyled">
                            <li className="mb-1">
                                <a
                                    href="https://www.facebook.com"
                                    style={{ color: "#08374b", fontSize: "1.3rem", textDecoration: "none" }}
                                >
                                    <FaFacebook style={{ marginRight: "10px" }} />
                                    Facebook
                                </a>
                            </li>
                            <li className="mb-1">
                                <a
                                    href="mailto:someone@example.com"
                                    style={{ color: "#08374b", fontSize: "1.3rem", textDecoration: "none" }}
                                >
                                    <FaEnvelope style={{ marginRight: "10px" }} />
                                    Gmail
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.instagram.com"
                                    style={{ color: "#08374b", fontSize: "1.3rem", textDecoration: "none" }}
                                >
                                    <FaInstagram style={{ marginRight: "10px" }} />
                                    Instagram
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Third Column: Opening Hours */}
                    <div className="col-lg-3 col-md-6 mb-4">
                        <h5
                            style={{
                                letterSpacing: "2px",
                                color: "#08374b",
                                marginBottom: "15px",
                                fontWeight: "bold",
                            }}
                        >
                            Работно време
                        </h5>
                        <table
                            className="table"
                            style={{
                                color: "#08374b",
                                borderColor: "#08374b",
                                borderCollapse: "collapse",
                                fontSize: "20px",
                            }}
                        >
                            <tbody>
                            <tr>
                                <td>Пон - Пет:</td>
                                <td>8am - 9pm</td>
                            </tr>
                            <tr>
                                <td>Саб - Нед:</td>
                                <td>8am - 1am</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div
                className="text-center p-3"
                style={{
                    backgroundColor: "rgba(0, 0, 0, 0.2)",
                    color: "#08374b",
                    marginBottom: "0", // This removes the extra margin or space after the footer
                }}
            >
                © 2025 Copyright:
                <a className="text-dark" href="https://www.example.com" style={{ textDecoration: "none" }}>
                    mojapostojka.com
                </a>
            </div>
        </footer>
    );
};

export default Footer;
