"use client"

import { updateProduct } from "@/actions/update-product-action"
import { redirect, useParams } from "next/navigation"
import { useActionState, useEffect } from "react"
import { toast } from "react-toastify"


export default function EditProductForm({children} : {children : React.ReactNode}) {

    const {id} = useParams<{id : string}>()

    const updatePropductwithId = updateProduct.bind(null, +id)

    const [state, dispatch] = useActionState(updatePropductwithId, {
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
        className="space-y-5"
        action={dispatch}
    >
        {children}

        <input 
            type="submit"
            className="bg-green-400 hover:bg-green-500 rounded text-center w-full cursor-pointer py-2 font-bold uppercase"
            value={'Guardar Cambios'}
        />

    </form>
  )
}
