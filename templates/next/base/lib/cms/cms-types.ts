export type SeoFields = {
  seoTitle: string;
  seoDescription: string;
};

export type PublishedFields = {
  published: boolean;
};

export type WithId<T> = T & { id: string };
