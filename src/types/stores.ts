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
  tags: number[];
};

export type ImagesStateStoreState = {
  directory: string;
  entries: ImagesStateStoreStateEntry[];
};

export type CreateTagDto = {
  id: number;
  name: string;
  colorOption: number;
  parentTag?: number;
};

export type Tag = {
  id: number;
  name: string;
  colorOption: number;
  childTags: Tag[];
};

export type IndentedTag = {
  id: number;
  name: string;
  colorOption: number;
  childTags: Tag[];
  indentLevel: number;
};

export type TagStoreState = {
  tags: Tag[];
};

export type ImageTagStoreState = {
  imageTags: {
    [key: string]: number[];
  };
};
