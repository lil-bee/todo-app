import { DeleteIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	Center,
	Checkbox,
	HStack,
	Heading,
	Input,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	VStack,
	Text,
	IconButton,
	Flex,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface Todo {
	id: string;
	name: string;
	done: boolean;
}

function App() {
	const [newTodo, setNewTodo] = useState("");
	const [tabIndex, setTabIndex] = useState(() => {
		const storedTabIndex = localStorage.getItem("tabIndex");
		return storedTabIndex ? Number(storedTabIndex) : 0;
	});
	const [todos, setTodos] = useState<Todo[]>([]);

	const handleTabsChange = (index: number) => {
		setTabIndex(index);
	};

	useEffect(() => {
		const storedTodos = localStorage.getItem("todos");

		if (storedTodos) {
			try {
				const parsedTodos: Todo[] = JSON.parse(storedTodos);
				setTodos(parsedTodos);
			} catch (error) {
				console.error("Gagal mengurai data JSON dari localStorage:", error);
			}
		}
	}, []);

	useEffect(() => {
		if (todos.length === 0) {
			localStorage.removeItem("todos");
		} else {
			localStorage.setItem("todos", JSON.stringify(todos));
		}
	}, [todos]);

	useEffect(() => {
		if (tabIndex !== undefined) {
			localStorage.setItem("tabIndex", String(tabIndex));
		}
	}, [tabIndex]);

	const addTodo = (value: string) => {
		if (!value.trim()) {
			return;
		}
		const newTodo = {
			name: value,
			done: false,
			id: uuidv4(),
		};
		setTodos(todos => [...todos, newTodo]);
		setNewTodo("");
	};

	const toggleTodo = (id: string, done: boolean) => {
		setTodos(todos =>
			todos.map(t => {
				if (t.id === id) {
					return { ...t, done: done };
				}
				return t;
			})
		);
	};

	const deleteTodo = (id: string) => {
		const updatedTodos = todos.filter(x => x.id !== id);
		setTodos(updatedTodos);
	};

	const deleteAll = () => {
		const remainTodos = todos.filter(x => !x.done);
		setTodos(remainTodos);
		console.log(todos);
	};

	return (
		<>
			<Center mt="50px">
				<VStack>
					<Heading>#todo</Heading>
					<Box w={{ base: "sm", sm: "xl" }}>
						<Tabs index={tabIndex} onChange={handleTabsChange} isLazy isFitted>
							<TabList>
								<Tab>All</Tab>
								<Tab>Active</Tab>
								<Tab>Completed</Tab>
							</TabList>
							<TabPanels>
								<TabPanel>
									<HStack mb="10px">
										<Input
											placeholder="add details"
											value={newTodo}
											onChange={e => setNewTodo(e.target.value)}
										/>

										<Button
											variant="primary-button"
											onClick={() => addTodo(newTodo)}
										>
											Add
										</Button>
									</HStack>
									{todos.map((x, i) => (
										<>
											<HStack>
												<Checkbox
													py="3px"
													size="lg"
													onChange={() => toggleTodo(x?.id, !x.done)}
													key={i}
													isChecked={x?.done}
												>
													<Text as={x?.done ? "del" : "abbr"}>{x?.name}</Text>
												</Checkbox>
											</HStack>
										</>
									))}
								</TabPanel>
								<TabPanel>
									<HStack mb="10px">
										<Input
											placeholder="add details"
											value={newTodo}
											onChange={e => setNewTodo(e.target.value)}
										/>

										<Button
											variant="primary-button"
											onClick={() => addTodo(newTodo)}
										>
											Add
										</Button>
									</HStack>
									{todos
										.filter(x => x?.done === false)
										.map((x, i) => (
											<>
												<HStack>
													<Checkbox
														py="3px"
														onChange={() => toggleTodo(x?.id, !x?.done)}
														key={i}
														isChecked={x?.done}
													>
														<Text as={x?.done ? "del" : "abbr"}>{x?.name}</Text>
													</Checkbox>
												</HStack>
											</>
										))}
								</TabPanel>
								<TabPanel>
									{todos
										.filter(x => x?.done === true)
										.map(x => (
											<>
												<HStack justify="space-between">
													<Checkbox
														onChange={() => toggleTodo(x?.id, !x?.done)}
														key={x?.id}
														isChecked={x?.done}
													>
														<Text as={x?.done ? "del" : "abbr"}>{x?.name}</Text>
													</Checkbox>
													<IconButton
														variant="delete-button"
														aria-label="Delete Todo"
														onClick={() => deleteTodo(x?.id)}
														icon={<DeleteIcon />}
													/>
												</HStack>
											</>
										))}
									{todos.filter(x => x?.done === true).length !== 0 ? (
										<Flex justify="end" align="center">
											<Button
												leftIcon={<DeleteIcon />}
												onClick={deleteAll}
												variant="danger-button"
												size="sm"
												mt="10px"
											>
												Delete All
											</Button>
										</Flex>
									) : (
										<Text>No Tasks Completed</Text>
									)}
								</TabPanel>
							</TabPanels>
						</Tabs>
					</Box>
				</VStack>
			</Center>
		</>
	);
}
export default App;
