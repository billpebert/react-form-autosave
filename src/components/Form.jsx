import React, { useEffect, useReducer, useRef, useState } from "react"
import {
	Input,
	VStack,
	FormControl,
	FormLabel,
	Select,
	Textarea,
	Button,
	useToast,
	Box,
	Heading,
	Badge,
} from "@chakra-ui/react"
import { formReducer, init_state } from "../reducer/formCanggihReducer"

export default function Form() {
	let idleTime = useRef(15)
	let autoSaveInterval = useRef(60)
	const [state, dispatch] = useReducer(formReducer, init_state)
	const toast = useToast()
	const [isOnline, setIsOnline] = useState(navigator.onLine)

	const savedToast = () => {
		toast({
			position: "bottom-right",
			render: () => (
				<Box color="white" p={3} bg="green.400" borderRadius={8}>
					Form telah tersimpan otomatis
				</Box>
			),
		})
	}

	const handleInput = (e) => {
		dispatch({ type: "handleInput", payload: { name: e.target.name, value: e.target.value } })
	}

	// reset Idle time to 0
	document.onmousemove =
		document.onscroll =
		document.onclick =
		document.onclick =
			() => {
				idleTime.current = 15
				// console.log("idleTime reset!")
			}

	const savedData = () => {
		if (localStorage.getItem("formCanggih")) {
			dispatch({ type: "fetchSavedData" })
		} else console.log("no data saved")
	}

	// auto save every 60 sec
	const autoSave = () => {
		autoSaveInterval.current = autoSaveInterval.current - 1
		// console.log("auto save in: " + autoSaveInterval.current)
		if (autoSaveInterval.current === 0) {
			dispatch({ type: "saveFormCanggih" })
			autoSaveInterval.current = 60
		}
	}

	// auto save every 15 sec
	const autoSaveInactivity = () => {
		idleTime.current = idleTime.current - 1
		// console.log("idle in: " + idleTime.current)
		if (idleTime.current === 0) {
			dispatch({ type: "saveFormCanggih" })
		}
	}

	useEffect(() => {
		// Autosave trigger
		setInterval(() => {
			if (navigator.onLine) {
				if (autoSaveInterval.current === 1 || idleTime.current === 1) {
					savedToast()
				}
				autoSaveInactivity()
				autoSave()
			}
		}, 1000)

		// Get Saved data
		savedData()

		// Save data when no network
		const handleStatusChange = () => {
			setIsOnline(navigator.onLine)

			if (!navigator.onLine) {
				dispatch({ type: "saveFormCanggih" })
				savedToast()
				console.log("You're offline. Form autosaved!")
			}
		}

		window.addEventListener("online", handleStatusChange)
		window.addEventListener("offline", handleStatusChange)

		// Specify how to clean up after this effect for performance improvment
		return () => {
			window.removeEventListener("online", handleStatusChange)
			window.removeEventListener("offline", handleStatusChange)
		}
	}, [isOnline])

	return (
		<VStack gap={4}>
			<Badge colorScheme={isOnline ? "whatsapp" : "red"} borderRadius={4} fontWeight={500} mt={-7}>
				{" "}
				{isOnline ? "Online" : "Offline"}{" "}
			</Badge>
			<FormControl>
				<FormLabel>Fullname</FormLabel>
				<Input
					type="text"
					name="name"
					size={"sm"}
					onChange={handleInput}
					value={state.name}
					placeholder="Write your fullname"
				/>
			</FormControl>
			<FormControl>
				<FormLabel>Age</FormLabel>
				<Input
					type="number"
					name="age"
					size={"sm"}
					onChange={handleInput}
					value={state.age}
					placeholder="Write your age"
				/>
			</FormControl>
			<FormControl>
				<FormLabel>Marital Status</FormLabel>
				<Select
					type="text"
					name="maritalStatus"
					size={"sm"}
					onChange={handleInput}
					value={state.maritalStatus}
					placeholder="Select marital status"
				>
					<option value={"single"}>Single</option>
					<option value={"married"}>Married</option>
				</Select>
			</FormControl>
			<FormControl>
				<FormLabel>Address</FormLabel>
				<Textarea
					size={"sm"}
					name="address"
					onChange={handleInput}
					value={state.address}
					placeholder="Write your address"
				/>
			</FormControl>
			<FormControl>
				<FormLabel>Role</FormLabel>
				<Input
					type="text"
					size={"sm"}
					name="role"
					onChange={handleInput}
					value={state.role}
					placeholder="Write your job title"
				/>
			</FormControl>
			<FormControl>
				<FormLabel>Self Biography</FormLabel>
				<Textarea
					size={"sm"}
					name="biography"
					onChange={handleInput}
					value={state.biography}
					placeholder="Write your biography"
				/>
			</FormControl>
			<FormControl>
				<FormLabel>Upload Profile Photo</FormLabel>
				<Input type={"file"} size={"sm"} name="photo" onChange={handleInput} placeholder="Upload your photo" />
			</FormControl>
			<Button colorScheme={"whatsapp"} w="100%">
				Save
			</Button>
		</VStack>
	)
}
