"use client"
import { useState, useEffect } from 'react';

interface AddressInputProps {
  apiKey: string;
}

interface Address {
  value: string;
}

const AddressInput: React.FC<AddressInputProps> = ({ apiKey }) => {
  const [address, setAddress] = useState<Address>({ value: '' });
  const [map, setMap] = useState<ymaps.Map | null>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=${apiKey}`;
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const ymaps = (window as any).ymaps;
      const mapElement = document.getElementById('map');
      if (mapElement) {
        const mapInstance = new ymaps.Map(mapElement, {
          center: [55.76, 37.64],
          zoom: 10,
        });
        setMap(mapInstance);
      }
    };
  }, [apiKey]);

  return (
    <div>
      <input
        type="text"
        value={address.value}
        onChange={(e) => setAddress({ value: e.target.value })}
        placeholder="Введите адрес"
      />
      <div id="map" style={{ width: 400, height: 300 }} />
    </div>
  );
};

export default AddressInput;
