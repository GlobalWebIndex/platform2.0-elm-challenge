export type ORDER = "ASC" | "DESC" | "RAND";

interface IMAGE_TYPE extends ERROR {
  id: string;
  width?: number;
  height?: number;
  url: string;
}
export interface BREED {
  weight: {
    metric: string;
  };
  id: string;
  name: string;
  temperament: string;
  origin: string;
  country_codes: string;
  country_code: string;
  description: string;
  life_span: string;
  indoor: number;
  lap: number;
  adaptability: number;
  affection_level: number;
  child_friendly: number;
  cat_friendly: number;
  dog_friendly: number;
  energy_level: number;
  grooming: number;
  health_issues: number;
  intelligence: number;
  shedding_level: number;
  social_needs: number;
  stranger_friendly: number;
  vocalisation: number;
  bidability: number;
  experimental: number;
  hairless: number;
  natural: number;
  rare: number;
  rex: number;
  suppressed_tail: number;
  short_legs: number;
  wikipedia_url: string;
  hypoallergenic: number;
  reference_image_id: string;
  image?: IMAGE_TYPE;
}

export interface CAT_IMAGE extends IMAGE_TYPE {
  alt?: string;
  caption?: string;
  routePath?: string;
  breeds?: BREED[];
}

export interface IMAGE_LIST_PROPS {
  images: CAT_IMAGE[] | BREED[] | FAVOURITE_IMAGE_DETAILS[];
  route?: "home" | "breeds" | "favourites";
}

export interface CAT_IMAGE_PROPS {
  imageDetails: CAT_IMAGE | BREED;
}

export interface MAIN_SECTION_PROPS {
  title: string;
  children: JSX.Element;
}

export interface MODAL_PROPS {
  title: string;
  children: JSX.Element;
}

export interface HOME_PAGE_PROPS {
  params: {};
  searchParams?: {
    imageId?: string;
  };
}

export interface BREEDS_PAGE_PROPS {
  params: {};
  searchParams?: {
    breedId?: string;
    imageId?: string;
  };
}
export interface IMAGE_DETAILS_PROPS {
  id: string;
}

export interface FAVOURITES_BUTTON {
  imageId: string;
  onClick?: () => void;
}

export interface FAVOURITE_IMAGE_DETAILS {
  id: number;
  user_id: string;
  image_id: string;
  sub_id: string;
  image: {
    url: string;
  };
}

export interface FAVOURITE_IMAGE_PROPS {
  favouriteDetails: FAVOURITE_IMAGE_DETAILS;
}

export type PAGINATION_BUTTON_DATA = {
  page: number;
  images: CAT_IMAGE[];
  error: string;
};

interface MENU_TAB {
  href: string;
  title: string;
}
export interface MENU_PROPS {
  tabs: MENU_TAB[];
}

export interface DEVICES_MENU_PROPS extends MENU_PROPS {
  pathname: string;
}

export interface ERROR {
  error: string;
}
