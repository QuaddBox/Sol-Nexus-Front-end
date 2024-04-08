import React, { useContext } from 'react'
import { LikedEventsContext } from '../contexts/LikedEventsContext'

const useLikedEventsContext = () => {
    const context = useContext(LikedEventsContext)
    if(!context){
        throw Error('useLikedEventsContext must be used inside a LikedEventsContextProvider')
    }
    return context
}

export default useLikedEventsContext