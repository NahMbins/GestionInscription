import React,{ useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from '@fullcalendar/interaction'
import { ExpressAxios } from './baseUrl';
import Navigation from './nav';



const Calendrie = () => {

    const[events,setevents]=useState([])

    useEffect(() => {
        getEvent();
    },[]);


    const getEvent =  async () => {

        const response = await ExpressAxios.get("/findEvent");
        if (response.status === 200) {
            setevents(response.data);
            console.log(response.data);
        }
    }
     
    
    return (
        <>
        <Navigation /> 
        
        <div className='container p-2'>
            
            <FullCalendar
                plugins={[dayGridPlugin,timeGridPlugin,interactionPlugin]}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                  }}
                initialView='dayGridMonth'
                eventColor= 'green'
                weekends={true}
                events={events}   
                
            />
    </div>
    </>
    )
}

export default Calendrie