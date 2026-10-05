/**
 * Mumbai HeritageVault - Interactive Heritage Map Component
 * Powered by Leaflet & OpenStreetMap tiles
 * Features Category filtering, custom museum pins, popup cards, and direct navigation
 */

import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import { HeritageSite } from '../../types';
import { Filter, Layers, Navigation, ExternalLink } from 'lucide-react';

interface InteractiveMapProps {
  sites: HeritageSite[];
  selectedSiteId?: string;
  onSelectSite?: (site: HeritageSite) => void;
  height?: string;
  initialCenter?: [number, number];
  initialZoom?: number;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  sites,
  selectedSiteId,
  onSelectSite,
  height = '560px',
  initialCenter = [18.96, 72.84], // Central/South Mumbai default
  initialZoom = 12,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [id: string]: L.Marker }>({});
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Monument', 'Museum', 'Fort', 'Cave', 'Heritage Building', 'Market'];

  const filteredSites =
    activeCategory === 'All'
      ? sites
      : sites.filter((s) => s.category.toLowerCase().includes(activeCategory.toLowerCase()));

  // Category color mapper for markers
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Museum':
        return '#0284c7'; // Deep Sky Blue
      case 'Monument':
        return '#b45309'; // Warm Bronze
      case 'Fort':
        return '#4d7c0f'; // Olive Moss
      case 'Cave':
        return '#7c3aed'; // Deep Violet
      case 'Railway Heritage':
        return '#dc2626'; // Deep Red
      case 'Market':
        return '#ea580c'; // Burnt Orange
      default:
        return '#78350f'; // Amber Brown
    }
  };

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Destroy existing map if any
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Initialize Leaflet Map
    const map = L.map(mapContainerRef.current, {
      center: initialCenter,
      zoom: initialZoom,
      zoomControl: true,
      scrollWheelZoom: false, // Prevent accidental page scroll interception
    });

    // High quality OpenStreetMap cartography
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors',
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Markers when filteredSites or sites change
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear existing markers
    Object.values(markersRef.current).forEach((marker) => marker.remove());
    markersRef.current = {};

    filteredSites.forEach((site) => {
      if (!site.latitude || !site.longitude) return;

      const markerColor = getCategoryColor(site.category);

      // Custom SVG marker pin
      const iconSvg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="28" height="36">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 9 12 24 12 24s12-15 12-24c0-6.63-5.37-12-12-12z" fill="${markerColor}" stroke="#ffffff" stroke-width="1.5"/>
          <circle cx="12" cy="12" r="5" fill="#ffffff" />
        </svg>
      `;

      const customIcon = L.divIcon({
        className: 'custom-heritage-marker',
        html: `<div style="transform: translate(-14px, -36px); cursor: pointer; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));">${iconSvg}</div>`,
        iconSize: [28, 36],
        iconAnchor: [14, 36],
        popupAnchor: [0, -36],
      });

      const marker = L.marker([site.latitude, site.longitude], { icon: customIcon }).addTo(map);

      // Curated Museum Popup HTML
      const popupContent = `
        <div style="font-family: 'Plus Jakarta Sans', sans-serif; width: 230px; padding: 4px;">
          <img src="${site.image}" alt="${site.name}" style="width: 100%; height: 110px; object-fit: cover; border-radius: 4px; margin-bottom: 8px; background: #eee;" />
          <div style="font-size: 10px; font-weight: 700; color: ${markerColor}; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 2px;">
            ${site.category} · ${site.year}
          </div>
          <div style="font-family: 'Playfair Display', serif; font-size: 14px; font-weight: 700; color: #1c1917; line-height: 1.25; margin-bottom: 4px;">
            ${site.name}
          </div>
          <p style="font-size: 11px; color: #57534e; margin: 0 0 8px 0; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
            ${site.description}
          </p>
          <a href="/heritage/${site.slug}" style="display: inline-block; font-size: 11px; font-weight: 600; color: #78350f; text-decoration: none;">
            View Detailed Archive →
          </a>
        </div>
      `;

      marker.bindPopup(popupContent);

      marker.on('click', () => {
        if (onSelectSite) onSelectSite(site);
      });

      markersRef.current[site.id] = marker;
    });

    // If selectedSiteId, pan and open popup
    if (selectedSiteId && markersRef.current[selectedSiteId]) {
      const selectedMarker = markersRef.current[selectedSiteId];
      const latlng = selectedMarker.getLatLng();
      map.flyTo(latlng, 15, { duration: 1.2 });
      selectedMarker.openPopup();
    }
  }, [filteredSites, selectedSiteId]);

  const handleResetView = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(initialCenter, initialZoom, { duration: 1 });
    }
  };

  return (
    <div className="relative rounded-lg overflow-hidden border border-stone-200 shadow-sm bg-stone-100 flex flex-col">
      {/* Category Filter Toolbar */}
      <div className="bg-stone-50 border-b border-stone-200 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 z-10">
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-full">
          <Filter className="w-3.5 h-3.5 text-stone-500 mr-1 shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-amber-800 text-stone-100 font-semibold shadow-xs'
                  : 'bg-white text-stone-600 hover:bg-stone-200/70 hover:text-stone-900 border border-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-stone-500 font-medium">
            Showing <strong className="text-stone-800 tabular-nums">{filteredSites.length}</strong> sites
          </span>
          <button
            type="button"
            onClick={handleResetView}
            title="Reset Map View"
            className="p-1.5 rounded bg-white text-stone-600 hover:text-stone-900 border border-stone-200 text-xs flex items-center gap-1"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset View</span>
          </button>
        </div>
      </div>

      {/* Map Container */}
      <div ref={mapContainerRef} style={{ height }} className="w-full relative z-0" />

      {/* Legend Ribbon */}
      <div className="bg-stone-50/95 border-t border-stone-200 px-4 py-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-[11px] text-stone-600">
        <span className="font-semibold text-stone-700">Map Legend:</span>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#0284c7]" />
          <span>Museums</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#b45309]" />
          <span>Monuments</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#4d7c0f]" />
          <span>Forts</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#7c3aed]" />
          <span>Ancient Caves</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#dc2626]" />
          <span>Railway Heritage</span>
        </div>
      </div>
    </div>
  );
};
