import Swal from "sweetalert2";
import { prepareEvent } from "../helpers/prepareEvent";
import { fechConToken } from "../service/loginService";
import { types } from "../types/types";




export const startAddEvent = (event) => {
    return async (dispatch , getState) => {

        const resp = await fechConToken('events' , event , 'POST')
        const body = await resp.json()

        const {uuid , name} = getState().auth


        if(body.ok) {
            
            event.id = body.evento.id

            event.user = {
                _id : uuid,
                name : name    
            } 

            dispatch(eventAddNew(event))

        }

    }
} 

const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
});

export const eventStarLoading = () => {
    return async (dispatch) => {

        try {
            
            const resp = await fechConToken('events')
            const body = await resp.json()

            const event = prepareEvent( body.evento )

            dispatch(eventLoaded(event))

        } catch (error) {
            console.log(error);
        }

    }
}


const eventLoaded = (events) => ({
    type : types.eventLoaded,
    payload : events
})

export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
});

export const eventClearActiveEvent = () => ({ type: types.eventClearActiveEvent });

export const startEventUpdate = (event) => {
    return async (dispatch) => {

        const resp = await fechConToken(`events/${event._id}` , event , 'PUT')
        const body = await resp.json()
        try {

            if(body.ok) {
                dispatch(eventUpdated(event))
            }else {
                Swal.fire('Error' , body.mgs , 'error')
            }

        } catch (error) {
            console.log(error);
        }
    }
}

 const eventUpdated = ( event ) => ({
    type: types.eventUpdated,
    payload: event
});

export const startDeleteEvent = () => {

    
    return async(dispatch , getState) => {

      try {
        
        const {_id} = getState().calendar.activeEvent

        const resp = await fechConToken( `events/${_id}`  , {} , 'DELETE')
        const body = await resp.json()

        if(body.ok) {
            dispatch(eventDeleted())
        } else {
            Swal.fire('Error' , body.mgs ,"error")
        }

      } catch (error) {
          console.log(error);
      }

    }
}


export const eventDeleted = () => ({ type: types.eventDeleted });


