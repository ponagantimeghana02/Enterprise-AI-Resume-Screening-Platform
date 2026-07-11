import { useState } from "react";
import { searchResume } from "../services/searchService";

const ResumeSearch = () => {

  const [query, setQuery] = useState("");

  const [results, setResults] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {

    if (!query.trim()) {
      alert("Enter search text");
      return;
    }

    try {

      setLoading(true);

      const data = await searchResume(query);

      setResults(data);

    } catch (error) {

      console.log(error);

      alert("Search Failed");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div>

      <h1 className="text-3xl font-bold mb-6">

        Resume Semantic Search

      </h1>

      <div className="bg-white p-6 rounded shadow">

        <div className="flex gap-4">

          <input
            type="text"
            placeholder="Search resumes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border p-2 flex-1 rounded"
          />

          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-6 rounded"
          >
            Search
          </button>

        </div>

      </div>

      {loading && (

        <h2 className="mt-5">

          Searching...

        </h2>

      )}

      <div className="mt-8 space-y-5">

        {results.length === 0 && !loading && (

          <p>No Results</p>

        )}

        {results.map((result, index) => (
  <div key={index} className="bg-white shadow rounded p-5">
    <h2 className="font-bold text-lg">
      {result.source}
    </h2>

    <p className="text-sm text-gray-500">
      Similarity Distance: {result.distance}
    </p>

    <p className="mt-3 whitespace-pre-wrap">
      {result.document}
    </p>
  </div>
))}

      </div>

    </div>

  );

};

export default ResumeSearch;