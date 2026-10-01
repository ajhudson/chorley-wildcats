export interface ContactInfo {
  time?: string;
  phone: string;
  address: string;
  email?: string;
}

export interface ContactProps {
  contactInfo: ContactInfo;
}
