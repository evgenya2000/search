export type ListingStatus = 'available' | 'reserved' | 'sold';

export interface ListingDocument {
  id: string;
  title: string;
  url: string;
  size: string;
}

export interface ListingSeller {
  id: string;
  name: string;
  phone: string;
  email: string;
}

export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  area: number;
  location: string;
  status: ListingStatus;
  imageUrl: string;
  documents: ListingDocument[];
  seller: ListingSeller;
}
