import { useTodoStore } from "../store";

export const TodosLength = () => {
	const { todos, currentFilter } = useTodoStore((state) => state);
	let todosLength = todos.length;

	if (currentFilter === "active") {
		todosLength = todos.filter((todo) => !todo.completed).length;
	} else if (currentFilter === "completed") {
		todosLength = todos.filter((todo) => todo.completed).length;
	}

	return (
		<>
			{todosLength !== 0 ? (
				<span>
					{todosLength} {"  "}
					items left
				</span>
			) : (
				<span>No items</span>
			)}
		</>
	);
};
