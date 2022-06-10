const mockResponse = {
    data:  
        {
            "user" :{
                "id": "cmiller200", 
                "name": "Chase Miller",
                "daysInOffice": ["06/29/2022", "06/01/2022", "06/09/2022"]
            },
            "teamMembers" :[
                {"day": "06/20/2022", "members": [ "cmiller200@t-mobile.com" ]},
                {"day": "07/20/2022", "members": [ "cmiller200@t-mobile.com" ]},
                {"day": "08/20/2022", "members": [ "cmiller200@t-mobile.com" ]},
                {"day": "09/20/2022", "members": [ "cmiller200@t-mobile.com" ]},
                {"day": "10/20/2022", "members": [ "cmiller200@t-mobile.com" ]},
                {"day": "11/20/2022", "members": [ "cmiller200@t-mobile.com" ]},
                {"day": "12/20/2022", "members": [ "cmiller200@t-mobile.com" ]},
                {"day": "06/03/2022", "members": [ "Boby Glee", "Chase Miller" ]},
                {"day": "06/14/2022", "members": [ "Boby Glee", "Chase MIller", "James Franko" ]},
                {"day": "06/16/2022", "members": [ "Boby Jankens", "Chase Miller", "James Franko", "Pete Skims", "Skipy Meeps", "Tim Radke", "Paul Bucker" ]}
            ]
        }
}

export default {
    get: jest.fn().mockResolvedValue(mockResponse)
}
