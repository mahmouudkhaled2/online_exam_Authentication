"use client";

import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import Welcome from "../../../Components/Welcome";
import SignNavList from "../../../Components/SignNavList";
import InputField from "../../../Components/InputField";
import { RegisterValues } from "../../../customTypes";
import IdentityProviders from "../../../Components/IdentityProviders";
import { signUpSchema } from "../../../Schemas/AuthValidationSchemas";
import SubmitButton from "../../../Components/SubmitButton";



export default function SignUpPage() {

  const router = useRouter();
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const [hideRePassword, setHideRePassword] = useState<boolean>(true);

  const handleSubmit = (values: RegisterValues) => {
    
    return axios.post('https://exam.elevateegy.com/api/v1/auth/signup', values)
    .then(res => {
            console.log("Hello From Then");
            
            if (res.data.message === 'success')
              router.push('/login');
            return null
          })
          .catch(err => {
            console.log("Hello From Catch");
            console.log(err)});
            
  }
          
  const formik = useFormik({
    initialValues: {
      username: "",
      firstName: "",
      lastName: "",
      email: "", 
      password: "", 
      rePassword: "",
      phone: "",
    }, 
    validationSchema: signUpSchema,
    onSubmit: handleSubmit,
    
  }) 
  
  const errorStyles = `${formik.errors.firstName && formik.touched.firstName ? 'border border-red-500' : ''}`;
   
  return (
    <>
      <section>
        <div className="grid grid-cols-1 md:grid-cols-12 mx-auto overflow-hidden">

          <Welcome />

          <div className="col-span-7">
            
            <SignNavList />

            <div className="mx-auto md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800  ">
              <div className="p-6 space-y-4 md:space-y-5 sm:p-6">

                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign up
                </h1>

                <form className="space-y-4 md:space-y-5" onSubmit={formik.handleSubmit}>

                  <div className="flex flex-col sm:flex-row gap-5">
                    
                    <div className="firstname-input">
                      <InputField type={"text"} id={"firstName"}  handleChange={formik.handleChange } placeholder="First Name" customStyles={errorStyles}/>

                      {formik.errors.firstName && formik.touched.firstName && <div className="block px-3 mt-1 text-sm text-red-500 dark:bg-gray-800 dark:text-red-400" role="alert"> {formik.errors.firstName} </div>}
                    </div>

                    <div className="lastname-input">
                      <InputField type={"text"} id={"lastName"}  handleChange={formik.handleChange } placeholder="Last Name" customStyles={errorStyles}/>

                      {formik.errors.lastName && formik.touched.lastName && <div className="block px-3 mt-1 text-sm text-red-500 dark:bg-gray-800 dark:text-red-400" role="alert"> {formik.errors.lastName} </div>}
                    </div>

                  </div>

                  <div className="username-input">
                    <InputField type={"text"} id={"username"}  handleChange={formik.handleChange } placeholder="Username" customStyles={errorStyles}/>

                    {formik.errors.username && formik.touched.username && <div className="block px-3 mt-1 text-sm text-red-500 dark:bg-gray-800 dark:text-red-400" role="alert"> {formik.errors.username} </div>}
                  </div>

                  <div className="email-input">
                    <InputField type={"email"} id={"email"}  handleChange={formik.handleChange } placeholder="Email" customStyles={errorStyles}/>

                    {formik.errors.email && formik.touched.email && <div className="block px-3 mt-1 text-sm text-red-500 dark:bg-gray-800 dark:text-red-400" role="alert"> {formik.errors.email} </div>}
                  </div>

                  <div className="phone-input">
                    <InputField type={"text"} id={"phone"}  handleChange={formik.handleChange } placeholder="Phone Number" customStyles={errorStyles} />

                    {formik.errors.phone && formik.touched.phone && <div className="block px-3 mt-1 text-sm text-red-500 dark:bg-gray-800 dark:text-red-400" role="alert"> {formik.errors.phone} </div>}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-5">

                  <div className="password-input relative">
                    <InputField 
                    type={ hidePassword ? "password" : "text" } 
                    id={"password"}  
                    handleChange={formik.handleChange } 
                    placeholder="••••••••" 
                    customStyles={errorStyles}/>

                <span className="absolute top-3 right-3 text-gray-500 cursor-pointer">
                  {
                  hidePassword ? 
                  <i className="fa-regular fa-eye" onClick={() => setHidePassword(false)}></i> :
                  <i className="fa-regular fa-eye-slash" onClick={() => setHidePassword(true)}></i>
                  }
                </span>

                    {formik.errors.password && formik.touched.password && <div className="block px-3 mt-1 text-sm text-red-500 dark:bg-gray-800 dark:text-red-400" role="alert"> {formik.errors.password} </div>}
                  </div>


                  <div className="repassword-input relative">
                    <InputField 
                    type={ hideRePassword ? "password" : "text" } 
                    id={"rePassword"}  
                    handleChange={formik.handleChange } 
                    placeholder="••••••••" 
                    customStyles={errorStyles} />

                  <span className="absolute top-3 right-3 text-gray-500 cursor-pointer">
                    {
                    hideRePassword ? 
                    <i className="fa-regular fa-eye" onClick={() => setHideRePassword(false)}></i> :
                    <i className="fa-regular fa-eye-slash" onClick={() => setHideRePassword(true)}></i>
                    }
                  </span>

                    {formik.errors.rePassword && formik.touched.rePassword && <div className="block px-3 mt-1 text-sm text-red-500 dark:bg-gray-800 dark:text-red-400" role="alert"> {formik.errors.rePassword} </div>}
                  </div>
                  </div>

                  <p className="text-[15px] text-center">
                    Already have an account?
                    <span><Link href="/login" className="text-blue-800 mx-1 underline">Login</Link></span>
                  </p>

                  <SubmitButton title={"Create an Account"}/>

                </form>
                
              </div>
            </div>

          <p className="max-w-md mx-auto text-[15px] text-[#6c737f] text-center relative">
            <span className="continue-with px-1 relative">Or Continue with</span>
          </p>

            <IdentityProviders/>

          </div>
        </div>
      </section>
    </>
  );
}
