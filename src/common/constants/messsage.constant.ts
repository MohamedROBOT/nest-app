const generateMessage = (entity: string) => ({
  CREATE_SUCCESS: `${entity} created successfully`,
  UPDATE_SUCCESS: `${entity} updated successfully`,
  DELETE_SUCCESS: `${entity} deleted successfully`,
  NOT_FOUND: `${entity} not found`,
  ALREADY_EXIST: `${entity} already exists`,
  LOGIN_SUCCESS: `${entity} logged in successfully`,
  FOUND_SUCCESS: `${entity} found successfully`,
});

export const SYS_MSG = {
  USER: generateMessage('User'),
};
