import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./App.css";
import data from "./data/data.json";
import Header from "./components/Header";


function App() {
  // Managing state for Trucks to track if "clicked" or not
  const [activeTruck, setActiveTruck] = useState(null);

  return (
    <div className="App">
      <div className="page-container">
        <MapContainer
          className="leaflet-container"
          //  Starting point when page renders
          center={[37.77949545478787, -122.41927388849264]}
          zoom={13}
          scrollWheelZoom={true}
        >

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

          {/* Map over the data, give the marker id & coordinates */}
          {data.map((truck) => (
            <Marker
              key={truck.objectid}
              position={[truck.latitude, truck.longitude]}
              // handle user click and update state
              eventHandlers={{
                click: () => {
                  setActiveTruck(truck);
                },
              }}
            ></Marker>
          ))}
          {activeTruck && (
            <Popup
              position={[activeTruck.latitude, activeTruck.longitude]}
              onClose={() => {
                setActiveTruck(null);
              }}
            >
              <div>
                <h2>
                  <b>{activeTruck.applicant}</b>
                </h2>
                <p>
                  <b>Food Offered:</b>
                  <br />
                  {activeTruck.fooditems}
                </p>
                <p>
                  <b>Truck Type:</b>
                  <br />
                  {activeTruck.facilitytype}
                </p>
                <p>
                  <b>Address:</b>
                  <br />
                  {activeTruck.address}
                </p>
              </div>
            </Popup>
          )}
        </MapContainer>
        <Header />
      </div>
    </div>
  );
}

export default App;
