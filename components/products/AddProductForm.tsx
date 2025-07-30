"use client"

import { addProduct } from "@/actions/add-product-action"
import { redirect } from "next/navigation"
import { useActionState, useEffect } from "react"
import { toast } from "react-toastify"


export default function AddProductForm({children} : {children : React.ReactNode}) {

    const [state, dispatch] = useActionState(addProduct, {
        errors : [],
        success : ''
    })

    useEffect(() => {
        if(state.errors) {
            state.errors.forEach(error => toast.error(error))
        }
        if(state.success) {
            toast.success(state.success)
            redirect('/admin/products?page=1')
        }
    }, [state])

  return (
    <form 
        action={dispatch}
        className="space-y-5"
    >
        {children}

        <input 
            type="submit"
            className="bg-green-400 hover:bg-green-500 rounded text-center w-full cursor-pointer py-2 font-bold uppercase"
            value={'Agregar Producto'}
        />

    </form>
  )
}
