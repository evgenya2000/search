export type TravelMode = 'foot' | 'bicycle' | 'car';
export type NaturalCategory = 'river' | 'lake' | 'forest';

export interface ListingRoute {
  mode: TravelMode;
  durationSeconds: number;
  distanceMeters: number;
  matchedConditionIds: string[] | null;
}

export interface NaturalNearbyObject {
  category: NaturalCategory;
  osmType: string;
  osmId: number;
  name: string | null;
  nearestPoint: { latitude: number; longitude: number };
  distanceKm: number;
  routes: ListingRoute[];
}

export interface CustomNearbyObject {
  category: 'custom_object';
  name: string;
  routes: ListingRoute[];
}

export type NearbyObject = NaturalNearbyObject | CustomNearbyObject;

export interface Listing {
  id: number;
  title: string;
  link: string;
  location: string;
  latitude: number;
  longitude: number;
  priceRub: number | null;
  areaAres: number | null;
  withHouse: boolean | null;
  matchedObjectsTotal: number;
  matchedObjectsHasMore: boolean;
  matchedObjectsNextCursor: string | null;
  matchedObjects: NearbyObject[];
}

export interface ListingDetail extends Omit<Listing,
  'matchedObjectsTotal' | 'matchedObjectsHasMore' | 'matchedObjectsNextCursor' | 'matchedObjects'> {
  description: string;
  createdAt: string;
  updatedAt: string;
  nearbyObjectsTotal: number;
  nearbyObjectsHasMore: boolean;
  nearbyObjectsNextCursor: string | null;
  nearbyObjects: NearbyObject[];
}

export interface SearchRequest {
  filter: Record<string, unknown>;
  limit?: number;
  offset?: number;
  matches_limit?: number;
}

export interface SearchResponse {
  total: number;
  limit: number;
  offset: number;
  items: Listing[];
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  authenticated: boolean;
  user: { id: string; email: string };
}

export interface FilterOptions {
  categories: string[];
  modes: TravelMode[];
  customObjects: string[];
  fields: { floatField: string[]; boolField: string[] };
  limits: Record<string, number>;
  semantics: string;
}
