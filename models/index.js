const db = require('../db');

/*
  trail1: {
    name: 'Sunny trail',
    photos: [
      'http://www.trailstompers.com/uploads/2/6/8/6/2686411/9693769.jpg',
      'http://www.trailstompers.com/uploads/2/6/8/6/2686411/5328225.jpg?327',
      'http://www.trailstompers.com/uploads/2/6/8/6/2686411/2847590_orig.jpg',
      'http://www.trailstompers.com/uploads/2/6/8/6/2686411/326294_orig.jpg',
      'http://www.trailstompers.com/uploads/2/6/8/6/2686411/4025080_orig.jpg',
      'http://www.trailstompers.com/uploads/2/6/8/6/2686411/6829184_orig.jpg',
    ],
    description: 'this is a great place for family and friends!',
    ratings: {
      average: 4.5,
      beauty: 4,
      nature: 4.5,
      difficulty: 1.2,
    },
    comments: [
      {
        username: 'Justin',
        body: 'every half mile and got to see the ocean at the top!',
        timestamp: Date.now(),
      },
      {
        username: 'Patrick',
        body: 'This trail is amazing!!! We saw bees, trees, whales, and snails!',
        timestamp: Date.now(),
      },
    ],
  },
*/

module.exports = {
  getTrailById: (trailId) => {
    const query = `
      SELECT name, description, length, lat, lng, elevation,
        (SELECT json_agg(comment)
        FROM (
          SELECT body, username, helpfulness, reported, timestamp
          FROM comments
          WHERE comments.trail_id = t.id
          ) AS comment
        ) AS comments
      FROM trail AS t
      WHERE t.id = $1`;
    return db.query(query, [trailId])
      .then(({ rows }) => {
        console.log('[model] trail:', rows[0]);
        return rows[0];
      })
      .catch((err) => {
        console.log('[model] Error getting trail', err);
      });
  },
};
