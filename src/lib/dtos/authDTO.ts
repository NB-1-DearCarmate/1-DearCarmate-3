import { USER } from '@prisma/client';
import { AuthedUser } from '../../../types/AuthedUser';
import { UserDTO } from './userDTO';

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

export class CompanyDTO {
  companyCode: string;
  constructor(companyCode: string) {
    this.companyCode = companyCode;
  }
}

export class LoginResponseDTO {
  user: UserDTO;
  accessToken: string;
  refreshToken: string;
  constructor(user: USER, accessToken: string, refreshToken: string) {
    const company = new CompanyDTO(user.user_code);
    this.user.id = user.id;
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
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
