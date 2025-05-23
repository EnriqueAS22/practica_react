interface User {
  email: string;
}

export interface Advert {
  id: number;
  name: string;
  price: number;
  sale: boolean;
  tags: string[];
  photo?: string;
  user: User;
}
