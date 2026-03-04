import { useEffect, useState, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import BookCard, { Book } from "./BookCard";
import EditBookCard from "./EditBookCard";

interface BookListProps {
  refresh: boolean;
  searchQuery: string;
  filterStatus: "all" | "available" | "borrowed";
}

const BookList = ({ refresh, searchQuery, filterStatus }: BookListProps) => {
  const { user } = useContext(AuthContext);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const res = await API.get("/books");
      setBooks(res.data.data || res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [refresh]);

  const handleToggle = async (id: string, status: string) => {
    await API.patch(`/books/${id}/status`, {
      status: status === "available" ? "borrowed" : "available",
    });
    fetchBooks();
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this book?")) return;
    await API.delete(`/books/${id}`);
    fetchBooks();
  };

  const handleUpdate = async (id: string, form: Partial<Book>) => {
    await API.put(`/books/${id}`, form);
    setEditingId(null);
    fetchBooks();
  };

  const filtered = books.filter((b) => {
    const q = searchQuery.toLowerCase();
    const matchSearch =
      b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q);
    const matchFilter = filterStatus === "all" || b.status === filterStatus;
    return matchSearch && matchFilter;
  });

  if (loading) {
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-slate-800 border border-slate-700/60 rounded-2xl h-44 animate-pulse" />
        ))}
      </div>
    );
  }

  if (filtered.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-500">
        <svg className="w-14 h-14 mb-4 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
        </svg>
        <p className="text-lg font-medium">No books found</p>
        <p className="text-sm mt-1">Try adjusting your search or filter</p>
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {filtered.map((book) =>
        editingId === book._id ? (
          <EditBookCard
            key={book._id}
            book={book}
            onSave={handleUpdate}
            onCancel={() => setEditingId(null)}
          />
        ) : (
          <BookCard
            key={book._id}
            book={book}
            isAdmin={user?.role === "admin"}
            onToggle={handleToggle}
            onDelete={handleDelete}
            onEdit={(b) => setEditingId(b._id)}
          />
        )
      )}
    </div>
  );
};

export default BookList;
