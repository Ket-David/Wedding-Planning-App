export interface Theme {
  bgImage: string;
  bgColor: string;
  textColor: string;
  headerColor: string;
}

export interface Couple {
  theme: Theme;
  bride: string;
  groom: string;
  bridePhoto: string;
  groomPhoto: string;
  frame: string;
  homeTitle: string;
  cover: string;
  date: any;
  home: string;
  restaurant: string;
  restaurantTitle: string;
  payment: string;
  paymentLink: string;
  heart: boolean;
}

export interface App {
  index: number;
  name: string;
  path: string;
  photo: string;
  value: any;
  disabled: boolean;
  width: string | null;
}


export interface Agenda {
  index: number;
  time: string;
  title: string;
  header: boolean;
}

export interface Wish {
  index: number;
  photo: string;
}
