import React, { ReactElement, useEffect, useState } from "react";

import Products from "./Products";
import axios from "axios";

type OrderType ="products"|"options";

interface Props {
    orderType:OrderType;
}

interface ProductDetail{name:string,imagePath:string}

export default function Type({orderType: type}: Props): ReactElement {
	const [items, setItems] = useState<ProductDetail[]>([]);

	useEffect(() => {
		const loadItems=async (orderType:OrderType)=>{
			try {
				const response= await axios.get<ProductDetail[]>(`http://localhost:5000/${orderType}`);
				console.log(response.data);
				setItems(response.data);
			} catch (error) {
				console.error(error);
			}
		};
		loadItems(type);
        
	}, [type]);

	const ItemComponent=type==="products"?Products:null;

	const optionItemList=items.map((item)=>{
		if(ItemComponent==null)return;


		return <ItemComponent key={item.name} name={item.name} imagePath={item.imagePath} />;
	});

	return (
		<div>
			{optionItemList}
		</div>
	);
}
