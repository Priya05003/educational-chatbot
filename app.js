const auth = firebase.auth()
const db = firebase.firestore()
const database = firebase.database()
const loginbtn=document.querySelector('#login-btn')
const content=document.querySelector('.content')
const dashboard = document.querySelector('.dashboard')
const signbtn=document.querySelector('#sign-btn')
const userdetails = id => {
    content.style.display = 'none'
    window.localStorage.setItem('currently_loggedIn',id)
    const docRef =db.collection('admin').doc(id)
    docRef.get().then(doc => {
        dashboard.style.display = 'block'
    })
}
const userDetails = id => {
    window.localStorage.setItem('currently_loggedIn',id)
    const docRef = db.collection('users').doc(id)
    docRef.get().then(doc => {
        const user = `${doc.data().username}`
        const email = `${doc.data().email}`
        window.localStorage.setItem('username',user)
          window.location.href = 'sign.html'
    }).catch(err => {
        console.log(`Error getting document : ${err}`)
    })
  }
loginbtn.addEventListener('click' , event => {
    event.preventDefault()
    const email = document.querySelector('#input_data').value
    const password = document.querySelector('#input_password').value
    
    
    auth.signInWithEmailAndPassword(email,password).then(cred => {
            userdetails(cred.user.uid)
            swal({
                title : 'Successfully login',
                icon : 'success'
            })
            content.style.display = 'none'
    dashboard.style.display = 'block'
            
    }).catch(err => {
        swal({
            title : err ,
            icon :'error'
        }).then(() => {
            
            content.style.display = 'block'
            
        })
    })
})
signbtn.addEventListener('click' , event => {
    event.preventDefault()
    signbtn.style.display = 'none'
    const userName = document.querySelector('#user_data').value 
    const email = document.querySelector('#user_mail').value 
    const password = document.querySelector('#user_password').value 
    auth.createUserWithEmailAndPassword(email,password).then(cred => {
      swal({
          title : 'Account Created Successfully',
          icon : 'success'
      }).then(() => {
          db.collection('users').doc(cred.user.uid).set({
              userName : userName,
              email : email
          }).then(() => {
          signbtn.style.display = 'block'
          document.querySelector('#signin').reset()
      }).catch(err => {
          swal({
              title : err,
              icon : 'error'
          }).then(() => {
              signbtn.style.display = 'block'
          })
      })
  })
  }).catch(err => {
    swal({
      title: err,
      icon: 'error'
    }).then(() => {
      signbtn.style.display = 'block'
  })
  })
  })
