class Comment {
  constructor({content, publication_date, publication_time, post_id, user_id}) {
    this.content = content
    this.publication_date = publication_date
    this.publication_time = publication_time
    this.post_id = post_id
    this.user_id = user_id
  }
}

module.exports = Comment
