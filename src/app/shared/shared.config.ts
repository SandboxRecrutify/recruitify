export const createProject = {
  name: {
    maxLength: 128,
  },
  description: {
    maxLength: 500,
  },
  isActive: {
    defaultValue: false,
  },
  dates: {
    defaultValue: [new Date(), new Date()],
  },
};
