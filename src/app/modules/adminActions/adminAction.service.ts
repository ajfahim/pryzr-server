import { User } from '../User/user.model';

const getAllUsers = async (query: Record<string, unknown>) => {
  const page = Number(query?.page) || 1;
  const limit = Number(query?.limit) || 10;

  const users = await User.aggregatePaginate(
    User.aggregate([
      {
        $match: {
          role: 'user',
        },
      },
      {
        $project: {
          password_hash: 0,
        },
      },
    ]),
    { limit, page },
  );

  return users;
};

export const AdminServices = {
  getAllUsers,
};
