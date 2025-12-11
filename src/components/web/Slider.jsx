import React, { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import Api from "../../api";

function Slider() {

    const [sliders, setSliders] = useState([]);

    const fetchDataSliders = async () => {
        try {
            const response = await Api.get("/api/web/sliders");

            setSliders(response?.data?.data || []); // aman
        } catch (error) {
            console.error("Sliders API error:", error);
            setSliders([]);
        }
    };

    useEffect(() => {
        fetchDataSliders();
    }, []);

    return (
        <Carousel
            prevIcon={<i className="fa fa-chevron-left fa-lg carousel-custom text-dark shadow"></i>}
            nextIcon={<i className="fa fa-chevron-right fa-lg carousel-custom text-dark shadow"></i>}
        >
            {(sliders || []).map((slider) => (
                <Carousel.Item key={slider.id}>
                    <img
                        className="d-block w-100"
                        src={slider.image}
                        style={{ height: "500px", objectFit: "cover" }}
                        alt={slider.name || "Slider"}
                    />
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

export default Slider;
