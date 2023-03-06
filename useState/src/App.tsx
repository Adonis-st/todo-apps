import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { TodoList } from "./components/TodoList";
import { TodosLength } from "./components/TodosLength";
import { initalTodos } from "./data";

// Types
export type CurrentFilter = "completed" | "active" | "all";
export type Todos = { completed: boolean; text: string }[];

function App() {
	const [newTodo, setNewTodo] = useState("");
	const [todos, setTodos] = useState<Todos>(initalTodos);
	const [currentFilter, setCurrentFilter] = useState<CurrentFilter>("all");
	const [darkMode, setDarkMode] = useState(false);

	// Toast
	const notify = (text: string) => toast.error(text);

	const clearCompleted = () => {
		const clearedCompleted = todos?.filter((todo) => !todo.completed);
		setTodos(clearedCompleted);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!newTodo) {
			return notify("Invalid input");
		}
		setTodos((prevState) => [{ completed: false, text: newTodo }, ...prevState]);
		setNewTodo("");
	};

	// Toggle Dark Mode
	useEffect(() => {
		if (darkMode || window.matchMedia("(prefers-color-scheme: dark)").matches) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, [darkMode]);

	return (
		<div>
			<Toaster />
			<div className="bg-img dark-bg-img h-[200px] sm:h-[300px] flex flex-col">
				<div className="flex w-[87%] mx-auto pt-9 justify-between items-center max-w-[540px] sm:pt-16">
					<h1 className="text-white text-2xl font-semibold tracking-[.3em] sm:text-4xl sm:font-bold">
						TODO
					</h1>
					<button onClick={() => setDarkMode((prevState) => !prevState)} className="p-1">
						{darkMode ? (
							<img src="images/icon-sun.svg" alt="Sun Icon" className="w-5 sm:w-6" />
						) : (
							<img src="images/icon-moon.svg" alt="Moon Icon" className="w-5 sm:w-6" />
						)}
					</button>
				</div>
				<div className="pt-10 flex justify-center items-center sm:pt-14 ">
					<form
						onSubmit={handleSubmit}
						className="w-[87%] flex bg-white dark:bg-[#25273D] items-center rounded-md max-w-[540px] sm:py-1">
						<input
							type="text"
							placeholder="Create a new todo..."
							value={newTodo}
							name="title"
							onChange={(e) => setNewTodo(e.target.value)}
							className="py-3 w-full rounded-r-md text-xs tracking-tight text-dark_grayish_blue sm:text-base dark:bg-[#25273D] dark:text-[#C8CBE7] focus:outline-none placeholder:text-[#9495A5] dark:placholder:text-[#767992]"
						/>
						<div className="w-5 sm:w-6 aspect-square rounded-full mx-3 -order-1 border shrink-0 border-very_light_grayish_blue dark:border-[#393A4B]" />
					</form>
				</div>
			</div>
			<div className="-mt-9 z-[1] absolute w-full sm:-mt-14 ">
				<div className="w-[87%] mx-auto bg-white shadow-xl rounded-md max-w-[540px] dark:bg-[#25273D] ">
					<TodoList todos={todos} setTodos={setTodos} currentFilter={currentFilter} />
					<div className="flex justify-between py-3 px-4 text-[#9495A5] text-xs sm:hidden dark:text-[#5B5E7E]  ">
						<TodosLength todos={todos} currentFilter={currentFilter} />
						<button onClick={() => clearCompleted()}>Clear Completed</button>
					</div>
				</div>
				<div className="bg-white dark:bg-[#25273D] shadow-xl text-sm text-[#9495A5] py-3  mt-4 flex items-center w-[87%] mx-auto justify-center sm:mt-0 max-w-[540px] sm:justify-between ">
					<div className="hidden sm:block ml-5">
						<TodosLength todos={todos} currentFilter={currentFilter} />
					</div>
					<div>
						<button
							onClick={() => setCurrentFilter("all")}
							className={`${
								currentFilter === "all" ? "text-[#3A7CFD]" : ""
							} lg:hover:text-[#494C6B] dark:lg:hover:text-[#E3E4F1]`}>
							All
						</button>
						<button
							onClick={() => setCurrentFilter("active")}
							className={`${
								currentFilter === "active" ? "text-[#3A7CFD]" : ""
							} mx-4 lg:hover:text-[#494C6B] dark:lg:hover:text-[#E3E4F1]`}>
							Active
						</button>
						<button
							onClick={() => setCurrentFilter("completed")}
							className={`${
								currentFilter === "completed" ? "text-[#3A7CFD]" : ""
							} lg:hover:text-[#494C6B] dark:lg:hover:text-[#E3E4F1]`}>
							Completed
						</button>
					</div>
					<button
						className="hidden sm:block mr-5 lg:hover:text-[#494C6B] dark:lg:hover:text-[#E3E4F1] "
						onClick={() => clearCompleted()}>
						Clear Completed
					</button>
				</div>
			</div>
		</div>
	);
}

export default App;
