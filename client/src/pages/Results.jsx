import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Results = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { sentiment, summary, suggestion } = location.state || {};

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
      style={{
        background: "linear-gradient(to bottom, #a2cfff, #e0f2ff)",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/20">
        <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
        Let’s understand what’s on your mind 💙
        </h1>

        <div className="mb-4">
          <h2 className="text-xl font-semibold text-blue-600 mb-1">
          Overall Sentiment:
          </h2>
          <p className="text-blue-900">
            {sentiment || "Not available"}
          </p>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold text-blue-600 mb-1">
          A little recap of your day:
          </h2>
          <p className="text-blue-900">
            {summary || "Not available"}
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-blue-600 mb-1">
          Maybe this could help:
          </h2>
          <p className="text-blue-900">
            {suggestion || "Not available"}
          </p>
        </div>

        <button
          onClick={() => navigate("/")}
          className="w-full bg-blue-600 hover:bg-blue-700 transition-colors duration-300 text-white py-3 rounded-xl font-semibold"
        >
          Analyze Another Entry
        </button>
      </div>
    </div>
  );
};

export default Results;
