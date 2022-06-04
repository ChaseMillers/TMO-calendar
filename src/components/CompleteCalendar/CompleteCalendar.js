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
    setDate
}) =>{

    const handleClass = ({ date, view }) => (
  
        selectedDates && savedUserDates // If data is part of user selection and saved selection, add both needed classes.
        && selectedDates.has(moment(date).format("MM/DD/YYYY")) 
        && savedUserDates.has(moment(date).format("MM/DD/YYYY"))
        
        ? 'react-calendar__tile-special selectedInOffice'
        : selectedDates && selectedDates.has(moment(date).format("MM/DD/YYYY"))
        
        ? 'react-calendar__tile-special'
        : savedUserDates && savedUserDates.has(moment(date).format("MM/DD/YYYY"))
        
        ? 'selectedInOffice'
        : null
      );

      const handleSelect =(e)=>{
        setDate(new Date(e))
    
        const fixedDate = moment(new Date(e)).format("MM/DD/YYYY")
        
        if(selectedDates.has(fixedDate) === false){
          selectedDates.add(fixedDate) 
        }
        else{
          selectedDates.delete(fixedDate)
        };
      };


    return(
        <div className='joined-calendar'>
            <Calendar 
                onChange={handleSelect} 
                value={date} 
                tileClassName = {handleClass}
                tileContent = {({ date }) => <TeamMembersListGui date={date} savedTeamData={savedTeamData} />}
                tileDisabled={({ date }) => date.getDay() === 0 || date.getDay() === 6 }
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
