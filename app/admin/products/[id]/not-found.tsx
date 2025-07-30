import Heading from '@/components/ui/Heading'
import Link from 'next/link'
import React from 'react'

export default function NotFound() {
  return (
    <div className='text-center'>
        <Heading>Producto No Encontrado</Heading>
        <p>Tal vex quieras volver a {''} <Link href={'/admin/products?page=1'} className='text-green-400'>Productos</Link> </p>
    </div>
  )
}
