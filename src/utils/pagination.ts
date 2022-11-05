export interface PaginatedTypes {
  data: any[];
  numberOfPages: number;
  currentPage: number;
}

export const getPaginatedData = async (
  Model: any,
  modelType: string,
  page: number,
  limit: number
): Promise<PaginatedTypes | undefined> => {
  try {
    const data = await Model.find({})
      .limit(limit)
      .skip(page * limit)
      .select(`${modelType === "User" ? "-password" : ""}`)
      .exec();

    const numberOfPages = Math.ceil(
      (await Model.countDocuments().exec()) / limit
    );

    return { data, numberOfPages, currentPage: page };
  } catch (e) {
    console.log(e);
  }
};

export const getReferecedPaginatedData = async (
  Model: any,
  modelType: string,
  ref: string,
  page: number,
  limit: number
): Promise<PaginatedTypes | any> => {
  try {
    const data = await Model.find({})
      .limit(limit)
      .skip(page * limit)
      .populate(ref ? ref : "", ref === "role" ? "name permission menu" : "")
      .select(`${modelType === "User" ? "-password" : ""}`)
      .exec();

    const numberOfPages = Math.ceil(
      (await Model.countDocuments().exec()) / limit
    );

    return { data, numberOfPages, currentPage: page };
  } catch (e) {
    return e;
  }
};
