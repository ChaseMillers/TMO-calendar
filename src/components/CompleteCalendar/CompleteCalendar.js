import React from 'react';
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
       
        const fixedDate = moment(new Date(e)).format("YYYY/MM/DD")
        
        if(selectedDates.has(fixedDate) === false){
          selectedDates.add(fixedDate) 
        }
        else{
          selectedDates.delete(fixedDate)
        };
      };



    const PreviousIcon =()=>{
        const handlePrevMonth =()=>{
            const newCount = monthCount - 1
            const setNewDate = new Date(new Date().setMonth(new Date().getMonth() + newCount))
            
            setMonthCount( newCount )
            setCurrentCalanderDate( setNewDate ) 
        }

        return(
            <div onClick={()=> handlePrevMonth()}> ‹ </div>
        )
    }
    const NextIcon =()=>{

        const handleNextMonth =()=>{
            const newCount = monthCount + 1
            const setNewDate = new Date(new Date().setMonth(new Date().getMonth() + newCount))
            
            setMonthCount( newCount )
            setCurrentCalanderDate( setNewDate ) 
        }
      
        return(
            <div onClick={()=> handleNextMonth()}> › </div>
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
            />
        </div>
    )
}

export default CompleteCalendar
