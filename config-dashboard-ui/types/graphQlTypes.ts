export type Tag = {
  __typename: string;
  name: string;
  id: string;
};

export type ConfigurationTag = {
  tag: Tag;
};

export type Configuration = {
  __typename: string;
  description: string;
  name: string;
  tags: ConfigurationTag[];
};
