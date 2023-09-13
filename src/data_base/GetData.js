import axios from 'axios'

class GetData {
  constructor(DBName, query) {
    this.query = query
    this.DBName = DBName

    this.params = new URLSearchParams()
    this.params.append('DBName', DBName)
    this.params.append('query', query)
  }

  fetchData() {
    axios
      .post('http://localhost/php/ep_blog/src/data_base/ToDB.php', this.params)
      .then((response) => {
        console.log(response)
        this.data = response
        return this.data
      })
      .catch(() => {
        return null
      })
  }
}

export default GetData
