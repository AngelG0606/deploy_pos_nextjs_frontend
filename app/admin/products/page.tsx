import ProductsTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import Pagination from "@/components/ui/Pagination";
import { ProductsResponseSchema } from "@/src/schemas";
import { isValidPage } from "@/src/utils";
import Link from "next/link";
import { redirect } from "next/navigation";

async function getProducts(take : number, skip : number) {
  const url = `${process.env.API_URL}/products?take=${take}&skip=${skip}`

  const req = await fetch(url)
  const json  = await req.json()
  const data = ProductsResponseSchema.parse(json)
  return {
    products : data.products,
    total : data.total
  }

}

type SearchParams = Promise<{page : string}>



export default async function ProductsPage({searchParams} : {searchParams : SearchParams} ) {

  const {page} = await searchParams

  if(!isValidPage(+page)) {
    redirect('/admin/products?page=1')
  }

  const producstPerPage = 10
  const skip = (+page -1 ) * producstPerPage

 const {products, total} =  await getProducts(producstPerPage, skip)

 const totalPages = Math.ceil(total / producstPerPage)

 if(+page > totalPages) {
  redirect('/admin/products?page=1')
 }

  return (
    <>

      <Link
        href={'/admin/products/new'}
        className="bg-green-400 hover:bg-green-500 cursor-pointer rounded font-bold py-2 px-10"
      >
        Nuevo Producto
      </Link>
      <Heading>Administrar Productos</Heading>

      <ProductsTable 
        products={products}
      />

      <Pagination 
        page={+page}
        totalPages={totalPages}
      />

    </>
  )
}
