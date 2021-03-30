export interface Iitems {
  messageTitle: string;
  services: string[] | [];
  lastUpdatedTime: string;
  id: string;
  category: string;
  severity: string;
  message: string;
}

export interface IMicrosoftServicesWithoutNoneOption {
  key: string;
  text: string;
}
export interface IMicrosoftServices {
  key: string | null;
  text: string;
}
