import React from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ToastContainerFixed = ToastContainer as any

const Toaster = () => {
  return (
    <ToastContainerFixed
      position='top-right'
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover={false}
      theme='light'
    />
  )
}
export { Toaster, toast }
