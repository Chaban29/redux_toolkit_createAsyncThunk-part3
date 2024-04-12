export interface ITodo {
  id: number;
  title: string;
  completed: boolean;
}

export interface ITodos {
  todos: ITodo[];
  status: string;
  error: null | string;
}
