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
} from "@chakra-ui/react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
	const [newTodo, setNewTodo] = useState("");
	const [todos, setTodos] = useState([
		{
			id: "1",
			name: "todo1",
			done: false,
		},
		{
			id: "3",
			name: "todo2",
			done: false,
		},
	]);

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
			<Center>
				<VStack>
					<Heading>#todo</Heading>
					<Box w="xl">
						<Tabs isFitted>
							<TabList>
								<Tab>All</Tab>
								<Tab>Active</Tab>
								<Tab>Completed</Tab>
							</TabList>
							<TabPanels>
								<TabPanel>
									<HStack>
										<Input
											value={newTodo}
											onChange={e => setNewTodo(e.target.value)}
										/>

										<Button onClick={() => addTodo(newTodo)}>Add</Button>
									</HStack>
									{todos.map((x, i) => (
										<>
											<HStack>
												<Checkbox
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
									{todos
										.filter(x => x?.done === false)
										.map((x, i) => (
											<>
												<HStack>
													<Checkbox
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
										.map((x, i) => (
											<>
												<HStack>
													<Checkbox
														onChange={() => toggleTodo(x?.id, !x?.done)}
														key={x?.id}
														isChecked={x?.done}
													>
														<Text as={x?.done ? "del" : "abbr"}>{x?.name}</Text>
													</Checkbox>
													<Button onClick={() => deleteTodo(x?.id)}>
														<DeleteIcon />
													</Button>
												</HStack>
											</>
										))}
									<Button onClick={deleteAll} colorScheme="red">
										Delete All
									</Button>
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
