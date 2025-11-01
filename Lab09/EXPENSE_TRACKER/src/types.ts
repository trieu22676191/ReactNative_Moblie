export type Expense = {
  id: number;
  title: string;
  amount: number;
  type: string;
  createdAt: string;
};

export type RootStackParamList = {
  MainScreen: undefined;
  AddScreen: undefined;
  EditScreen: { item: Expense };
};
