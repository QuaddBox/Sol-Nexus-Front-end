/** @format */
import { Flex, Image } from "@mantine/core";
import "../styles/user/like.scss";

import solcom3 from "../assets/solcom3.jpg";

import { FaHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import useLikedEventsContext from "../hooks/useLikedEventsContext";
import { DateTime } from "luxon";

const Like = () => {
  const { likedEvents } = useLikedEventsContext();
  const [events, setEvents] = useState([]);
  useEffect(() => {
    likedEvents.map((item, index) => {
      setEvents(likedEvents);
    });
  }, []);
  console.log(events);
  return (
    <div className="like-cont">
      <h1>Likes</h1>
      {events.map((item) => {
        const startDate = DateTime.fromSeconds(item.eventStarts.seconds);
        const endDate = DateTime.fromSeconds(item.eventEnds.seconds);
        return (
          <div className="like-item">
            <div className="like-card">
              <div className="like-card-left">
                <h2>{item.eventTitle}</h2>
                <p className="date">
                  {startDate.toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY)}
                </p>
                <p className="location">{item.venue}</p>
                <Flex
                  align={"center"}
                  gap={"10px"}
                  className="like-card-price"
                  pt={"10px"}
                >
                  <Image
                    w={"20px"}
                    src={
                      "https://www.outsystems.com/Forge_CW/_image.aspx/Q8LvY--6WakOw9afDCuuGUhFcmpx1XGdLGwXRiNxxMU=/solana-integration-2023-01-04%2000-00-00-2023-10-11%2004-44-58"
                    }
                    alt=""
                  />
                  <p>20.00</p>
                </Flex>
              </div>
              <div className="like-card-right">
                <Image src={item.eventBanner} />
                <div className="like-icon-cont">
                  <FaHeart className="like-icon" />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Like;
