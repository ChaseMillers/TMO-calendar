import { useOktaAuth } from '@okta/okta-react';
import React, { useEffect, useContext  } from 'react';
import { UserContext } from '../../userContext';

export default function Profile() {

    const { authState, oktaAuth } = useOktaAuth();
    const [userInfo, setUserInfo] =  useContext(UserContext);

    useEffect(() => {
        if(!authState || !authState.isAuthenticated) {
            setUserInfo(null);
        }
        else {
            oktaAuth.getUser().then((info) => {
                setUserInfo(
                    {
                        ...info,
                        token: authState.accessToken.accessToken
                    }
                );
            });
        }
    }, [authState, oktaAuth, setUserInfo]);

    // setFinalToken(authState)

    if(!userInfo) {
        return (
            <div>
                <p>Fetching user profile...</p>
            </div>
        )
    }
    console.log(authState.accessToken.accessToken);
    return (
        <div className='user-info'>
            <p>Logged in as {userInfo && userInfo['name']} 
            <br/>
            Email: {userInfo && userInfo['preferred_username']}</p>
        </div>
    );
}