import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import SidePanelGui from '../SidePannelGui/SidePanelGui';
import TeamMembersListGui from '../TeamGui/TeamMembersListGui';
import moment from 'moment';

import './DefaultCalendar.css'
import './AddedCalendar.css'

const CompleteCalendar = ({
    date, 
    savedTeamData,
    selectedDates,
    setSavedUserDates,
    savedUserDates,
    setSavedTeamData,
    triggerFetch,
    fetchData,
    setDate,
    startDate,
    setMonthCount,
    monthCount,
    currentCalanderDate,
    setCurrentCalanderDate
}) =>{

    const handleClass = ({ date, view }) => {
        const fixedFormatCurrentDay = moment(date).format("YYYY/MM/DD")
        
        return(
            selectedDates && savedUserDates // If data is part of user selection and saved selection, add both needed classes.
            && selectedDates.has(fixedFormatCurrentDay) 
            && savedUserDates.has(fixedFormatCurrentDay)
            
            ? 'react-calendar__tile-special selectedInOffice'
            : selectedDates && selectedDates.has(fixedFormatCurrentDay)
            
            ? 'react-calendar__tile-special'
            : savedUserDates && savedUserDates.has(fixedFormatCurrentDay)
            
            ? 'selectedInOffice'
            : null
        );
    };

      const handleSelect =(e)=>{
        setDate(new Date(e))
        setMonthCount(monthCount + 1)
        console.log(monthCount)
        const fixedDate = moment(new Date(e)).format("YYYY/MM/DD")
        
        if(selectedDates.has(fixedDate) === false){
          selectedDates.add(fixedDate) 
        }
        else{
          selectedDates.delete(fixedDate)
        };
      };

    const PreviousIcon =()=>{

        return(
            <div onClick={()=> console.log('prev')}> ‹ </div>
        )
    }
    const NextIcon =()=>{

        const hadnleNextMonth =()=>{
            const newCount = monthCount + 1
            const setNewDate = new Date(new Date().setMonth(new Date().getMonth() + newCount))
            
            setMonthCount( newCount )
            setCurrentCalanderDate( setNewDate ) 
            triggerFetch(!fetchData)
        }
      
        return(
            <div onClick={()=> hadnleNextMonth()}> › </div>
        )
    }


    return(
        <div className='joined-calendar'>
            <Calendar 
                defaultActiveStartDate={startDate}
                onChange={handleSelect} 
                value={date} 
                tileClassName = {handleClass}
                tileContent = {({ date }) => <TeamMembersListGui date={date} savedTeamData={savedTeamData} />}
                tileDisabled={({ date }) => date.getDay() === 0 || date.getDay() === 6 }
                view={"month"}

                nextLabel={<NextIcon />}
                prevLabel={<PreviousIcon  />}
            />
            <SidePanelGui 
                selectedDates={selectedDates} 
                savedUserDates={savedUserDates} 
                setSavedUserDates={setSavedUserDates} 
                savedTeamData={savedTeamData} 
                setSavedTeamData={setSavedTeamData} 
                triggerFetch={triggerFetch} 
                fetchData={fetchData} 
            />
        </div>
    )
}

export default CompleteCalendar
