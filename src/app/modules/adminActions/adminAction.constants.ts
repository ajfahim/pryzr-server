export const AdminActionTypes = {
  create_user: 'create_user',
  reset_password: 'reset_password',
  change_credit: 'change_credit',
  restrict_user: 'restrict_user',
} as const;

/*
  do not modify the adminActionTypesForModel.
  only add new type in AdminActionTypes if needed
*/

export const adminActionTypesForModel = Object.keys(AdminActionTypes);
