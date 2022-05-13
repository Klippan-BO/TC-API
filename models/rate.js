const db = require('../db');

module.exports = {
  getRatings: () => {
    const query = `
      select * from ratings;`;
    return db.query(query)
      .then(({ rows }) => rows)
      .catch((err) => {
        console.log('\n[model] error getting ratings\n');
        throw err;
      });
  },

  addRatings: (body) => {
    const {
      user_id,
      trail_id,
      stars,
      beauty,
      sunlight,
      difficulty
    } = body;
    const query = `
      INSERT INTO ratings (user_id, trail_id, difficulty, nature, beauty, stars)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`;
    return db.query(query, [user_id, trail_id, difficulty, sunlight, beauty, stars])
      .then(({ rows }) => rows[0])
      .catch((err) => {
        console.log('\n[model] error getting trail\n');
        throw err;
  })

}
}
