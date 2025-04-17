export class ArticleWithLikeDTO {
  id!: number;
  image!: string | null;
  createdAt!: Date;
  updatedAt!: Date;
  title!: string;
  content!: string;
  userId!: number;
  isLiked: boolean;

  constructor(
    article: {
      id: number;
      image: string | null;
      createdAt: Date;
      updatedAt: Date;
      title: string;
      content: string;
      userId: number;
    },
    isLiked: Object | null,
  ) {
    Object.assign(this, { ...article });
    this.isLiked = !!isLiked;
  }
}

export class ArticleListWithCountDTO {
  list!: {
    id: number;
    image: string | null;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    content: string;
    userId: number;
  }[];
  totalCount!: number;

  constructor(
    articles: {
      id: number;
      image: string | null;
      createdAt: Date;
      updatedAt: Date;
      title: string;
      content: string;
      userId: number;
    }[],
    totalCount: number,
  ) {
    this.list = articles;
    this.totalCount = totalCount;
  }
}
