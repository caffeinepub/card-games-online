import { motion } from "motion/react";
import { useEffect, useRef } from "react";

const MARKERS = [
  {
    lat: 42.15,
    lng: 24.75,
    label: "Пловдив",
    desc: "Най-близкият голям град",
    color: "blue",
  },
  {
    lat: 41.58,
    lng: 24.71,
    label: "Смолян",
    desc: "Административен център на Родопите",
    color: "blue",
  },
  {
    lat: 41.95,
    lng: 24.22,
    label: "Батак",
    desc: "Язовир Батак — водоизточник",
    color: "green",
  },
  {
    lat: 41.6,
    lng: 25.13,
    label: "Ардино",
    desc: "Южни Родопи — граничен район",
    color: "blue",
  },
  {
    lat: 41.74,
    lng: 24.4,
    label: "Девин",
    desc: "Минерална вода — важен ресурс",
    color: "green",
  },
  {
    lat: 41.6,
    lng: 24.27,
    label: "Триград",
    desc: "Триградско ждрело — укрит терен",
    color: "orange",
  },
  {
    lat: 41.72,
    lng: 24.56,
    label: "Широка лъка",
    desc: "Традиционно село — потенциален подслон",
    color: "green",
  },
  {
    lat: 41.88,
    lng: 24.28,
    label: "Беглика",
    desc: "Тракийско светилище — висока позиция",
    color: "orange",
  },
];

function loadLeaflet(): Promise<void> {
  return new Promise((resolve) => {
    if ((window as any).L) {
      resolve();
      return;
    }
    // Load CSS
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(link);
    // Load JS
    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.onload = () => resolve();
    document.head.appendChild(script);
  });
}

export function MapSection() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    let destroyed = false;
    loadLeaflet().then(() => {
      if (destroyed || !mapRef.current || mapInstanceRef.current) return;
      const L = (window as any).L;

      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const colorIconUrl = (color: string) =>
        `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`;

      const makeIcon = (color: string) =>
        new L.Icon({
          iconUrl: colorIconUrl(color),
          shadowUrl:
            "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41],
        });

      const map = L.map(mapRef.current, {
        center: [41.75, 24.5],
        zoom: 9,
        zoomControl: true,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
      }).addTo(map);

      for (const m of MARKERS) {
        L.marker([m.lat, m.lng], { icon: makeIcon(m.color) })
          .addTo(map)
          .bindPopup(
            `<div style="font-family: serif; min-width: 140px;"><strong style="font-size:14px;">${m.label}</strong><br/><span style="color:#555;font-size:12px;">${m.desc}</span></div>`,
          );
      }

      mapInstanceRef.current = map;
    });

    return () => {
      destroyed = true;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <section id="map" className="py-16 md:py-24 bg-charcoal-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <p className="text-xs font-body tracking-[0.3em] uppercase text-tan mb-3">
            КАТЕГОРИЯ 05
          </p>
          <h2 className="font-cinzel text-3xl md:text-5xl text-cream tracking-widest uppercase mb-4">
            КАРТА НА РОДОПИТЕ
          </h2>
          <p className="font-body text-cream/60 max-w-2xl text-base leading-relaxed">
            Ключови локации за оцеляване в Родопите — градове, водоизточници и
            стратегически терени. Кликнете на маркерите за информация.
          </p>

          {/* Legend */}
          <div className="flex flex-wrap gap-5 mt-5">
            <div className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 rounded-full bg-blue-400" />
              <span className="font-body text-xs text-cream/60">Градове</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 rounded-full bg-green-400" />
              <span className="font-body text-xs text-cream/60">
                Природа / Вода
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 rounded-full bg-orange-400" />
              <span className="font-body text-xs text-cream/60">
                Висок терен / Стратегически
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="border border-border rounded-sm overflow-hidden"
          data-ocid="map.canvas_target"
        >
          <div ref={mapRef} style={{ height: "450px", width: "100%" }} />
        </motion.div>
      </div>
    </section>
  );
}
