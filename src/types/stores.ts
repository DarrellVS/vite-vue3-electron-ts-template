export type BaseStoreState = {
  [key: string]:
    | BaseStoreState
    | string
    | number
    | boolean
    | null
    | undefined
    | any[];
};

export type ImagesStateStoreStateEntry = {
  name: string;
  path: string;
};

export type ImagesStateStoreState = {
  directory: string;
  entries: ImagesStateStoreStateEntry[];
};

export type Tag = {
  id: number;
  name: string;
  colorOption: number;
  parentTag?: number;
};

export type TagStoreState = {
  tags: Tag[];
};
