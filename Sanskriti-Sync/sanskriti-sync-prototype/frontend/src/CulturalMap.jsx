import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet React
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function CulturalMap() {
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        // Fetch verified cultural heritage entries from Django API
        axios.get('http://127.0.0.1:8000/api/archive/')
            .then(res => setEntries(res.data))
            .catch(err => console.error("Error fetching map data:", err));
    }, []);

    return (
        <div style={{ height: '500px', width: '100%', borderRadius: '12px', overflow: 'hidden' }}>
            <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {entries.map(item => (
                    <Marker key={item.id} position={[item.latitude, item.longitude]}>
                        <Popup>
                            <div>
                                <h3 style={{ margin: '0 0 5px 0' }}>{item.title}</h3>
                                <p style={{ margin: 0 }}><strong>Category:</strong> {item.category}</p>
                                <p style={{ margin: 0 }}><strong>Region:</strong> {item.district}, {item.state}</p>
                                <span style={{
                                    display: 'inline-block',
                                    marginTop: '8px',
                                    padding: '3px 8px',
                                    borderRadius: '4px',
                                    fontSize: '12px',
                                    color: '#fff',
                                    backgroundColor: item.preservation_status === 'ENDANGERED' ? '#d9534f' : '#5cb85c'
                                }}>
                                    {item.preservation_status}
                                </span>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}