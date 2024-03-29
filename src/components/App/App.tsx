import React, { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { AddPlaceButton } from '../AddPlaceButton';
import { Crosshair } from '../Crosshair';
import { PopupForm } from '../PopupForm';
import { getAllPlaces } from '../../api/places';
import { Place } from '../../types/Place';
import { Map } from '../Map';
import { MapContainer } from 'react-leaflet';

function App() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [places, setPlaces] = useState<Place[]>([]);
  const [center, setCenter] = useState<number[]>([]);

  const getPlaces = async () => {
    const response = await getAllPlaces();
    setPlaces(response.data);
  };

  useEffect(() => {
    getPlaces();
  }, []);

  const handleAddClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    setIsFormVisible(true);
  };

  return (
    <>
      <MapContainer center={[50, 15]} zoom={5}>
        <Map places={places} reload={getPlaces} setCenter={setCenter}/>
        <AddPlaceButton onClick={handleAddClick} />
        <Crosshair />
      </MapContainer>
      {isFormVisible && (
        <PopupForm
          reloadPlaces={getPlaces}
          setIsFormVisible={setIsFormVisible}
          center={center}
        />
      )}
    </>
  );
}

export default App;
