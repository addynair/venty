export default function JournalInput({ entry, setEntry }) {
    return (
      <textarea
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
        placeholder="Write your journal entry here..."
        rows={10}
        className="w-full max-w-2xl p-4 bg-zinc-900 border border-purple-700 rounded-xl resize-none text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
      />
    );
  }
  