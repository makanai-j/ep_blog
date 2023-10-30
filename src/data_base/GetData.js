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
  async fetchData() {
    //axiosは非同期処理なのでthenやcatch内でreturnしても意味ないらしい
    //なのでこのように、実行自体を非同期にしてaxiosの返り値を返すようにする
    //さらに、受け取る側も非同期にする
    return await this.axiosObj.post('/ToDB.php', this.params)
  }

  get getFetchData() {
    return this.data
  }
}

export default GetData
