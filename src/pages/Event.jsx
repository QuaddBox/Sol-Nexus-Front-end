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

  const { addToCheckout } = useContext(CheckoutContext);

  const { likedEvents, dispatch } = useLikedEventsContext();

  const handleAddToCheckout = (event) => {
    console.log("event added to checkout");
    return () => addToCheckout(event);
  };

  // useEffect(() => {
  // 	console.log(checkoutEvents);
  // }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      console.log("getting events");
      try {
        const eventData = await EventService.getEvents();
        // console.log(eventData);
        console.log(likedEvents)
        const events = eventData.data.map((event) => {
          if (likedEvents.includes(event)) {
            event.isLiked = true;
          }
          return event;
        });
        setEvents(events);
        console.log(events);
      } catch (error) {
        console.error("Error fetching events", error);
      }
    };

    fetchEvents();
  }, []);

  // console.log(likedEvents)
  [
    {
      id: "4xeHT3DbJmkg1kvmo1vt",
      organizer: "Nexus",
      eventEnds: {
        seconds: 1713481200,
        nanoseconds: 0,
      },
      state: "Rivers",
      organiserProfile: {
        website: "",
        bio: "wgohwofhsohfoishfoihsodfhsafsvsdfsdfsvfvsvsv",
        name: "YAM",
        banner:
          "https://firebasestorage.googleapis.com/v0/b/solnexus-df8f9.appspot.com/o/download%20(4).jpeg?alt=media&token=bb258f8b-ec49-4fdb-929a-d4858a8fe3b8",
      },
      eventTitle: "Godrice Yam Festival",
      refundPolicy: false,
      venue: "anywhere you see canopy",
      country: "Nigeria",
      walletAddress: "CMR9SfHJ1MUtEHWiQKdVLKDoMSDf6JEJoMyjop9u9gv4",
      eventBanner:
        "https://firebasestorage.googleapis.com/v0/b/solnexus-df8f9.appspot.com/o/download%20(4).jpeg?alt=media&token=93a6beb0-50b3-488c-a6c8-f34d047d9004",
      host: "YAM",
      eventType: "Venue",
      description: "If you jonz i turn you to yam",
      createdBy: "godriceonuwa@gmail.com",
      eventStarts: {
        seconds: 1713394800,
        nanoseconds: 0,
      },
      pricePerTicket: 1,
      category: "Food",
      tickets: 5,
      ticketsSold: [],
      isLiked: true,
    },
    {
      id: "2wpccmckqMGwyvCLskC5",
      host: "uliboy",
      refundPolicy: false,
      eventBanner:
        "https://firebasestorage.googleapis.com/v0/b/solnexus-df8f9.appspot.com/o/pioaeghoierh.jpg?alt=media&token=5b94bd10-0da4-4768-b3ea-472386d3c941",
      eventStarts: {
        seconds: 1713999600,
        nanoseconds: 0,
      },
      eventTitle: "event of year",
      walletAddress: "CMR9SfHJ1MUtEHWiQKdVLKDoMSDf6JEJoMyjop9u9gv4",
      category: "Gaming",
      state: "Rivers",
      eventEnds: {
        seconds: 1714086000,
        nanoseconds: 0,
      },
      pricePerTicket: 1,
      venue: "anywhere you see canopy",
      eventType: "Venue",
      createdBy: "godriceonuwa@gmail.com",
      organizer: "Nexus",
      organiserProfile: {
        name: "uliboy",
        website: "",
        bio: "fbckjbdckjabckjabdcjkabcjkbakcjbajkdbckajdbc",
        banner:
          "https://firebasestorage.googleapis.com/v0/b/solnexus-df8f9.appspot.com/o/B8pazntU_400x400.jpg?alt=media&token=479d11a2-df4b-43ac-84e3-8de14c006679",
      },
      country: "Nigeria",
      description: "lol jqefjhbdkjdbakjbadkjfbakjdfkjadb",
      ticketsSold: [],
      tickets: 5,
      isLiked: true,
    },
  ];

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
    }
    else{
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

  const cardData = events?.map((item, id) => {
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
      <div className="card" key={id}>
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
                onClick={handleAddToCheckout(item)}
              >
                <GrAdd color="white" fontSize={"18px"} />
              </ActionIcon>
            </Tooltip>
          </Flex>
        </div>

        <NavLink className={"cardlink"} to={`eventdetails/${item.id}`}>
          <div className="cardtls">
            <h1 className="font-semibold">{item.eventTitle}</h1>
            <p className="date capitalize">
              {startDate.toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY)}
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
              <div className="filterinput">
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
              </div>

              <div className="filterinput">
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
              </div>
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
            {cardData}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Event;
