class PersonFeed {
  constructor({ date, time, profile_id, content }) {
    this.data = date
    this.time = time
    this.profile_id = profile_id
    this.content = content
  }
}

module.exports = PersonFeed