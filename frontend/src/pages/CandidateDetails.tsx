import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Candidate } from "../types/candidate";
import { getCandidate } from "../services/candidateService";

const CandidateDetails = () => {
  const { id } = useParams();

  const [candidate, setCandidate] = useState<Candidate | null>(null);

  useEffect(() => {
    loadCandidate();
  }, []);

  const loadCandidate = async () => {
    const data = await getCandidate(Number(id));

    setCandidate(data);
  };

  if (!candidate) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Candidate Details</h1>

      <div className="bg-white p-6 rounded shadow space-y-3">
        <p>
          <strong>Name:</strong> {candidate.candidate_name}
        </p>

        <p>
          <strong>Email:</strong> {candidate.email}
        </p>

        <p>
          <strong>Phone:</strong> {candidate.phone}
        </p>

        <p>
          <strong>ATS Score:</strong> {candidate.ats_score}
        </p>

        <p>
          <strong>Match Score:</strong> {candidate.match_score}
        </p>

        <p>
          <strong>Summary:</strong>
        </p>

        <p>{candidate.summary}</p>

        <h2 className="text-xl font-bold mt-5">Skills</h2>

        <ul className="list-disc ml-6">
          {candidate.skills?.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>

        <h2 className="text-xl font-bold mt-5">Experience</h2>
        {candidate?.experience && typeof candidate.experience === "string" ? (
          <p>{candidate.experience}</p>
        ) : (
          <>
            {candidate?.experience && candidate.experience?.length > 1 ? (
              <>
                <ul className="list-disc ml-6">
                  {candidate.experience.map((exp, index) => (
                    <li key={index}>{exp?.company}</li>
                  ))}
                </ul>
              </>
            ) : (
              <p>No experience listed.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CandidateDetails;
