/** @format */
import { NavLink } from "react-router-dom";
// import { userCardData } from "../data";

import { motion } from "framer-motion";

import "../styles/user/user.scss";

import {
  ActionIcon,
  Autocomplete,
  Badge,
  Flex,
  ScrollArea,
  Tooltip,
} from "@mantine/core";
import "@mantine/core/styles.css";
import { useEffect, useState, useContext, useCallback } from "react";
import { PiCaretDown } from "react-icons/pi";

// **** ===> ===> Icon package <=== <=== ****
import { MdOutlineEvent } from "react-icons/md";
import { RxRocket } from "react-icons/rx";
import { HiOutlineMusicalNote } from "react-icons/hi2";
import { RiRobot2Line } from "react-icons/ri";
import { TfiMicrophoneAlt } from "react-icons/tfi";
import { LuPartyPopper } from "react-icons/lu";
import { GrAdd, GrGamepad } from "react-icons/gr";
import { FaCode, FaHeart, FaRegHeart } from "react-icons/fa6";
import { FaTheaterMasks } from "react-icons/fa";
// import { LuCornerRightDown } from "react-icons/lu";

// <<< **** Packages **** >>>
import { Country, State } from "country-state-city";
import EventService from "../../services/EventService";
import { DateTime } from "luxon";
import { CheckoutContext } from "../contexts/CheckoutContext";
import useLikedEventsContext from "../hooks/useLikedEventsContext";

import toast from "react-hot-toast";
import useConnectWallet from "../hooks/useConnectWallet";

// eslint-disable-next-line react/prop-types
const Event = () => {
  const [events, setEvents] = useState([]);
  const [likedEvent, setlikedEvent] = useState();
  const [loading, setLoading] = useState(false);

  const { addToCheckout,checkoutEvents } = useContext(CheckoutContext);

  const { likedEvents, dispatch } = useLikedEventsContext();

	const handleAddToCheckout = (event) => {
		// console.log("event added to checkout");
		console.log(event)
		addToCheckout(event)
	};

	useEffect(() => {
		console.log(checkoutEvents);
	}, [checkoutEvents]);

  useEffect(() => {
    const fetchEvents = async () => {
      console.log("getting events");
      setLoading(true);
      try {
        const eventData = await EventService.getEvents();
        console.log(likedEvents);
        const events = eventData.data.map((event) => {
          if (likedEvents.includes(event)) {
            event.isLiked = true;
          }
          return event;
        });
        setEvents(events);
        console.log(events);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events", error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // state and country
  const [states, setStates] = useState([]);
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");

  // **** >>> Function to get all states and country <<< ****
  const countries = Country.getAllCountries().flatMap(
    (country) => country.name
  );
  const allStates = states.map((state) => state.name);

  useEffect(() => {
    setStates(
      State.getStatesOfCountry(
        Country.getAllCountries().filter((item) => {
          return item.name == country;
        })[0]?.isoCode
      )
    );
  }, [country]);

  const { walletAddress } = useConnectWallet();

  console.log(likedEvents);

  const like = (id) => {
    if (!walletAddress) {
      toast.error("You must connect wallet before liking an event");
    } else {
      const update = events?.map((item) => {
        if (item.id === id) {
          item.isLiked = !item.isLiked;
          setlikedEvent(item);
        }
        return item;
      });
      dispatch({
        type: "LIKE_EVENT",
        payload: events.filter((item) => item.id == id)[0],
      });
    }
    // setEvents(update);
  };

  const filterByStateOrCountry = (state, country) => {
    console.log(country, state);
    return events.filter(
      (item) => item.state == state || item.country == country
    );
  };

  const cardData = (events) =>
    loading
      ? Array(8)
          .fill(0)
          .map(() => {
            return (
              <div className="bg-[#2d2d2d] w-full h-32 rounded-sm animate-pulse " />
            );
          })
      : events?.map((item, id) => {
          const startDate = DateTime.fromSeconds(item.eventStarts.seconds);
          const endDate = DateTime.fromSeconds(item.eventEnds.seconds);

          const getColor = (status) => {
            if (status.toLowerCase() === "not started") return "#9e9e9e";
            if (status.toLowerCase() === "ongoing") return "#c2c20d";
            return "#1f9707";
          };
          const getStatus = () => {
            if (startDate.diffNow() > 0) return "not started";
            if (endDate.diffNow() > 0) return "ongoing";
            return "completed";
          };
          return (
            <div className="rounded-[20px] bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5">
              <div className="card w-full h-full bg-[#07010b]" key={id}>
                <div className="cardimg relative">
                  <img src={item.eventBanner} alt="" />
                </div>
                <div className="cardactions">
                  <Flex align={"center"} gap={"10px"}>
                    {/* Like function */}
                    <ActionIcon
                      // variant="white"
                      onClick={() => like(item.id)}
                      color="white"
                      bg={"black"}
                      size={"lg"}
                      radius={"20px"}
                    >
                      {/* <FaHeartO color={item.isLiked ? "red" : "white"} fontSize={"18px"} /> */}
                      {item.isLiked ? (
                        <FaHeart fontSize={"18px"} color="red" />
                      ) : (
                        <FaRegHeart fontSize={"18px"} color="white" />
                      )}
                    </ActionIcon>
              
                          {/* Ticket page */}
                          <Tooltip label="add to checkout">
                            <ActionIcon
                              variant="white"
                              bg={"black"}
                              color="white"
                              size={"lg"}
                              radius={"20px"}
                              onClick={()=>handleAddToCheckout(item)}>
                              <GrAdd color="white" fontSize={"18px"} />
                            </ActionIcon>
                          </Tooltip>
                        </Flex>
                      </div>
                <NavLink className={"cardlink"} to={`eventdetails/${item.id}`}>
                  <div className="cardtls">
                    <h1 className="font-semibold">{item.eventTitle}</h1>
                    <p className="date capitalize">
                      {startDate.toLocaleString(
                        DateTime.DATETIME_MED_WITH_WEEKDAY
                      )}
                    </p>
                    <p className="location">{item.venue}</p>
                    <div className="cardpricecont">
                      <div className="crdprice">
                        <img
                          className="rounded-full"
                          src="https://www.outsystems.com/Forge_CW/_image.aspx/Q8LvY--6WakOw9afDCuuGUhFcmpx1XGdLGwXRiNxxMU=/solana-integration-2023-01-04%2000-00-00-2023-10-11%2004-44-58"
                          alt=""
                        />
                        <p>{item.pricePerTicket} SOL</p>
                      </div>
                      <div className="cardpricestatus">
                        <Badge size="sm" color={getColor(getStatus())}>
                          {getStatus()}
                        </Badge>
                      </div>
                    </div>
                    {/* <p className="type">FREE</p> */}
                  </div>
                </NavLink>
              </div>
            </div>
          );
        });

  return (
    <div className="userwrp">
      <section className="sectioncont">
        <div className="bg">
          <div className="card">{/* <MdOutlineEvent /> */}</div>
          <div className="card"></div>
          <div className="card"></div>
          <div className="card">{/* <RxRocket /> */}</div>
        </div>
        <motion.header className="header">
          <div className="background-linear">
            <div className="box">
              <MdOutlineEvent />
            </div>
            <div className="box">
              <HiOutlineMusicalNote />
            </div>
            <div className="box">
              <RiRobot2Line />
            </div>
            <div className="box">
              <RxRocket />
            </div>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.7,
              },
            }}
          >
            Discover, engage, and network with individuals
          </motion.h1>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.3,
                delay: 1,
              },
            }}
            className="management"
          >
            on SolNexus
          </motion.h1>
        </motion.header>
        <ScrollArea>
          <div className="filter-cont">
            <div className="filter">
              <div className="filtericon">
                <TfiMicrophoneAlt className={"filter-music-icon"} />
              </div>
              <div className="filtertxt">
                <p>Music</p>
              </div>
            </div>
            <div className="filter">
              <div className="filtericon">
                <LuPartyPopper />
              </div>
              <div className="filtertxt">
                <p>Nightlife</p>
              </div>
            </div>
            <div className="filter">
              <div className="filtericon">
                <GrGamepad />
              </div>
              <div className="filtertext">
                <p>Gaming</p>
              </div>
            </div>
            <div className="filter">
              <div className="filtericon">
                <FaCode />
              </div>
              <div className="filtertxt">
                <p>Tech</p>
              </div>
            </div>
            <div className="filter">
              <div className="filtericon">
                <FaTheaterMasks />
              </div>
              <div className="filtertext">
                <p>Visual Art</p>
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* **** ===> ===> Browse events with state and country **** <=== <=== */}
        <div className="usercardcont">
          <div className="usercardheader">
            <h2>Browse Events in</h2>
            <div className="filtercont">
              <Autocomplete
                size="md"
                placeholder={`Select country`}
                value={country}
                onChange={(country) => {
                  setCountry(country);
                }}
                styles={{
                  root: {
                    width: "100%",
                  },
                  input: {
                    width: "100%",
                    backgroundColor: "#07000a",
                    border: "2px solid #9e9e9e",
                    borderRadius: "20px",
                    padding: "1.25rem",
                    color: "white",
                  },
                  dropdown: {
                    backgroundColor: "#07000a",
                  },
                }}
                data={countries}
                rightSectionPointerEvents="none"
                rightSection={<PiCaretDown />}
                classNames={{
                  input: "dropdown",
                  option: "select-option",
                }}
              />
              <Autocomplete
                size="md"
                placeholder={`Select state`}
                value={state}
                onChange={(state) => {
                  setState(state);
                }}
                styles={{
                  root: {
                    width: "100%",
                  },
                  input: {
                    width: "100%",
                    backgroundColor: "#07000a",
                    border: "2px solid #9e9e9e",
                    borderRadius: "20px",
                    padding: "1.25rem",
                    color: "white",
                  },
                  dropdown: {
                    backgroundColor: "#07000a",
                  },
                }}
                data={allStates}
                rightSectionPointerEvents="none"
                rightSection={<PiCaretDown />}
                classNames={{
                  input: "dropdown",
                  option: "select-option",
                }}
                disabled={country ? false : true}
              />
              {/* <div className="filterinput">
                <Autocomplete
                  value={country}
                  onChange={(country) => {
                    setCountry(country);
                  }}
                  size="md"
                  data={countries}
                  comboboxProps={{
                    position: "bottom",
                    middlewares: { flip: false, shift: false },
                    shadow: false,
                  }}
                  placeholder="Country"
                />
              </div> */}

              {/* <div className="filterinput">
                <Autocomplete
                  size="md"
                  placeholder="Choose your state"
                  value={state}
                  onChange={(state) => {
                    setState(state);
                  }}
                  data={allStates}
                  rightSectionPointerEvents="none"
                  comboboxProps={{
                    position: "bottom",
                    middlewares: { flip: false, shift: false },
                    shadow: "false",
                  }}
                  disabled={country ? false : true}
                />
              </div> */}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.1,
                delay: 0.7,
              },
            }}
            className="usercrdwrp"
          >
            {country.length > 0 || state.length > 0 ? cardData(filterByStateOrCountry(state, country)) : cardData(events) }
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Event;
