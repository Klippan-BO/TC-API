# TC-API
Trail Companion API is a RESTful API for serving up trail and user data to the Trail Companion App.

# Usage:
## Connecting to the database:
1. Configure environment variables:
`$ nano example.env`
2. Set the `DB_HOST` and `DB_PW`
  - Optionally, create a PostgreSQL database locally and follow [the ETL process](#creating-a-local-database-with-sample-data)
3. After entering variables, save the example as `.env`

## Starting the API server:
1. From the root directory of this repo run:
```
$ npm install
```
2. From the root directory of this repo run:
```
$ npm start
```


# Routes:

## Trails
---
### Get a trail
`GET /trails/:trailId`
- Example usage:
```
$ curl 127.0.0.1:3005/trails/2
```
- Response:
```
{
  name: 'Crystal Springs and Dean Trail',
  description: 'Pulvinar etiam non quam lacus suspendisse. Nulla posuere sollicitudin aliquam ultrices sagittis. At risus viverra adipiscing at in tellus. Non nisi est sit amet facilisis magna etiam tempor orci.',
  length: '5',
  lat: '37.44169',
  lng: '-122.29066',
  elevation: '935',
  google_url: 'https://goo.gl/maps/QptjVk4XzvysMJzf9',
  ratings: {
    average: 3.18,
    beauty: 2.36,
    nature: 2.92,
    difficulty: 3.8
  },
  photos: [
    {
      username: 'gbigg2g',
      score: 2,
      timestamp: '2022-04-24',
      url: "'https://unsplash.com/photos/d-Cr8MEW5Uc'"
    },
    {
      username: 'scregeen1d',
      score: 4,
      timestamp: '2021-12-19',
      url: "'https://unsplash.com/photos/tS9hJOnmKK8'"
    }, . . .
  ],
  comments: [
    {
      body: 'Inverse contextually-based solution',
      username: 'iwerendell24',
      helpfulness: 0,
      reported: null,
      timestamp: '2022-03-26'
    },
    {
      body: 'Grass-roots radical matrix',
      username: 'kdelhay26',
      helpfulness: 0,
      reported: null,
      timestamp: '2021-12-26'
    }, . . .
  ]
}
```
### `GET /trails/map?coords`
- Full query parameters:
```
/trails/map
```

**query parameters**
|  param  | type  | description |
| -------- | ----- | ------ |
| `swlat`  | decimal | southwestern most latitude |
| `swlng`  | decimal | southwestern most longitude |
| `nelat`  | decimal | northeastern most latitude |
| `nelng`  | decimal | northeastern most longitude |

**Example:**
```
$ curl -G 127.0.0.1:3005/trails/map -d 'swlat=36.679200' -d 'swlng=-122.754904' -d 'nelat=37.379686' -d 'nelng=-121.975038'
```

**Response:**
```
[
  {
    id: 4,
    name: 'PG&E Loop Trail',
    city: 'Cupertino',
    short_description: 'Melted cheese boursin mascarpone. ',
    length: '8.3',
    elevation: '1624'
  },
  {
    id: 5,
    name: "Steven's Canyon Trail",
    city: 'Cupertino',
    short_description: 'Gummies wafer marshmallow liquorice chupa chups.',
    length: '5.9',
    elevation: '1079'
  }
]
```

## Users
---
### `POST /users/signup`
- Generates a `user_id` for the user by adding them to the database.

**body parameters:**

|  param  | type  |description |
| --------| ----- | ----------- |
| `email`  | string | email address used to sign up |
| `bio`  | string |  user biography |
| `profile_image` | string  | string representing URL pointing to profile photo |
| `username`  | string  | username for user |

- Example usage:
```
curl -X POST 127.0.0.1:3005/users/signup -d '{ "email": "ecurrie8@state.gov", "bio": "I love hiking" }'
```
- Response:
```
{
  id: 9,
  email: 'ecurrie8@state.gov',
  session_id: 'c4a14664-03e5-4cf4-a979-46fb13a4ee33'
}
```
  - Session ID get bound to user as a cookie (but so does the user_id for purposes of development)

### `POST users/login`

**body parameters:**

|  param  | type  | description |
| ------- | ----- | ------------ |
| `email`  | string | email address used to sign up |

**Example:**
```
curl -X POST 127.0.0.1:3005/users/login -d '{ "email": "ecurrie8@state.gov" }'
```
**Response:**
```
{
  id: 9,
  email: 'ecurrie8@state.gov',
  session_id: 'c4a14664-03e5-4cf4-a979-46fb13a4ee33'
}
```

### `GET /users/me`
- ~~Gets user profile based on cookie~~
- Get the full details of a user profile

**query parameters**
|  param  | type  | description |
| --------| ----- | ------ |
| `userId`  | integer | user ID to retreive data for |

**Example:**
```
$ curl 127.0.0.1:3005/users/me?userId=10
```
**Response:**
```
{
  id: 10,
  username: 'slascell9',
  profile_image: 'http://dummyimage.com/165x106.png/ff4444/ffffff',
  bio: 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue.',
  trails: [
    {
      id: 2,
      name: 'Crystal Springs and Dean Trail',
      short_description: 'Small batch offal selfies chartreuse meditation fanny pack bespoke 3 wolf moon.',
      photos: [Array],
      rating: [Object]
    }
  ],
  friends: [
    {
      id: 54,
      username: 'bperschke1h',
      profile_image: 'http://dummyimage.com/210x180.png/dddddd/000000',
      status: 'approved'
    },
    {
      id: 82,
      username: 'dspry29',
      profile_image: 'http://dummyimage.com/185x236.png/5fa2dd/ffffff',
      status: 'approved'
    }
  ]
}
```

## Friends

### `POST /friends/request`
Send or accept a friend request from one user to another user

**query parameters:**
|  param  | description |
| --------| ----------- |
| `from`  | user ID of the user sending the friend request |
| `to`    | user ID of the user to receive the friend request |

### `POST /friends/add` (legacy):
Sends a friend request from one user to another user

**body parameters:**
| param | type  | description |
| ----- | ----- | ----------- |
| `userId` | integer | user ID of the user sending the request |
| `friendId` | integer | user ID of the user receiving the request |

**Example:**
```
$ curl -X POST 127.0.0.1:3005/friends/add -H 'Content-Type:application/json' -d '{"userId":122, "friendId":50}'
```

**Response:**
```
{
  "id": 101,
  "status": "sent",
  "timestamp": "2022-05-12T05:27:58.730Z"
}
```
### Friend reject
```
curl -X PUT 127.0.0.1:3005/friends/reject -H 'Content-Type:application/json' -d '{"userId":5, "friendId":12}'

--> {}
```
## Activities
---
```
curl -X POST 127.0.0.1:3005/activity/add -H 'Content-Type:application/json' -d '{"trailId":3, "userId":10}'

--> { id: 104, timestamp: 2022-05-12T02:41:48.912Z }
```
## Comments
---
```
curl -X POST 127.0.0.1:3005/comments/add -H 'Content-Type:application/json' -d '{"userId": 5, "trailId": 3, "body":"Im the best hiker"}'

-->
{
  id: 103,
  username: 'tlaunder4',
  body: 'Im the best hiker',
  timestamp: 2022-05-12T06:09:29.069Z
}
```

```
curl -X DELETE 127.0.0.1:3005/users/50
```


## Comments:
---

## Photos:
---

## Activities:
---

## Friends:
---


# Creating a local database with sample data
Under construction
*Utilize etl.sql to import the seed data into the database. This scripts includes addition of usernames to tables other than users.*
