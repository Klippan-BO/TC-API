# TC-API
Trail Companion API

# Usage:
1. From the root directory of this repo run:
`npm install`
2. From the root directory of the repo run:
`npm start`

# Routes:

### /trails/:trailId
- Example usage:
```
curl 127.0.0.1:3005/trails/2
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

### /trails/:trailId/comments
- Ideal shape:

### /trails/:trailId/ratings
- Ideal shape:
