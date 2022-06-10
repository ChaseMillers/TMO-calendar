import React, {useContext} from 'react';
import { UserContext } from '../../userContext';
import moment from 'moment';
import './TeamMembersListGui.css'

const TeamMembersListGui = ({ date, savedTeamData }) => {
  const [userInfo] = useContext(UserContext) // state context is held in 'OktaIntefration/Profile'
  const userEmail = userInfo['preferred_username'];
  const fixedFormatCurrentDay = moment(date).format("MM/DD/YYYY")

  const TeemLoop =()=> (
    fixedFormatCurrentDay && 
    savedTeamData[fixedFormatCurrentDay] &&
    savedTeamData[fixedFormatCurrentDay].map((user, i) => (
      user.email !== userEmail 
      ? <div key={i}> {`${user.firstName} ${user.lastName}`}</div>
      : <div key={i} className='you'> You </div>
      ))
  )
  

  return(
      <React.Fragment>
        <div className='hover-content'>
          <div className='in-office-container'>

            <h3>{date.toDateString()}</h3>
            <h4>In office list:</h4>
            <div className='in-office-list'>
            <TeemLoop />
            </div>
          </div>
        </div>
        <div className='team-selected'>
          {
          fixedFormatCurrentDay && 
          savedTeamData[fixedFormatCurrentDay] &&
          savedTeamData[fixedFormatCurrentDay].map((user, i) => (
            user.email !== userEmail 
            ? <div data-testid="team-mate" className='team-selected' key={i}>{savedTeamData[fixedFormatCurrentDay].length}</div>
            : user.email !== userEmail && savedTeamData[fixedFormatCurrentDay].length -1 === 0
            ? null
            : savedTeamData[fixedFormatCurrentDay].length -1
            ? <div className='team-selected' key={i}>{savedTeamData[fixedFormatCurrentDay].length -1}</div>
            : null
            ))
          }
        </div>
      </React.Fragment> 
     
    ) 
    };


              
export default TeamMembersListGui