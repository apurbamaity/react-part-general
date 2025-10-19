import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import { Link } from 'react-router-dom'
import axios from 'axios'

import Login from './Components/Login/Login.jsx'
import ProtectedRoute from './Components/Protectedroute.jsx'
import Home from './Components/Home/Home.jsx'
import Richtexteditor from './Components/Richtexteditor/Richtexteditor.jsx'


function App() {
	// State to hold form data
	const [formData, setFormData] = useState({
		name: "",
		age: "",
		email: "",
		table: "",
	});

	// Dynamic dropdown list
	const tableNames = ["users", "orders", "products", "customers"];

	// Handle form changes
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	async function insertSingleHero() {
		try {
			const payload = {
				table_name: "hero",
				data: {
					name: formData.name,
					secret_name: formData.email,
					age: formData.age,
				}
			};

			const response = await axios.post("http://localhost:8000/insert_single_hero", payload);
			console.log("✅ Success:", response.data);
		} catch (error) {
			if (error.response) {
				console.error("❌ API Error:", error.response.data);
			} else {
				console.error("❌ Request Error:", error.message);
			}
		}
	}

	return (
		// <>
		// 	<div className='flex bg-red-400 justify-center items-center '>
		// 		<div className='container   p-4  '>
		// 			<h1 className='text-3xl font-bold text-white'>Welcome to React</h1>
		// 			<p className='text-white'>This is a simple React application.</p>
		// 		</div>
		// 	</div>

		// 	<div className='flex flex-row items-center justify-center p-4 bg-red-100'>
		// 		<div className='container bg-white p-4 rounded shadow-md'>
		// 			{
		// 				Object.keys(formData).map((key) => {
		// 					if (key == 'table') {
		// 						return (
		// 							// Dropdown for "table"
		// 							<select
		// 								name={key}
		// 								value={formData[key]}
		// 								onChange={handleChange}
		// 								className=" p-2 border border-gray-300 rounded-2xl w-1/4 "
		// 							>
		// 								<option value="">Select table</option>
		// 								{tableNames.map((tbl) => (
		// 									<option key={tbl} value={tbl}>
		// 										{tbl}
		// 									</option>
		// 								))}
		// 							</select>
		// 						)
		// 					} else if (key == 'name') {
		// 						return (
		// 							<input
		// 								key={key}
		// 								type="text"
		// 								name={key}
		// 								value={formData[key]}
		// 								onChange={handleChange}
		// 								placeholder="Enter your name"
		// 								className='border p-2 m-2 rounded-2xl w-1/5'
		// 							/>
		// 						)
		// 					} else if (key == 'age') {
		// 						return (
		// 							<input
		// 								key={key}
		// 								type="number"
		// 								name={key}
		// 								value={formData[key]}
		// 								onChange={handleChange}
		// 								placeholder="Enter your age"
		// 								className='border p-2 m-2 rounded-2xl w-1/5'
		// 							/>
		// 						)
		// 					} else if (key == 'email') {
		// 						return (
		// 							<input
		// 								key={key}
		// 								type="email"
		// 								name={key}
		// 								value={formData[key]}
		// 								onChange={handleChange}
		// 								placeholder="Enter your email"
		// 								className='border p-2 m-2 rounded-2xl w-1/4'
		// 							/>
		// 						)
		// 					} else if (key == 'table') {
		// 						return (
		// 							<select
		// 								key={key}
		// 								name={key}
		// 								value={formData[key]}
		// 								onChange={handleChange}
		// 								className='border p-2 m-2 w-1/4'
		// 							>
		// 								{tableNames.map((table) => (
		// 									<option key={table} value={table}>
		// 										{table}
		// 									</option>
		// 								))}
		// 							</select>
		// 						)
		// 					}
		// 				})
		// 			}
		// 			<button
		// 				onClick={() => insertSingleHero()}
		// 				className='bg-blue-500 text-white p-2 rounded-2xl mt-4 w-full hover:bg-blue-600 hover:cursor-pointer transition-colors duration-300'
		// 			>
		// 				Submit
		// 			</button>
		// 		</div>
		// 	</div>
		// </>

		<BrowserRouter>
			<Routes>
				{/* Define your routes here */}
				<Route path="/" element={<Login />} />  {/* JWT path here */}
				<Route path = "/home" element={<ProtectedRoute><Home/></ProtectedRoute> } />
				<Route path = "/fulltexteditor" element = {<Richtexteditor/>} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
