import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { ErrorBanner } from "../../components/ErrorBanner";
import { OrderContext, OrderDetails } from "../order/OrderContext";

interface Props {
  setStep: (step: number) => void;
}

export const CompletePage = (props: Props) => {
  const {
    order: { details },
    resetOrders,
  } = useContext(OrderContext);

  const [orderList, setOrderList] = useState<Array<{
    orderNumber: number;
    price: number;
  }> | null>(null);

  const [error, setError] = useState(false);

  useEffect(() => {
    const orderCompleted = async (orderDetails: OrderDetails) => {
      try {
        const res = await axios.post(
          "http://localhost:5000/order",
          orderDetails
        );
        setOrderList(res.data);
      } catch (e) {
        setError(error);
      }
    };

    orderCompleted(details);
  }, [details]);

  if (error) {
    return (
      <ErrorBanner message={"주문정보를 가져오는 중에 문제가 생겼습니다."} />
    );
  }

  return (
    <div>
      {orderList == null ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <h1>주문이 성공했습니다.</h1>
          <table>
            <thead>
              <tr>
                <td>모든 주문</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>주문 번호</th>
                <th>가격</th>
              </tr>
              {orderList.map((order) => (
                <tr key={order.orderNumber}>
                  <th>{order.orderNumber}</th>
                  <th>{order.price}</th>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={() => {
              resetOrders();
              props.setStep(0);
            }}
          >
            돌아가기
          </button>
        </>
      )}
    </div>
  );
};
