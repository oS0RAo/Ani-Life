interface NavbarProps {
  setCurrentPage: (page: "home" | "browse" | "detail" | "mylist" | "admin") => void;
}

export default function Navbar({ setCurrentPage }: NavbarProps) {
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold cursor-pointer" onClick={() => setCurrentPage("home")}>
        AnimeList
      </h1>
      <div className="space-x-4">
        <button onClick={() => setCurrentPage("home")} className="hover:text-blue-400">Home</button>
        <button onClick={() => setCurrentPage("browse")} className="hover:text-blue-400">Browse</button>
        <button onClick={() => setCurrentPage("mylist")} className="hover:text-blue-400">My List</button>
        <button onClick={() => setCurrentPage("admin")} className="hover:text-blue-400">Admin</button>
      </div>
    </nav>
  );
}
