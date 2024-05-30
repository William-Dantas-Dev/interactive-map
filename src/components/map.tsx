// components/Map.tsx
import React, { useState } from 'react';
import { MapContainer, ImageOverlay, Marker, Popup, useMapEvent } from 'react-leaflet';
import { LatLngBoundsExpression, LatLngExpression, Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Defina a URL do ícone personalizado
const customIconUrl = 'https://cdn.jsdelivr.net/npm/leaflet@1.7.1/dist/images/marker-icon.png';

// Crie um ícone personalizado
const customIcon = new Icon({
  iconUrl: customIconUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

const bounds: LatLngBoundsExpression = [
  [51.56, -0.2], // Novo canto superior esquerdo (latitude, longitude)
  [51.53, -0.12] // Canto inferior direito (latitude, longitude)
]; 

const maxBounds: LatLngBoundsExpression = [
  [51.56, -0.2], // Canto superior esquerdo (latitude, longitude)
  [51.53, -0.12] // Canto inferior direito (latitude, longitude)
]; 

const minZoom = 15;
const maxZoom = 20;
const defaultZoom = 16;

const Map: React.FC = () => {
  const [markers, setMarkers] = useState<LatLngExpression[]>([]);

  const handleClick = (e: any) => {
    const { lat, lng } = e.latlng;
    console.log(e.latlng);
    setMarkers([...markers, [lat, lng]]);
  };

  return (
    <MapContainer 
      bounds={bounds} 
      maxBounds={maxBounds} 
      style={{ height: '100vh', width: '100vw', backgroundColor: 'black', overflow: 'hidden'}}
      minZoom={minZoom}
      maxZoom={maxZoom}
      zoom={defaultZoom}
      attributionControl={false} // Remover o ícone de atribuição do Leaflet
      className='h-full w-full'
    >
      <ImageOverlay url="/map.jpg" // Caminho para a sua imagem local
          bounds={bounds}
        />
        {markers.map((position, index) => (
          <Marker key={index} position={position} icon={customIcon}>
            <Popup>
              Mark {index + 1}
            </Popup>
          </Marker>
        ))}
        <ClickHandler handleClick={handleClick} />
      </MapContainer>
  );
};

const ClickHandler: React.FC<{ handleClick: (e: any) => void }> = ({ handleClick }) => {
  useMapEvent('click', handleClick);
  return null;
};

export default Map;
