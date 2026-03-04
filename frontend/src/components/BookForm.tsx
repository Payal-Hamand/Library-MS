
import { useState } from "react";
import API from "../api/axios";
import { PlusIcon, SpinnerIcon, WarnIcon } from "./Icons";

interface BookFormProps {
  onRefresh: () => void;
}

const BookForm = ({ onRefresh }: BookFormProps) => {
  const [form, setForm] = useState({ title: "", author: "", publishedYear: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAdd = async () => {
    if (!form.title.trim() || !form.author.trim()) {
      setError("Title and Author are required.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await API.post("/books", form);
      setForm({ title: "", author: "", publishedYear: "" });
      onRefresh();
    } catch {
      setError("Failed to add book. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-800 border border-slate-700/60 rounded-2xl p-6 mb-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-8 h-8 bg-teal-500/10 border border-teal-500/20 rounded-lg flex items-center justify-center text-teal-400">
          <PlusIcon />
        </div>
        <h3 className="text-white font-semibold">Add New Book</h3>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2.5 text-red-400 text-sm">
          <WarnIcon />
          {error}
        </div>
      )}

      {/* Inputs */}
      <div className="flex flex-col sm:flex-row gap-3">
        {[
          { key: "title", label: "Title", placeholder: "e.g. Clean Code", flex: "flex-1" },
          { key: "author", label: "Author", placeholder: "e.g. Robert C. Martin", flex: "flex-1" },
          { key: "publishedYear", label: "Year", placeholder: "2024", flex: "sm:w-28" },
        ].map(({ key, label, placeholder, flex }) => (
          <div className={flex} key={key}>
            <label className="block text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1.5">
              {label}
            </label>
            <input
              type="text"
              placeholder={placeholder}
              value={form[key as keyof typeof form]}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 text-white placeholder-slate-500 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500 transition"
            />
          </div>
        ))}

        <div className="flex items-end">
          <button
            onClick={handleAdd}
            disabled={loading}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-400 disabled:bg-teal-500/40 disabled:cursor-not-allowed text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-all h-[42px]"
          >
            {loading ? <SpinnerIcon /> : <PlusIcon />}
            {loading ? "Adding…" : "Add Book"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookForm;
