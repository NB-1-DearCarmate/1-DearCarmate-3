import { PageParamsType } from '../structs/commonStructs';

export function buildSearchCondition(
  params: PageParamsType,
  args: string[],
): {
  whereCondition: Record<string, { contains: string }> | {};
  pageCondition: { skip: number; take: number };
} {
  const pageCondition = {
    skip: (params.page - 1) * params.pageSize,
    take: params.pageSize,
  };

  let whereCondition: Record<string, { contains: string }> | {} = {};

  if (params.keyword && params.searchBy && args.includes(params.searchBy)) {
    whereCondition = {
      [params.searchBy]: {
        contains: params.keyword,
      },
    };
  }

  return {
    whereCondition,
    pageCondition,
  };
}
