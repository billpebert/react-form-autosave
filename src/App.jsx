import { Heading, Container, Input, VStack, FormControl, FormLabel, Select, Textarea, Button } from "@chakra-ui/react"
import { useState } from "react"

function App() {
  const [form, setForm] = useState({
    name: '',
    age: 0,
    maritalStatus: ['single'],
    address: '',
    role: '',
    biography: '',
    photo: '',
  })
  
  const handleInput = (e) => {
    setForm({...form, [e.target.name]: [e.target.value]})
  }

	return (
		<>
			<Container py={6} px={9}>
				<Heading as={"h1"} fontWeight={500} textAlign="center" width={"100%"} mb={10}>
					Form Canggih
				</Heading>
				<VStack gap={4}>
					<FormControl>
						<FormLabel>Fullname</FormLabel>
						<Input type="text" name="name" size={"sm"} onChange={handleInput} placeholder="Write your fullname" />
					</FormControl>
					<FormControl>
						<FormLabel>Age</FormLabel>
						<Input type="number" name="age" size={"sm"} onChange={handleInput} placeholder="Write your age" />
					</FormControl>
					<FormControl>
						<FormLabel>Marital Status</FormLabel>
						<Select type="text" name="maritalStatus" size={"sm"} onChange={handleInput} placeholder="Select marital status">
              <option value={'single'}>Single</option>
              <option value={'married'}>Married</option>
            </Select>
					</FormControl>
					<FormControl>
						<FormLabel>Address</FormLabel>
						<Textarea size={"sm"} name="address" onChange={handleInput} placeholder="Write your address"/>
					</FormControl>
					<FormControl>
						<FormLabel>Role</FormLabel>
            <Input type="text" size={"sm"} name="role" onChange={handleInput} placeholder="Write your job title" />
					</FormControl>
					<FormControl>
						<FormLabel>Self Biography</FormLabel>
						<Textarea size={"sm"} name="biography" onChange={handleInput} placeholder="Write your biography"/>
					</FormControl>
					<FormControl>
						<FormLabel>Upload Profile Photo</FormLabel>
						<Input type={'file'} size={"sm"} name="photo" onChange={handleInput} placeholder="Upload your photo"/>
					</FormControl>
          <Button colorScheme={'teal'} w='100%'>
            Save
          </Button>
				</VStack>
			</Container>
		</>
	)
}

export default App
