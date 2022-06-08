import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import SidePanelGui from '../SidePannelGui/SidePanelGui';
import TeamMembersListGui from '../TeamGui/TeamMembersListGui';
import moment from 'moment';
import './DefaultCalendar.css'
import './AddedCalendar.css'
import dummyData from '../../dummyData.json'
import Profile from '../OktaIntegration/Profile';

const CompleteCalendar = ({startDate}) =>{

    // const {data, setData } = useState({})
    const [date, setDate] = useState(new Date());
    const [selectedDates] = useState(new Set())
    const [savedUserDates, setSavedUserDates] = useState()
    const [savedTeamData, setSavedTeamData] = useState()
    const [monthCount, setMonthCount] = useState(0)
    const [currentCalanderDate, setCurrentCalanderDate] = useState()

    const URL = process.env.REACT_APP_API_ENDPOINT
    // const userEmail = 'johnybravo@t-mobile.com'

    useEffect(() => {
        // console.log(new Date('2022-01-03T05:00:00.000+00:00'))
        
        // const getURL = URL+moment(currentCalanderDate).format("YYYY/MM/")
        const getNamesData = () => {
            /*
            axios.get(URL).then(response => {
            // setData(response.data);
            // convert stored days array into hash set 0(1), use set.has to avoid looping.
            setSavedUserDates(new Set(response.data.user.daysInOffice))
            setSavedTeamData(response.data.teamMembers) 
            })
            .catch(error => {
            console.log(error);
            })
            */
        
            setSavedUserDates(new Set(dummyData.user.daysInOffice) )
            setSavedTeamData(dummyData.teamMembers) 
        };
        getNamesData()
        
    }, [URL, currentCalanderDate]);

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
        <div className='app'>
            <div className='absolute-container'>
                <h1 className='text-center'>In Office Planner</h1>
                <Profile />
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
            </div>
        </div>
    )
}

export default CompleteCalendar
