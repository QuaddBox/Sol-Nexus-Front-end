import { createContext, useCallback, useEffect, useMemo, useReducer } from "react";

export const LikedEventsContext = createContext();

const likedEventsReducer = (state, action) => {
  switch (action.type) {
    case "LIKE_EVENT":
        console.log(state)
      const newState = [...state.likedEvents]

      if(!newState.includes(action.payload)){
        newState.push(action.payload)
        localStorage.setItem("likedEvents", JSON.stringify(newState));
        return { likedEvents: newState };
      }
      return;
      

    case "UNLIKE_EVENT":
      const prevLikedEvents = JSON.parse(localStorage.getItem("likedEvents"));
      localStorage.removeItem("likedEvents");
      localStorage.setItem(
        "likedEvents",
        JSON.stringify(
          prevLikedEvents.filter((event) => {
            return event.id !== action.payload.id;
          })
        )
      );
      return { likedEvents: JSON.parse(localStorage.getItem("likedEvents")) };
    default:
      const state2 = localStorage.getItem("likedEvents");

      return { likedEvents: state2 };
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
