import React from 'react';
import axios from 'axios';
import KeyGui from '../KeyGui/KeyGui'
import './SidePanelGui.css'

const SidePanelGui = ({
  URL, 
  selectedDates, 
  savedUserDates, 
  setTrigger, 
  trigger,
  userEmail,
  TOKEN
  }) => {

  const alertMsg = () => {
    if(!selectedDates.size) alert("Please select a day")
  }

  const handleAdd = async () =>{
      const datesData = []
      alertMsg()

      selectedDates.forEach(sellectedDate => {
        if (savedUserDates[sellectedDate] ){
          if(savedUserDates[sellectedDate] && savedUserDates[sellectedDate].every(savedUser => savedUser.email !== userEmail)){
            datesData.push(sellectedDate)
          }
        }
        else{ datesData.push(sellectedDate) }
      })
          
      axios.defaults.headers.common = {'Authorization': `bearer ${TOKEN}`}
      axios.post(URL, datesData).then(response => setTrigger(!trigger))
      .catch(error => {
        console.log(error);
      });
    }

    const handleSortDelete =(sellectedDate)=>{
      for(let i = 0; i < savedUserDates[sellectedDate].length; i++){
        if(savedUserDates[sellectedDate][i].email === userEmail){
          return true
        }
      }
    }

    const handleRemove = async () =>{
      const datesData = []
      alertMsg()

      // Filter out dates that the user hasn't saved.
      selectedDates.forEach(sellectedDate => { 
      if(savedUserDates[sellectedDate] && 
        handleSortDelete(sellectedDate))datesData.push(sellectedDate)
      })
    
        axios.defaults.headers.common = {'Authorization': `bearer ${TOKEN}`}
        axios.delete(URL, { data: datesData } ).then(response => setTrigger(!trigger))
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
