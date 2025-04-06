import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [entry, setEntry] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAnalyze = async () => {
    if (!entry.trim()) return;

    setLoading(true);
    try {
      const response = await axios.post(`${baseUrl}/analyze`, { entry });
      navigate("/results", { state: response.data });
    } catch (error) {
      console.error("❌ Error analyzing mood:", error);
      navigate("/results", { state: { sentiment: "Not available", summary: "Not available", suggestion: "Not available" } });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
      style={{
        background: "linear-gradient(to bottom, #a2cfff, #e0f2ff)",
        fontFamily: 'Poppins, sans-serif'
      }}
    >
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/20">
        <h1 className="text-4xl font-bold text-blue-700 mb-6 text-center">
        Venty 💙
        </h1>

        <textarea
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          placeholder="Write about your day..."
          className="w-full h-40 p-4 rounded-xl bg-white/20 text-blue-800 placeholder:text-blue-500 resize-none outline-none focus:ring-2 focus:ring-white/50"
        />

        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 transition-colors duration-300 text-white py-3 rounded-xl font-semibold disabled:opacity-60"
        >
          {loading ? "Analyzing..." : "Analyze Mood"}
        </button>
      </div>
    </div>
  );
};

export default Home;
