/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import Link from "next/link";
import InputField from "../../../Components/InputField";
import IdentityProviders from "../../../Components/IdentityProviders";
import Welcome from "../../../Components/Welcome";
import SignNavList from "../../../Components/SignNavList";
import SubmitButton from "../../../Components/SubmitButton";
import { useState } from "react";
import { useFormik } from "formik";
import { resetPasswordValues } from "../../../customTypes";
import { useRouter } from "next/navigation";
import { resetPasswordSchema } from "../../../Schemas/AuthValidationSchemas";
import axios from "axios";


export default function ResetPasswordPage() {

  const router = useRouter();
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);

  const handleSubmit = async (values: resetPasswordValues) => {

    const resetData = {
      email: localStorage.getItem('user') ? localStorage.getItem('user') : '',
      newPassword: values.newPassword,
    }
    
    axios.put('https://exam.elevateegy.com/api/v1/auth/resetPassword', resetData)
    .then(res => {
        router.push('/login')
    })
    .catch(err => {
        const msg = err.response.data.message
         setIsError(true);
        setErrorMsg(msg === 'reset code not verified' ? 'reset code has expired' :  msg);
    })

  }

  const formik = useFormik({

    initialValues: {
      newPassword: '',
      rePassword: '',
    }, 

    validationSchema: resetPasswordSchema,

    onSubmit: handleSubmit
  });


  return (
    <section className="">
    <div className=" grid grid-cols-1 md:grid-cols-12 mx-auto overflow-hidden">

      <Welcome />

      <div className="col-span-7 h-[700px]">
        
        <SignNavList />

        <div className="mx-auto md:mt-10 sm:max-w-md xl:p-0 dark:bg-gray-800 ">
          <div className="p-6 space-y-4 md:space-y-5 sm:p-6">

            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Set a password
            </h1>

            <form className="space-y-4 md:space-y-7" onSubmit={formik.handleSubmit} >

              {isError && <div className="p-3 text-center text-sm text-red-600 bg-red-100 rounded-md transition-all">{errorMsg}</div>  
              }

              <div className="password-input">
                <InputField 
                type={"password"} 
                id={"newPassword"} 
                handleChange={formik.handleChange} 
                handleBlur={formik.handleBlur} 
                placeholder="Create Password"
                customStyles={`${formik.errors.newPassword && formik.touched.newPassword || isError ? 'border-red-500' : ''}`} />
 
                {formik.errors.newPassword && formik.touched.newPassword && <div className="px-2 text-sm text-red-600   dark:text-red-400 mt-2" role="alert"> {formik.errors.newPassword} </div>
                }
              </div>

              <div className="Repassword-input">
                <InputField 
                type={"password"} 
                id={"rePassword"} 
                handleChange={formik.handleChange} 
                handleBlur={formik.handleBlur} 
                placeholder="Re-enter Password"
                customStyles={`${formik.errors.rePassword && formik.touched.rePassword || isError ? 'border-red-500' : ''}`} />
 
                {formik.errors.rePassword && formik.touched.rePassword && <div className="px-2 text-sm text-red-600   dark:text-red-400 mt-2" role="alert"> {formik.errors.rePassword} </div>
                }
              </div>

              <div className="text-sm text-end">
                <Link href="/forget-password" className="text-blue-800">Recover Password ?</Link>
              </div>

              <SubmitButton title={"Sign in"} />

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
  )
}
