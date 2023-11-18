export type ConfigModel = {
  users: number;
  // projects: number;
  // wrapups: number;
};

const DATA_TO_GENERATE_CONFIG: ConfigModel = {
  users: 0,
  // projects: 0,
  // wrapups: 0,
};

export const setConfigItem = (key: keyof ConfigModel, value: number) => {
  DATA_TO_GENERATE_CONFIG[key] = value;
};

export const getConfigItem = (key: keyof ConfigModel) => {
  return DATA_TO_GENERATE_CONFIG[key];
};
