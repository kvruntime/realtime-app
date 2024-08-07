import Link from "next/link";

export default function NavBar() {
  return (
    <>
      <div className="flex flex-row gap-3  p-3 bg-gray-400">
        <Link href="/" className="bg-blue-800 p-3 rounded-md self-center"><div><h1>Realtime App</h1></div></Link>
        <nav>
          <ul className="flex flex-row gap-2 align-middle">
            <li className="text-blue-500  bg-slate-100 p-2"><Link href="/forecast">Forecast</Link></li>
            <li className="text-blue-500  bg-slate-100 p-2"><Link href="/chat">Chat Page</Link></li>
          </ul>
        </nav>
      </div>
    </>
  )
}