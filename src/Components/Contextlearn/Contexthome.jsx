import React,{useState} from 'react';
import { Mylistprovider } from './Mylistprovider.jsx'
import { useCart } from './Mylistprovider'
import Select from 'react-select'
import { Box, Autocomplete, TextField, Typography, Button, cardActionAreaClasses } from '@mui/material';


const Showdropdown = () => {
	const { products, cartitems, addTocart, totalPrice, value, setValue } = useCart();
    const [inputValue, setInputValue] = useState("");

	console.log(products)

	return (
		<div>
			<Autocomplete
				id="autocomplete-demo"
				options={products}
				sx={{ width: "200px", margin: "20px" }}

				value={value}
				onChange={(event, newValue) => {
					setValue(newValue);
				}}
				
				inputValue={inputValue}
				onInputChange={(event, newInputValue) => {
					setInputValue(newInputValue);
				}}
				getOptionLabel={(option) => { return option.name }}
				isOptionEqualToValue={(option, value) => { return option.name === value?.name }}
				renderOption={(props, option) => (
					<Box {...props}>
						<h4>{option.name}</h4>
					</Box>
				)}
				renderInput={(params) => <TextField {...params} label="lselect the product" />}
			/>
		</div>
	);


}

function Contexthome(props) {
	return (
		<>
			<h1>hello there</h1>
			<Mylistprovider>
				<Showdropdown />
				{/* <Showprice />
			<Showcart /> */}
			</Mylistprovider>
		</>
	);
}

export default Contexthome;