export const id: number = 1;

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};
