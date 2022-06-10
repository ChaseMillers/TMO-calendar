const mockResponse = {
    data:  
    {
        "06/03/2022": [
          {
            "id": 1,
            "firstName": "Mr",
            "lastName": "Tester",
            "email": "TestTest123@T-Mobile.com",
            "role": null
          },
          {
            "id": 2,
            "firstName": "Minnie",
            "lastName": "Mouse",
            "email": "minniemouse@t-mobile.com",
            "role": null
          }
        ],
        
        "06/09/2022": [
          {
            "id": 1,
            "firstName": "Johny",
            "lastName": "Bravo",
            "email": "johnybravo@t-mobile.com",
            "role": null
          },
          {
            "id": 2,
            "firstName": "Mr",
            "lastName": "Tester",
            "email": "TestTest123@T-Mobile.com",
            "role": null
          }
        ],
      
        "06/29/2022": [
          {
            "id": 1,
            "firstName": "Mr",
            "lastName": "Tester",
            "email": "TestTest123@T-Mobile.com",
            "role": null
          }
        ],
      
        "06/10/2022": [
          {
            "id": 1,
            "firstName": "Mr",
            "lastName": "Tester",
            "email": "TestTest123@T-Mobile.com",
            "role": null
          }
        ],
      
        "06/14/2022": [
          {
            "id": 1,
            "firstName": "Johny",
            "lastName": "Bravo",
            "email": "johnybravo@t-mobile.com",
            "role": null
          }
        ],
      
        "06/24/2022": [
          {
            "id": 1,
            "firstName": "Johny",
            "lastName": "Bravo",
            "email": "johnybravo@t-mobile.com",
            "role": null
          },
          {
            "id": 2,
            "firstName": "Stinky",
            "lastName": "Pete",
            "email": "stinkpete@t-mobile.com",
            "role": null
          }
        ]
      }
}

export default {
    get: jest.fn().mockResolvedValue(mockResponse)
}
