export type Tag = {
  __typename: string;
  name: string;
  id: number;
};

export type Configuration = {
  __typename: string;
  description: string;
  name: string;
  tags: Tag[];
  id: number;
};
