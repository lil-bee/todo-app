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
		const newTodo = {
			name: value,
			done: false,
			id: uuidv4(),
		};
		setTodos(todos => [...todos, newTodo]);
		setNewTodo("");
	};

	const toggleTodo = (id: string, done: boolean) => {
		console.log("click");
		console.log(todos);
		setTodos(todos =>
			todos.map(t => {
				if (t.id === id) {
					t.done = done;
				}
				return t;
			})
		);
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
													onChange={() => toggleTodo(x.id, !x.done)}
													key={i}
													isChecked={x.done}
												>
													<Text as={x.done ? "del" : "abbr"}>{x.name}</Text>
												</Checkbox>
											</HStack>
										</>
									))}
								</TabPanel>
								<TabPanel>2</TabPanel>
								<TabPanel>3</TabPanel>
							</TabPanels>
						</Tabs>
					</Box>
				</VStack>
			</Center>
		</>
	);
}

export default App;
