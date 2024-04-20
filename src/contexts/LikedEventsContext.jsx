import { createContext, useCallback, useEffect, useMemo, useReducer } from "react";

export const LikedEventsContext = createContext();

const likedEventsReducer = (state, action) => {
  switch (action.type) {
    case "LIKE_EVENT":
      const newState = [...state.likedEvents]
      console.log(newState)
      if(!newState.includes(action.payload)){
        newState.push(action.payload)
        localStorage.setItem("likedEvents", JSON.stringify(newState));
        return { likedEvents: newState };
      }
   
      return state
      

    case "UNLIKE_EVENT":
      console.log("dislike event")
      const prevState = [...state.likedEvents]
      const eventIndex = prevState.indexOf(action.payload)
      prevState.splice(eventIndex, 1)
      localStorage.setItem("likedEvents", JSON.stringify(prevState))
      return { likedEvents: prevState }
      // const prevLikedEvents = JSON.parse(localStorage.getItem("likedEvents"));

      // localStorage.removeItem("likedEvents");
      // localStorage.setItem(
      //   "likedEvents",
      //   JSON.stringify(
      //     prevLikedEvents.filter((event) => {
      //       return event.id !== action.payload.id;
      //     })
      //   )
      // );
      // return { likedEvents: JSON.parse(localStorage.getItem("likedEvents")) };
    default:
      return state;
  }
};

const LikedEventsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(likedEventsReducer, {
    likedEvents: JSON.parse(localStorage.getItem("likedEvents")) || [],
  });

//   useEffect(() => {
//     const likedEvents = JSON.parse(localStorage.getItem("likedEvents"))
//     if(likedEvents){
//         dispatch({type: "LIKE_EVENT", payload: likedEvents})
//     }
//   }, [])

  const memoizedDispatch = useCallback(action => dispatch(action), []);
  const likedEventsContextValue = useMemo(() => ({...state, dispatch: memoizedDispatch}), [state, dispatch])


  return (
    <LikedEventsContext.Provider value={likedEventsContextValue}>
      {children}
    </LikedEventsContext.Provider>
  );
};

export default LikedEventsContextProvider;
