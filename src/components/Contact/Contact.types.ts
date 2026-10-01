export interface ContactInfo {
  time?: string;
  phone: string;
  address: string;
}

export interface ContactProps {
  contactInfo: ContactInfo;
}
