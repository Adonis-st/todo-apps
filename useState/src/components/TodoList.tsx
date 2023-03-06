import { CurrentFilter, Todos } from "../App";

interface Props {
	todos: Todos;
	setTodos: React.Dispatch<React.SetStateAction<Todos>>;
	currentFilter: CurrentFilter;
}

export const TodoList = ({ todos, setTodos, currentFilter }: Props) => {
	const toggleTodo = ({ todoIndex, completed }: { todoIndex: number; completed: boolean }) => {
		setTodos((prevState) =>
			prevState.map((todo, index) => (index === todoIndex ? { ...todo, completed } : todo))
		);
	};

	const deleteTodo = (todoIndex: number) => {
		const removeTodo = [...todos].filter((todo, index) => index !== todoIndex);
		setTodos(removeTodo);
	};

	return (
		<>
			{todos?.map((todo, index) => {
				if (todo.text) {
					return (
						<div
							className={`
							${
								(currentFilter === "active" && todo.completed) ||
								(currentFilter === "completed" && !todo.completed)
									? "hidden"
									: ""
							}
							 p-3 flex border-b border-[#E3E4F1] group sm:py-4 dark:border-[#393A4B] text-[#494C6B] dark:text-[#C8CBE7]`}
							key={index}>
							<button
								onClick={() => toggleTodo({ todoIndex: index, completed: !todo.completed })}
								className="flex items-center justify-center">
								{todo.completed ? (
									<>
										<div className="w-5 bg-gradient aspect-square rounded-full relative sm:w-6 " />
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="11"
											height="9"
											className="absolute">
											<path
												fill="none"
												stroke="#fff"
												strokeWidth="2"
												d="M1 4.304L3.696 7l6-6"
											/>
										</svg>
									</>
								) : (
									<div className="border-img dark-border-img w-5 aspect-square rounded-full border border-[#E3E4F1] sm:w-6 dark:border-[#393A4B]" />
								)}
							</button>

							<div className="w-full justify-between flex">
								<span
									className={`${
										todo.completed ? "line-through text-[#D1D2DA]/70" : ""
									} w-full ml-3 sm:text-lg sm:ml-4`}>
									{todo.text}
								</span>

								<button
									onClick={() => deleteTodo(index)}
									className="p-1 sm:mr-1 lg:hidden group-hover:inline-block">
									<img src="images/icon-cross.svg" alt="Cross Icon" className="w-4" />
								</button>
							</div>
						</div>
					);
				}
			})}
		</>
	);
};
