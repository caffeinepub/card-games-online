declare module "leaflet" {
  export = L;
  export as namespace L;
  namespace L {
    function map(
      element: HTMLElement | string,
      options?: MapOptions,
    ): LeafletMap;
    function tileLayer(
      urlTemplate: string,
      options?: TileLayerOptions,
    ): TileLayer;
    function marker(latlng: LatLngExpression, options?: MarkerOptions): Marker;

    interface MapOptions {
      center?: LatLngExpression;
      zoom?: number;
      zoomControl?: boolean;
      [key: string]: any;
    }

    interface TileLayerOptions {
      attribution?: string;
      maxZoom?: number;
      [key: string]: any;
    }

    interface MarkerOptions {
      icon?: Icon;
      [key: string]: any;
    }

    type LatLngExpression = [number, number] | { lat: number; lng: number };

    class LeafletMap {
      remove(): void;
      [key: string]: any;
    }

    class TileLayer {
      addTo(map: LeafletMap): this;
      [key: string]: any;
    }

    class Marker {
      addTo(map: LeafletMap): this;
      bindPopup(content: string): this;
      [key: string]: any;
    }

    class Icon {
      constructor(options: IconOptions);
      [key: string]: any;
    }

    interface IconOptions {
      iconUrl: string;
      iconRetinaUrl?: string;
      shadowUrl?: string;
      iconSize?: [number, number];
      iconAnchor?: [number, number];
      popupAnchor?: [number, number];
      shadowSize?: [number, number];
      [key: string]: any;
    }

    namespace Icon {
      class Default extends Icon {
        static mergeOptions(options: Partial<IconOptions>): void;
      }
    }
  }
}

declare module "leaflet/dist/leaflet.css" {
  // CSS module
}
