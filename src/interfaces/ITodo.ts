export interface ITodo {
  id: number;
  title: string;
  completed: boolean;
}

export interface ITodos {
  todos: ITodo[];
  status: boolean;
  error: null | string;
}
