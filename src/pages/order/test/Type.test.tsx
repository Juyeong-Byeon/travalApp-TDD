import { render, screen } from "@testing-library/react";

import Type from "../Type";

it("should render image well",async ()=>{
	render(<Type orderType='products'/>);
	const productsImage:HTMLImageElement[]=(await screen.findAllByAltText("/products$/i")) as Array<HTMLImageElement>;
	expect(productsImage).toHaveLength(2);
	const altTexts=productsImage.map(elem=>elem.alt);
	expect(altTexts).toEqual(["America product","England product"]);

    
});

export {};