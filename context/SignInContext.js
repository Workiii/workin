import {createContext, useState} from 'react'

const SignInContext = createContext({})

export function SignInProvider({children}){
   
   const[signInContext, setSignInContext] = useState({
      nome:'amongus',
      email:'',
      phone:'',
      password:'',
      endereco:{},
      count: 1,
      loading: false,
      isWorker: false,
      image:''
   })
   
   return(
      <SignInContext.Provider value={{
         ...signInContext, 
         setSignInContext: (data) => setSignInContext({...signInContext, ...data}),
      }}>
         {children}
      </SignInContext.Provider>
   )
}

export default SignInContext

const obj = {
   sender:'',
   receiver:'',
   descricao:'',
   
}