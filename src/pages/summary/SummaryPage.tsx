import React, { ReactElement, useState } from "react";

export const SummaryPage = ():ReactElement => {
	const [read, setRead] = useState(false);

	return (
		<div>
			<h1>주문 확인</h1>
			<h2 className="product-price">products:{}원</h2>
			<ul>{}</ul>
			<div className="checkbox-wrapper">
				<label htmlFor="read-list">주문하려는 것을 확인 하셨나요?</label>
				<input
					checked={read}
					type="checkbox"
					name="read-checkbox"
					id="read-list"
					onChange={(e) => setRead(e.currentTarget.checked)}
				/>
			</div>
			<button disabled={!read}>주문 확인</button>
		</div>
	);
};
