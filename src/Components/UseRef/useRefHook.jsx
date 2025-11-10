import { useState, useRef, useEffect } from "react";

function Drawer({ isOpen, onClose, currentValue }) {

	console.log(" Drawer Component rendered"); // Notice how often this logs
	const previousRef = useRef(null);
	const currentRef = useRef(null);

	// const [prevvalue, setPrevvalue] = useState(0);
	// const [currvalue, setCurrvalue] = useState(0);





	// Update previous value AFTER every render
	useEffect(() => {
		previousRef.current = currentValue[1];
		currentRef.current = currentValue[0];
		// setCurrvalue(currentValue[0])
		// setPrevvalue(currentValue[1])

	}, [currentValue]);

	return (
		<>
			{/* Overlay */}
			<div
				className={`fixed inset-0 bg-black/50 transition-opacity z-40 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
					}`}
				onClick={onClose}
			/>

			{/* Drawer */}
			<div
				className={`fixed top-0 right-0 h-full w-72 bg-white shadow-xl transition-transform duration-300 z-50 ${isOpen ? "translate-x-0" : "translate-x-full"
					}`}
			>
				<div className="p-4 border-b flex justify-between items-center">
					<h2 className="font-semibold text-lg">Counter Snapshot</h2>
					<button className="text-xl font-bold" onClick={onClose}>×</button>
				</div>

				<div className="p-4 space-y-4">
					<div className="bg-blue-100 p-3 rounded-md">
						<p className="text-sm text-gray-500">Current Value</p>
						{/* <p className="text-3xl font-bold text-blue-700">{currentRef.current}</p> */}
					</div>

					<div className="bg-purple-100 p-3 rounded-md">
						<p className="text-sm text-gray-500">Previous Value</p>
						{/* <p className="text-3xl font-bold text-purple-700">
							{previousRef.current ?? "None"}
						</p> */}
					</div>
				</div>
			</div>
		</>
	);
}

export default function App() {
	console.log(" App Component rendered"); // Notice how often this logs

	const [value, setValue] = useState([0, 0]);
	const [drawerOpen, setDrawerOpen] = useState(false);

	return (
		<div className="h-screen flex flex-col items-center justify-center gap-6 bg-gray-100">
			<p className="text-lg font-medium">Value: {value}</p>

			<div className="flex gap-4">
				<button
					onClick={() =>
						setValue(prev => {
							const newArr = [...prev];
							newArr[0] = prev[0]+1;
							newArr[1] = prev[0];
							return newArr;
						})}
					className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
				>
					Increment
				</button>

				<button
					onClick={() => setDrawerOpen(true)}
					className="px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
				>
					{value}
				</button>
			</div>

			<Drawer
				isOpen={drawerOpen}
				onClose={() => setDrawerOpen(false)}
				currentValue={value}
			/>
		</div >
	);
}
