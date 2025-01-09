export interface Constituent {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  street_address: string | null;
  city: string | null;
  state: string | null;
  zip_code: string | null;
  created_at: string;
}
