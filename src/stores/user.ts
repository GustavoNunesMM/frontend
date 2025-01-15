import { defineStore } from 'pinia'

import axios from 'axios'
import bcrypt from 'bcryptjs'

export const useUserStore = defineStore('counter',{
  state: () => ({
    userData: {
      user: '',
      pass: '',
      email: '',
    }
  }),
  actions: {
    async registerUser(userData:userDataInterface) {
      const {user, email, pass, confirmPass } = userData

      if (!user  || !email || !pass || !confirmPass) return
      if (pass !== confirmPass) return

      const {['confirmPass']: _, ...rest} = userData
      rest.pass = await this.webHashing(rest.pass)

      const userDataJson = JSON.stringify(rest)

      axios.post('http://localhost:4040/users', userDataJson)
      .then((res) => {
        console.log('Dados registrados',res.data)
      })
      .catch(error => console.log(error))

      return userDataJson
      
      
    },
    delUser(id?:string, name?:string) {
      try {
        const res = axios.delete(`http://localhost:4040/users/${id}`)
        res.then(e => {
          console.log(e)
        })
      }catch (e){
        console.error(e)
      }
      
    },
    async loginUser(user:String, pass:String) {
      try {
        const { data } = await axios.get(`http://localhost:3000/user`)
        const userValidated = await this.validation(data, user, pass)
        return userValidated
      } catch (error) {
        console.log(error)
      }
      
    },
    validation(data:userDataInterface[], user:String, pass:String) {
      const validPerson = data.map( (i) => {
        const userValidation = i.user === user
        const passValidation = this.webTokenValidation(pass, i)
        return userValidation&&passValidation?i:null
      }).filter(element => element !== null)
      return validPerson.length==1?validPerson[0]:(console.log("Existe mais de um usuario identico"), undefined)
    },


    async webHashing(pass:String) {
      const saltRounds = 10
      const hashedPass:String = await bcrypt.hash(pass,saltRounds)
      return hashedPass
    },
    async webTokenValidation(pass:String, userValidation:userDataInterface){
      const passMatch:boolean = await bcrypt.compare(pass, userValidation.pass)
      return passMatch
    }
  }
})

export interface userDataInterface {
  user:String,
  email:String,
  pass:String,
  confirmPass:String
}
