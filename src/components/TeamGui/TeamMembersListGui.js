import React from 'react';
import moment from 'moment';
import './TeamMembersListGui.css'

const TeamMembersListGui = ({ date, savedTeamData }) => (

    savedTeamData
    && savedTeamData.map((data, i) => (
      data.day.includes(moment(date).format("YYYY/MM/DD"))
      ? 
      <React.Fragment key={i}>
        <div className='hover-content'>
          <div className='in-office-container'>

            <h3>{date.toDateString()}</h3>
            <h4>In office list:</h4>
            <div className='in-office-list'>
              {data.members.map((member, i) => ( 
                <div key={i}> {member}</div> ))}
            </div>

          </div>
        </div>
        <div className='team-selected' key={i}>
          {data.members.length}
        </div>
      </React.Fragment> 
      : null
    )) 
  );
              
export default TeamMembersListGui