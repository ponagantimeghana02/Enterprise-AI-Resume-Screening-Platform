import { useEffect, useState } from "react";
import { Candidate } from "../types/candidate";
import { getRanking } from "../services/candidateService";

const CandidateRanking = () => {

    const [ranking, setRanking] = useState<Candidate[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadRanking();
    }, []);

    const loadRanking = async () => {

        try {

            const data = await getRanking();

            setRanking(data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    if (loading) {

        return <h2>Loading Ranking...</h2>;

    }

    return (

        <div>

            <h1 className="text-3xl font-bold mb-6">

                Candidate Ranking

            </h1>

            <table className="w-full bg-white rounded shadow">

                <thead className="bg-blue-600 text-white">

                    <tr>

                        <th className="p-3">Rank</th>

                        <th>Name</th>

                        <th>Email</th>

                        <th>ATS Score</th>

                        <th>Match Score</th>

                    </tr>

                </thead>

                <tbody>

                    {ranking.map((candidate, index) => (

                        <tr
                            key={candidate.id}
                            className="border-b text-center hover:bg-gray-100"
                        >

                            <td className="p-3">

                                {index === 0 && "🥇"}

                                {index === 1 && "🥈"}

                                {index === 2 && "🥉"}

                                {index > 2 && index + 1}

                            </td>

                            <td>

                                {candidate.candidate_name}

                            </td>

                            <td>

                                {candidate.email}

                            </td>

                            <td>

                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded">

                                    {candidate.ats_score}

                                </span>

                            </td>

                            <td>

                                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded">

                                    {candidate.match_score}

                                </span>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

};

export default CandidateRanking;