/**
 * Parking spot marker component for map display
 */

'use client';

import { Marker, Popup } from 'react-leaflet';
import { Icon, LatLngExpression } from 'leaflet';
import { ParkingSpot } from '@/lib/hooks/useParkingSpots';
import SpotInfoWindow from './SpotInfoWindow';

// Custom marker icons
const createMarkerIcon = (isAvailable: boolean) => {
  return new Icon({
    iconUrl: isAvailable
      ? '/marker-available.svg'
      : '/marker-unavailable.svg',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
    // Fallback to colored circle if SVG not available
    html: `<div style="
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background-color: ${isAvailable ? '#10b981' : '#ef4444'};
      border: 3px solid white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    "></div>`,
  });
};

interface ParkingSpotMarkerProps {
  spot: ParkingSpot;
  onClick?: (spot: ParkingSpot) => void;
}

export default function ParkingSpotMarker({
  spot,
  onClick,
}: ParkingSpotMarkerProps) {
  if (!spot.coordinates) {
    return null;
  }

  const position: LatLngExpression = [
    spot.coordinates.lat,
    spot.coordinates.lng,
  ];

  const icon = createMarkerIcon(spot.isAvailable);

  return (
    <Marker
      position={position}
      icon={icon}
      eventHandlers={{
        click: () => {
          onClick?.(spot);
        },
      }}
    >
      <Popup maxWidth={300} className="spot-popup">
        <SpotInfoWindow spot={spot} />
      </Popup>
    </Marker>
  );
}

