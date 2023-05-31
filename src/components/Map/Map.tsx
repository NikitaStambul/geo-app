import React from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Place } from '../../types/Place';
import pin from '../../assets/icons/pin.png';
import { Icon } from 'leaflet';
import { PopupContent } from '../PopupContent';

interface Props {
  places: Place[];
}

export const Map = (props: Props) => {
  const icon = new Icon({
    iconUrl: pin,
    iconSize: [60, 60],
  });

  return (
    <MapContainer center={[50, 15]} zoom={5}>
      <TileLayer
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {props.places.map((place) => {
        const { id, latitude, longitude } = place;

        return (
          <Marker key={id} position={[+latitude, +longitude]} icon={icon}>
            <Popup>
              <PopupContent place={place} />
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};