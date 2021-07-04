import React, { Component } from 'react'
import axios from 'axios'
export class App extends Component {
  constructor(){
    super()
    this.state = {
      signupfirstname:'',
      signuplastname:'',
      signupemail:'',
      signuppassword:'',
      signinemail:'',
      signinpassword:'',
      signupmsg:'',
      signinmsg:''
    }
    this.changesignupfirstname = this.changesignupfirstname.bind(this);
    this.changesignuplastname = this.changesignuplastname.bind(this);
    this.changesignupemail= this.changesignupemail.bind(this);
    this.changesignuppassword = this.changesignuppassword.bind(this);
    this.changesigninemail = this.changesigninemail.bind(this);
    this.changesigninpassword = this.changesigninpassword.bind(this);
    
  }
  changesignupfirstname = (event) => {
    this.setState({
      signupfirstname:event.target.value
    })
  }
  changesignuplastname = (event) => {
    this.setState({
      signuplastname:event.target.value
    })
  }
  changesignupemail = (event) => {
    this.setState({
      signupemail:event.target.value
    })
  }
  changesignuppassword = (event) => {
    this.setState({
      signuppassword:event.target.value
    })
  }
  changesigninemail = (event) => {
    this.setState({
      signinemail:event.target.value
    })
  }
  changesigninpassword = (event) => {
    this.setState({
      signinpassword:event.target.value
    })
  }
  onSignUpSubmit = (event) => {
    event.preventDefault()
    const registered = {
      firstName:this.state.signupfirstname,
      lastName:this.state.signuplastname,
      email:this.state.signupemail,
      password:this.state.signuppassword
    }
    axios.post('http://localhost:8000/users/signup',registered)
      .then(res => {
        
        this.setState({
          signupmsg:res.data.message
        })
      })
      
    
    this.setState({
      signupfirstname:'',
      signuplastname:'',
      signupemail:'',
      signuppassword:''
    })  
  }
  onSignInSubmit = (event) => {
    event.preventDefault()
    const REGISTER = {
      email:this.state.signinemail,
      password:this.state.signinpassword
    }
    axios.post('http://localhost:8000/users/signin',REGISTER)
      .then((res)=>{
        this.setState({
          signinmsg:res.data.message
        })
      })
    
    this.setState({
      
      signinemail:'',
      signinpassword:''
    })  
  }
  render() {
    return (
      <div>
        <div className='container'>
          <div className='form-div'>
            <form onSubmit={this.onSignUpSubmit}>
              <input type='text' 
                placeholder='First Name' 
                onChange={this.changesignupfirstname} 
                value={this.state.signupfirstname} 
                className='form-control form-group' />

              <input type='text' 
              placeholder='Last Name'
              onChange={this.changesignuplastname}
              value={this.state.signuplastname}
              className='form-control form-group' /> 

              <input type='text' 
              placeholder='Email'
              onChange={this.changesignupemail}
              value={this.state.signupemail}
              className='form-control form-group' /> 

              <input type='text' 
              placeholder='Password'
              onChange={this.changesignuppassword}
              value={this.state.signuppassword}
              className='form-control form-group' />

              <input type='submit'
              
              className='btn btn-danger btn-block'
              value='Sign up'
              />
              <p>{this.state.msg}</p>
            </form>
          </div>
        </div>
        <div className='container'>
          <div className='form-div'>
            <form onSubmit={this.onSignInSubmit}>
              

              <input type='text' 
              placeholder='Email'
              onChange={this.changesigninemail}
              value={this.state.signinemail}
              className='form-control form-group' /> 

              <input type='text' 
              placeholder='Password'
              onChange={this.changesigninpassword}
              value={this.state.signinpassword}
              className='form-control form-group' />

              <input type='submit'
              
              className='btn btn-danger btn-block'
              value='Sign In'
              />
              <p>{this.state.signinmsg}
              </p>

            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default App

