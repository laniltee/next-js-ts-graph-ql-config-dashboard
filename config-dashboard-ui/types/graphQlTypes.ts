export type Tag = {
  tag: {
    __typename: string;
    name: string;
  };
};

export type Configuration = {
  __typename: string;
  description: string;
  name: string;
  tags: Tag[];
};
