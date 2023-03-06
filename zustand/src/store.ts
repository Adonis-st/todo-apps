import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { initalTodos } from "./data";

type CurrentFilter = "completed" | "active" | "all";

interface Todo {
	completed: boolean;
	text: string;
}

interface TodosState {
	todos: Todo[];
	newTodo: string;
	currentFilter: CurrentFilter;
	setCurrentFilter: (currentFilter: CurrentFilter) => void;
	setNewTodo: (newTodo: string) => void;
	addTodo: () => void;
	toggleTodo: (index: number) => void;
	deleteTodo: (index: number) => void;
	clearCompleted: () => void;
}

const addTodo = ({ todos, text }: { todos: Todo[]; text: string }): Todo[] => [
	{ text, completed: false },
	...todos,
];

const toggleTodo = ({ todos, todoIndex }: { todos: Todo[]; todoIndex: number }): Todo[] =>
	todos.map((todo, index) => ({
		...todo,
		completed: index === todoIndex ? !todo.completed : todo.completed,
	}));

const deleteTodo = ({ todos, todoIndex }: { todos: Todo[]; todoIndex: number }): Todo[] =>
	todos.filter((todo, index) => index !== todoIndex);

const clearCompleted = (todos: Todo[]) => todos.filter((todo) => !todo.completed);

export const useTodoStore = create<TodosState>()(
	devtools(
		persist(
			(set) => ({
				todos: initalTodos,
				newTodo: "",
				currentFilter: "all",

				setCurrentFilter: (currentFilter: CurrentFilter) =>
					set(() => ({ currentFilter: currentFilter })),

				addTodo: () =>
					set((state) => ({
						...state,
						todos: addTodo({ todos: state.todos, text: state.newTodo }),
						newTodo: "",
					})),

				toggleTodo: (index: number) =>
					set((state) => ({
						...state,
						todos: toggleTodo({ todos: state.todos, todoIndex: index }),
					})),

				deleteTodo: (index: number) =>
					set((state) => ({
						...state,
						todos: deleteTodo({ todos: state.todos, todoIndex: index }),
					})),

				setNewTodo: (newTodo: string) =>
					set((state) => ({
						...state,
						newTodo,
					})),

				clearCompleted: () => set((state) => ({ todos: clearCompleted(state.todos) })),
			}),
			{
				name: "todo-storage",
			}
		)
	)
);
