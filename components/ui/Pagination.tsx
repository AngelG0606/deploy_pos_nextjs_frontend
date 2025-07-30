import Link from "next/link"

export default function Pagination({page, totalPages} : {page : number,  totalPages : number}) {

    const pages = Array.from({length : totalPages}, (_, i) => i+1)

  return (
    <nav className="flex justify-center py-10">

        {page > 1 && (
            <Link
                className={`bg-green-400 font-black  px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0`}
                href={`/admin/products?page=${page - 1}`}
            >
                &laquo; Anterior
            </Link>
        )}

        {pages.map(currentPage => (
            <Link 
                key={currentPage}
                href={`/admin/products?page=${currentPage}`}
                className={`${page === currentPage && 'bg-green-400 text-gray-900 font-black'}  px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0`}
            >
                {currentPage}
            </Link>
        ))}

        {page < totalPages && (
            <Link
                className={`bg-green-400 font-black  px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0`}
                href={`/admin/products?page=${page + 1}`}
            >
                 Siguiente &raquo;
            </Link>
        )}

    </nav>
  )
}
