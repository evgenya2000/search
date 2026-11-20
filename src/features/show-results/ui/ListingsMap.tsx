import { useEffect, useMemo } from 'react';
import L from 'leaflet';
import { Link } from 'react-router-dom';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import styled from 'styled-components';
import type { Listing } from '@/entities/listing';
import { routes } from '@/shared/config';
import { formatPrice, useI18n } from '@/shared/lib';
import 'leaflet/dist/leaflet.css';

const tileUrl = import.meta.env.VITE_MAP_TILE_URL || 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';

// Функция для создания HTML-иконки маркера
const createPriceIcon = (priceLabel: string) => {
  return L.divIcon({
    className: 'custom-price-marker',
    html: `
      <div class="price-marker-wrapper">
        <div class="price-marker-label">${priceLabel}</div>
        <div class="price-marker-dot"></div>
      </div>
    `,
    iconSize: [0, 0], // Позиционируем через CSS transform
  });
};

// Опционально: функция для компактного вывода цены на плашке (например, "36,9 млн")
// Если хотите использовать ваш formatPrice, можете удалить её.
const formatCompactPrice = (price: number) => {
  return new Intl.NumberFormat('ru-RU', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(price) + ' ₽';
};

const MapFrame = styled.div`
  position: relative;
  isolation: isolate;
  height: clamp(18rem, 42vh, 32rem);
  min-height: 280px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};

  .leaflet-container {
    width: 100%;
    height: 100%;
    font: inherit;
    z-index: 0;
  }

  /* --- СТИЛИ ДЛЯ КАСТОМНОГО МАРКЕРА-ПЛАШКИ --- */
  .custom-price-marker {
    background: transparent;
    border: none;
  }

  .price-marker-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    transform: translate(-50%, -100%);
    cursor: pointer;
    width: max-content;
  }

  .price-marker-label {
    background-color: #ffffff;
    color: #000000;
    font-weight: 700;
    font-size: 14px;
    padding: 6px 12px;
    border-radius: 999px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    white-space: nowrap;
    position: relative;
    margin-bottom: 6px;
    transition: transform 0.2s ease;
    border: 1px solid ${({ theme }) => theme.colors.border};
  }

  /* Треугольник вниз */
  .price-marker-label::after {
    content: '';
    position: absolute;
    bottom: -6px;
    left: 50%;
    transform: translateX(-50%);
    border-width: 6px 6px 0;
    border-style: solid;
    border-color: #ffffff transparent transparent transparent;
  }

  /* Синяя точка снизу */
  .price-marker-dot {
    width: 12px;
    height: 12px;
    background-color: ${({ theme }) => theme.colors.primary}; /* Используем цвет темы */
    border: 2px solid #ffffff;
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  .price-marker-wrapper:hover .price-marker-label {
    transform: scale(1.05);
  }
  /* ------------------------------------------- */

  .leaflet-popup-content-wrapper {
    border-radius: 0.75rem;
  }

  .leaflet-popup-content {
    min-width: 190px;
    margin: 0.875rem;
  }

  .leaflet-control-attribution {
    display: none !important;
  }
`;

const PopupContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  color: ${({ theme }) => theme.colors.text};
`;

const PopupLocation = styled.span`
  color: ${({ theme }) => theme.colors.muted};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const PopupPrice = styled.strong`
  color: ${({ theme }) => theme.colors.primary};
`;

const DetailsLink = styled(Link)`
  align-self: flex-start;
  margin-top: 0.25rem;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 2px;
`;

type MapListing = Pick<Listing, 'id' | 'title' | 'location' | 'latitude' | 'longitude' | 'priceRub'>;

function hasValidCoordinates(listing: MapListing): boolean {
  return Number.isFinite(listing.latitude)
    && Number.isFinite(listing.longitude)
    && Math.abs(listing.latitude) <= 90
    && Math.abs(listing.longitude) <= 180;
}

function FitMapToListings({ listings }: { listings: MapListing[] }) {
  const map = useMap();
  const points = useMemo(
    () => listings.map((listing) => L.latLng(listing.latitude, listing.longitude)),
    [listings],
  );

  useEffect(() => {
    if (points.length === 1) {
      map.setView(points[0], 13, { animate: false });
    } else if (points.length > 1) {
      map.fitBounds(L.latLngBounds(points), {
        padding: [32, 32],
        maxZoom: 13,
        animate: false,
      });
    }
  }, [map, points]);

  return null;
}

export function ListingsMap({
  items,
  showDetailsLink = true,
}: {
  items: MapListing[];
  showDetailsLink?: boolean;
}) {
  const { t } = useI18n();
  const listingsWithCoordinates = useMemo(() => items.filter(hasValidCoordinates), [items]);

  if (listingsWithCoordinates.length === 0) return null;

  const firstListing = listingsWithCoordinates[0];

  return (
    <MapFrame role="region" aria-label={t('listings.mapTitle')}>
      <MapContainer
        center={[firstListing.latitude, firstListing.longitude]}
        zoom={6}
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors'
          url={tileUrl}
        />
        <FitMapToListings listings={listingsWithCoordinates} />
        
        <MarkerClusterGroup chunkedLoading showCoverageOnHover={false}>
          {listingsWithCoordinates.map((listing) => {
            // Определяем текст для плашки (используем компактный формат)
            const priceText = listing.priceRub === null 
              ? t('listings.priceUnknown') 
              : formatCompactPrice(listing.priceRub);

            return (
              <Marker 
                key={listing.id} 
                position={[listing.latitude, listing.longitude]}
                icon={createPriceIcon(priceText)}
              >
                <Popup>
                  <PopupContent>
                    <strong>{listing.title}</strong>
                    <PopupLocation>{listing.location}</PopupLocation>
                    <PopupPrice>
                      {listing.priceRub === null ? t('listings.priceUnknown') : formatPrice(listing.priceRub)}
                    </PopupPrice>
                    {showDetailsLink && (
                      <DetailsLink to={routes.listing.replace(':id', String(listing.id))}>
                        {t('listings.mapDetails')}
                      </DetailsLink>
                    )}
                  </PopupContent>
                </Popup>
              </Marker>
            );
          })}
        </MarkerClusterGroup>
      </MapContainer>
    </MapFrame>
  );
}
