export default function ResultCard({ result }) {
  return (
    <div className="bg-zinc-900 border border-purple-700 rounded-2xl p-6 max-w-2xl w-full space-y-4 shadow-lg">
      <p><strong className="text-purple-400">Sentiment:</strong> {result.sentiment || "Not available"}</p>
      <p><strong className="text-purple-400">Summary:</strong> {result.summary || "Not available"}</p>
      <p><strong className="text-purple-400">Suggestion:</strong> {result.suggestion || "Not available"}</p>
    </div>
  );
}
