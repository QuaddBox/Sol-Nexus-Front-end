/** @format */

import { ActionIcon, Button, Flex, Image } from "@mantine/core";
import { GrTrash, GrFormAdd } from "react-icons/gr";
import { IoIosRemove } from "react-icons/io";

import "../styles/user/checkout.scss";
// import { useState } from "react";
// import { checkoutData } from "../data";

import NotFoundPage from "./NotFound";
import { useContext } from "react";
import { CheckoutContext } from "../contexts/CheckoutContext";
import searchImg from '../assets/Search-rafiki.svg'

const Checkout = () => {
  const { checkoutEvents } = useContext(CheckoutContext);
  console.log(checkoutEvents);

  // const [count, setCount] = useState(0);
  // Add tickets onclick on the plus icon
  // const ticketAddCount = (id) => {
  // 	const update = checkoutEvents?.map((item) => {
  // 		if (item.id === id) {
  // 			item.count = item.count + 1;
  // 		}
  // 		return item;
  // 	});
  // 	setData(update);
  // };

  // // remoe tickets onclick of minus icon
  // const ticketMinusCount = (id) => {
  // 	const update = data.map((item) => {
  // 		if (item.id === id && item.count > 0) {
  // 			item.count = item.count - 1;
  // 		}
  // 		return item;
  // 	});
  // 	setData(update);
  // };

  // Checkout data
  const checkOut = checkoutEvents.map((item, id) => {
    return (
      <div className="checkoutcrd" key={id}>
        <div className="checkoutlft">
          <img src={item.eventBanner} alt="" />
          <h2>{item.eventTitle}</h2>
        </div>
        <div className="checkoutrght">
          <ActionIcon variant="light" color="red">
            <GrTrash />
          </ActionIcon>
          <Flex align={"center"} gap={10} className="checkout-actions">
            <ActionIcon variant="light" color="red">
              <IoIosRemove />
            </ActionIcon>

            <p>{1}</p>

            <ActionIcon variant="light" color="green">
              <GrFormAdd />
            </ActionIcon>
          </Flex>
          <div className="price">
            <Flex
              align={"center"}
              gap={"5px"}
              className="like-card-price"
              pt={"10px"}
            >
              <Image
                w={"20px"}
                src="https://www.outsystems.com/Forge_CW/_image.aspx/Q8LvY--6WakOw9afDCuuGUhFcmpx1XGdLGwXRiNxxMU=/solana-integration-2023-01-04%2000-00-00-2023-10-11%2004-44-58"
                alt=""
              />
              <p>{item.pricePerTicket}</p>
            </Flex>
          </div>
        </div>
      </div>
    );
  });

  if (checkoutEvents === null) {
    return (
      <NotFoundPage
        title={"Sorry could not get event, it may be deleted or moved"}
      />
    );
  }
  if (checkoutEvents.length == 0) {
    return (
      <div className="flex flex-col items-center mt-20">
        <img src={searchImg} alt="" className="w-52" />
        <p className="text-center text-2xl font-medium  w-full">
          No Checked Out Event
        </p>
      </div>
    );
  }

  const totalPrice = checkoutEvents.reduce((accumulator, item) => {
    return (accumulator += item.pricePerTicket);
  }, 0);

  return (
    <div className="checkoutcont">
      <h1 className="checkout">Checkout</h1>
      <div className="checkoutwrp">
        <div className="checkoutitems">{checkOut}</div>

        <div className="checkout-cont">
          <h2>Summary</h2>
          <div className="checkout-right-items">
            <Flex align={"center"} justify={"space-between"} p={"5px 0px"}>
              <p>Subtotal</p>
              <Flex
                align={"center"}
                gap={"5px"}
                className="like-card-price"
                pt={"10px"}
              >
                <Image
                  w={"20px"}
                  src="https://www.outsystems.com/Forge_CW/_image.aspx/Q8LvY--6WakOw9afDCuuGUhFcmpx1XGdLGwXRiNxxMU=/solana-integration-2023-01-04%2000-00-00-2023-10-11%2004-44-58"
                  alt=""
                />
                <p>{totalPrice}</p>
              </Flex>
            </Flex>
            <Flex align={"center"} justify={"space-between"} p={"5px 0px"}>
              <p>Total</p>
              <Flex
                align={"center"}
                gap={"5px"}
                className="like-card-price"
                pt={"10px"}
              >
                <Image
                  w={"20px"}
                  src="https://www.outsystems.com/Forge_CW/_image.aspx/Q8LvY--6WakOw9afDCuuGUhFcmpx1XGdLGwXRiNxxMU=/solana-integration-2023-01-04%2000-00-00-2023-10-11%2004-44-58"
                  alt=""
                />
                <p>{totalPrice}</p>
              </Flex>
            </Flex>
          </div>
          <Button w={"100%"} className="checkoutbtn">
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
