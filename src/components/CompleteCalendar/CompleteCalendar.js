import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../userContext';
import Calendar from 'react-calendar';
import SidePanelGui from '../SidePannelGui/SidePanelGui';
import TeamMembersListGui from '../TeamGui/TeamMembersListGui';
import moment from 'moment';
import './DefaultCalendar.css'
import './AddedCalendar.css'
import axios from 'axios';

const CompleteCalendar = ({startDate, MOCK}) =>{

    const [date, setDate] = useState(new Date());
    const [selectedDates] = useState(new Set())
    const [savedUserDates, setSavedUserDates] = useState()
    const [savedTeamData, setSavedTeamData] = useState()
    const [monthCount, setMonthCount] = useState(0)
    const [currentCalanderDate, setCurrentCalanderDate] = useState()
    const [userInfo] = useContext(UserContext) // state context is held in 'OktaIntefration/Profile'
    const [trigger, setTrigger] = useState(false)
    const URL = process.env.REACT_APP_API_ENDPOINT 
    const userEmail = userInfo['preferred_username'];
    const TOKEN = userInfo && userInfo.token

    useEffect(() => {
        const getURL = URL+moment(currentCalanderDate).format("YYYY/MM/")
        const getNamesData = () =>  {
            if((typeof TOKEN === 'string')){
                axios.defaults.headers.common = {'Authorization': `bearer ${TOKEN}`}
                axios.get(getURL).then(response => {
                    setSavedUserDates(response.data)
                    setSavedTeamData(response.data) 
                })
                .catch(error => {
                    console.log(error);
                })
            }
            else if (MOCK){
                axios.get('').then(response => {
                    setSavedUserDates(response.data)
                    setSavedTeamData(response.data) 
                })
            }
           
        };
        getNamesData()
        
    }, [URL, currentCalanderDate, userInfo, trigger, MOCK, TOKEN]);

    const handleClass = ({ date, view }) => {
        const fixedFormatCurrentDay = moment(date).format("MM/DD/YYYY")
    
        return(
            fixedFormatCurrentDay &&
            savedUserDates && 
            savedUserDates[fixedFormatCurrentDay] 
            ? savedUserDates[fixedFormatCurrentDay].map(user => ( // If there are saved user dates, loop through them.
                user.email === userEmail && 
                selectedDates.has(fixedFormatCurrentDay) 
                && savedUserDates[fixedFormatCurrentDay]
                ? 'react-calendar__tile-special selectedInOffice'
                : user.email === userEmail 
                ? 'selectedInOffice'
                : selectedDates && selectedDates.has(fixedFormatCurrentDay)
                ?  'react-calendar__tile-special'
                : null
                ))
            : selectedDates && selectedDates.has(fixedFormatCurrentDay) // After the loop, handle selected dates from current session.
            ? 'react-calendar__tile-special'
            : null
       
        );
    };

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
        <div className='app'>
            <div className='absolute-container'>
                <h1 className='text-center'>In Office Planner</h1>
                <div className='joined-calendar'>
                    <Calendar 
                        defaultActiveStartDate={startDate}
                        onChange={handleSelect} 
                        value={date} 
                        tileClassName = {handleClass}
                        tileContent = {({ date }) => savedTeamData && <TeamMembersListGui date={date} savedTeamData={savedTeamData} />}
                        tileDisabled={({ date }) => date.getDay() === 0 || date.getDay() === 6 }
                        view={"month"}

                        nextLabel={<NextIcon />}
                        prevLabel={<PreviousIcon  />}
                        // showNeighboringMonth={false}
                    />
                    <SidePanelGui 
                        selectedDates={selectedDates} 
                        savedUserDates={savedUserDates} 
                        setSavedUserDates={setSavedUserDates} 
                        savedTeamData={savedTeamData} 
                        setSavedTeamData={setSavedTeamData} 
                        date={date}
                        userEmail={userEmail}
                        TOKEN={TOKEN}
                        URL={URL}
                        setTrigger={setTrigger}
                        trigger={trigger}
                    />
                </div>
            </div>
        </div>
    )
}

export default CompleteCalendar
