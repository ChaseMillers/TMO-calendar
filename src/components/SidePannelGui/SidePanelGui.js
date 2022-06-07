import React from 'react';
import axios from 'axios';
import KeyGui from '../KeyGui/KeyGui'
import './SidePanelGui.css'

const SidePanelGui = ({URL, selectedDates, savedUserDates, setSavedUserDates, savedTeamData, setSavedTeamData, triggerFetch, fetchData }) => {

  const alertMsg = () => {
    if(!selectedDates.size) alert("Please select a day")
  }

  const handleAdd = async () =>{
      const datesData = []
      alertMsg()
          
      try{
        axios.post(URL, datesData).then(response => triggerFetch(!fetchData))
        .catch(error => {
          console.log(error);
        });
      } catch (error){
        console.log(error)
      }
  
    }

    const handleRemove = async () =>{
      const datesData = []
      alertMsg()

      selectedDates.forEach(date => {
        if (savedUserDates.has(date)) datesData.push(date) 
        console.log(datesData)
      })
    
          axios.delete(URL, datesData).then(response => triggerFetch(!fetchData))
          .catch(error => {
            console.log(error);
          });
      }

    return(
        <div className='buttons-gui'>
            <h2 className='office-days-text'>Office Days</h2>
            <button className='add-btn' onClick={()=> handleAdd()}>Add</button>
            <button className='remove-btn' onClick={()=> handleRemove()}>Remove</button>

            <KeyGui />
        </div>
    )
}

export default SidePanelGui
