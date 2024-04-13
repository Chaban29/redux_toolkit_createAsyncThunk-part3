export interface ITodo {
  id: number;
  title: string;
  completed: boolean;
}

export interface ITodos {
  todos: ITodo[];
  loading: boolean;
  error: null | string;
}
