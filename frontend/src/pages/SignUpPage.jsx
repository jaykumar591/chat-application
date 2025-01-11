import { useState } from "react"
import { useAuthStore } from "../store/useAuthStore"
import {MessageSquare,User,Mail,Eye,EyeOff,Lock,Loader2} from 'lucide-react'
import { Link } from 'react-router-dom'
import AuthImagePattern from "../components/AuthImagePattern"
import toast from "react-hot-toast"

function SignUpPage() {
  const [showPassword , setShowPassword] = useState(false)
  const [formDate, setFormData] = useState({fullName:"",password:"",email:""})

  const {signup,isSignUp} = useAuthStore()

  const validateForm = ()=>{
    if(!formDate.fullName.trim() )return toast.error("full name required")
    if(!formDate.email.trim())return toast.error("email is required")
    if(!formDate.password.trim())return toast.error("password is required")
    if(!formDate.password.length>8) return toast.error("password must be at least 8 characters")
    return true
  }
  const handelSubmit = (e)=>{
    e.preventDefault(false)
    const valid = validateForm()
    if(valid===true) signup(formDate)
     
  }
  return (
    <div className="min-h-screen grid lg:grid-cols-2 mt-10">
      {/* left side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
         <div className="w-full max-w-md space-y-8">
          {/* LOGO */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <MessageSquare className="size-6 text-primary"/>
              </div>
              <h1 className="text-2xl font-2xl font-bold mt-2" >Create Account</h1>
              <p className="text-base-content/60 ">Get started with your free account</p>
            </div>

          </div>
          {/*FORM */}
          <form onSubmit={handelSubmit} className="space-y-6" >
            <div className=" form-control">
              <label className=" label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-base-content/40"/>
                </div>
                <input type="text" required={true}
                 className={`input input-bordered w-full pl-10`}
                 placeholder="John Doe"
                 value={formDate.fullName}
                 onChange={(e)=>setFormData({...formDate,fullName:e.target.value})}
                 />
              </div>
            </div>

            <div className=" form-control">
              <label className=" label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40"/>
                </div>
                <input type="email" required={true}
                 className={`input input-bordered w-full pl-10`}
                 placeholder="johndoe@gmail.com"
                 value={formDate.email}
                 onChange={(e)=>setFormData({...formDate,email:e.target.value})}
                 />
              </div>
            </div>
            <div className=" form-control">
              <label className=" label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div  className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                 
                  <Lock  className="size-5 text-base-content/40"/>
                
                </div>
                <input type={showPassword?"text":"password"} required={true}
                 className={`input input-bordered w-full pl-10`}
                 placeholder="password"
                 value={formDate.password}
                 onChange={(e)=>setFormData({...formDate,password:e.target.value})}
                 />

                 <button type="button" className="absolute inset-y-0 pr-3 right-0 items-center"
                 onClick={()=>setShowPassword(!showPassword)}
                 >
                  {
                    showPassword?<EyeOff className="size-5 text-base-content" />:<Eye className="size-5 text-base-content/40"/>
                  }

                 </button>
              </div>
            </div>
            <button type="submit" className="btn  btn-primary w-full" disabled={isSignUp}>
              {isSignUp?(
                <>
                 <Loader2  className="size-5  animate-spin" />
                </>
              ):("Create Account")}

            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
             Already have an account?{" "}
             <Link to={'/login'} className="link link-primary"> 
             Sign in
             </Link>
            </p>
          </div>
         </div>
      </div>
      {/*Right side */}
      <AuthImagePattern 
      title="Join our community"
      subtitle="Connect with friends, share moments, and in touch with loved ones."

       />
    </div>
  )
}

export default SignUpPage