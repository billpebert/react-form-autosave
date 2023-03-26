import { Heading, Container } from "@chakra-ui/react"
import Form from "./components/Form"

function App() {

	return (
		<>
			<Container py={6} px={9}>
				<Heading as={"h1"} fontWeight={600} fontSize={32} textAlign="center" width={"100%"} mb={10}>
					Form Canggih
				</Heading>
				<Form/>
			</Container>
		</>
	)
}

export default App
