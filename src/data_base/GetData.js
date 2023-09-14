import axios from 'axios'

class GetData {
  constructor(DBName, query) {
    this.query = query
    this.DBName = DBName

    this.params = new URLSearchParams()
    this.params.append('DBName', DBName)
    this.params.append('query', query)

    //axiosのインスタンスを作製し、2.5sでtimeout設定
    this.axiosObj = axios.create()
    this.axiosObj.defaults.timeout = 2500
  }

  //axiosが実行されない場合
  //xamppのdatabaseが起動しているか、起動しない場合portが使用されているのかを確認
  //またはxamppが破損している可能性あり
  //データ破損の場合は ➝ 参考url https://notes-de-design.com/website/tips/mysql-shutdown-unexpectedly-xampp/
  fetchData() {
    this.axiosObj
      .post('http://localhost/php/ep_blog/src/data_base/ToDB.php', this.params)
      .then((response) => {
        console.log(response)
        this.data = response
        return this.data
      })
      .catch(() => {
        console.log('sippai')
        return null
      })
  }
}

export default GetData