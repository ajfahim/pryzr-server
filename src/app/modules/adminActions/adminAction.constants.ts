export const AdminActionTypes = {
  create_user: 'create_user',
  reset_password: 'reset_password',
  change_credit: 'change_credit',
  change_status: 'change_status',
} as const;

/*
  do not modify the adminActionTypesForModel.
  only add new type in AdminActionTypes if needed
*/

export const adminActionTypesForModel = Object.keys(AdminActionTypes);
