import { useOktaAuth } from '@okta/okta-react';
import React, { useEffect, useState } from 'react';


export default function Profile() {

    const { authState, oktaAuth } = useOktaAuth();
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        if(!authState || !authState.isAuthenticated) {
            setUserInfo(null);
        }
        else {
            oktaAuth.getUser().then((info) => {
                setUserInfo(info);
            });
        }
    }, [authState, oktaAuth]);

    if(!userInfo) {
        return (
            <div>
                <p>Fetching user profile...</p>
            </div>
        )
    }
    console.log(authState.accessToken.accessToken);
    return (
        <div>
            <p>Logged in as {userInfo['name']} with email {userInfo['preferred_username']}</p>
        </div>
    );
}