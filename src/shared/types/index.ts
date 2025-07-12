export type ProfileDataDto = {
  data: {
    id: number;
    avatar: string;
    email: string;
    is_active: number;
    language: string;
    name: string;
    socket_connection_token: string;
  };
};

export type ProfileData = {
  id: number;
  avatar: string;
  email: string;
  is_active: number;
  language: string;
  name: string;
  socket_connection_token: string;
};

export type AuctionItemType = {
  id: string;
  title: string;
  author?: string;
  price: number;
  percent: number;
};
