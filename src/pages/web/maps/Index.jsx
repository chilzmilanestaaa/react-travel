//import hook from react
import React, { useEffect, useState, useRef } from "react";

//import layout web
import LayoutWeb from "../../../layouts/Web";

//import BASE URL API
import Api from "../../../api";

//import mapbox gl
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

//api key mapbox
mapboxgl.accessToken = import.meta.env.VITE_APP_MAPBOX;

function WebMapsIndex() {

    //title page
    document.title = "Maps - TRAVEL GIS - Website Wisata Berbasis GIS (Geographic Information System)";

    //map container
    const mapContainer = useRef(null);
    const mapRef = useRef(null); // <- untuk mencegah map duplikasi

    //state coordinate
    const [coordinates, setCoordinates] = useState([]);

    //fetch data API
    const fetchDataPlaces = async () => {
        try {
            const response = await Api.get('/api/web/all_places');
            setCoordinates(response.data.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    //load data once
    useEffect(() => {
        fetchDataPlaces();
    }, []);

    //load map after coordinates ready
    useEffect(() => {
    if (coordinates.length === 0) return;

    // Jangan buat map baru kalau sudah ada
    if (!mapRef.current) {
        mapRef.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [116.5519982204172, -2.8989093904502283],
            zoom: 4
        });
    }

    const map = mapRef.current;

    coordinates.forEach((location) => {
        const lat = Number(location.latitude);
        const lng = Number(location.longitude);

        if (
            !isNaN(lat) &&
            !isNaN(lng) &&
            lat >= -90 &&
            lat <= 90 &&
            lng >= -180 &&
            lng <= 180
        ) {
            const popup = new mapboxgl.Popup().setHTML(`
                <h6>${location.title}</h6>
                <hr/>
                <p><i class="fa fa-map-marker"></i> <i>${location.address}</i></p>
                <hr/>
                <div class="d-grid gap-2">
                    <a href="/places/${location.slug}" class="btn btn-sm btn-success btn-block text-white">
                        Lihat Selengkapnya
                    </a>
                </div>
            `);

            new mapboxgl.Marker()
                .setLngLat([lng, lat])
                .setPopup(popup)
                .addTo(map);
        } else {
            console.warn("⚠ Invalid coordinates skipped:", location);
        }
    });

    // remove map hanya saat komponen unmount
    return () => {
        if (mapRef.current) {
            mapRef.current.remove();
            mapRef.current = null;
        }
    };

}, [coordinates]);


    return (
        <React.Fragment>
            <LayoutWeb>
                <div className="container mt-80">
                    <div className="row">
                        <div className="col-md-12 mb-5">
                            <div className="card border-0 rounded shadow-sm">
                                <div className="card-body">
                                    <h5><i className="fa fa-map-marked-alt"></i> SEMUA DATA VERSI MAPS</h5>
                                    <hr />
                                    <div
                                        ref={mapContainer}
                                        className="map-container"
                                        style={{ height: "450px" }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutWeb>
        </React.Fragment>   
    );
}

export default WebMapsIndex;
