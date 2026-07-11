import { useEffect, useState } from "react";
import Card from "../components/Card";
import { getDashboardStats } from "../services/dashboardService";
import { DashboardData } from "../types/dashboard";

const Dashboard = () => {

    const [dashboard, setDashboard] =
        useState<DashboardData | null>(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            const data = await getDashboardStats();

            setDashboard(data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    if (loading) {

        return <h2>Loading...</h2>;

    }

    return (

        <div>

            <h1 className="text-3xl font-bold mb-6">

                Dashboard

            </h1>

            <div className="grid grid-cols-2 gap-6">

                <Card
                    title="Total Candidates"
                    value={dashboard?.total_candidates || 0}
                />

                <Card
                    title="Average ATS Score"
                    value={`${dashboard?.average_ats_score || 0}%`}
                />

            </div>

            <div className="grid grid-cols-2 gap-6 mt-8">

                <div className="bg-white rounded shadow p-6">

                    <h2 className="font-bold text-xl mb-4">

                        Top Candidate

                    </h2>

                    {dashboard?.top_candidate ? (

                        <div>

                            <p>

                                <strong>Name:</strong>{" "}
                                {dashboard.top_candidate.name}

                            </p>

                            <p>

                                <strong>ATS Score:</strong>{" "}
                                {dashboard.top_candidate.ats_score}

                            </p>

                        </div>

                    ) : (

                        <p>No Candidate</p>

                    )}

                </div>

                <div className="bg-white rounded shadow p-6">

                    <h2 className="font-bold text-xl mb-4">

                        Recent Candidates

                    </h2>

                    <table className="w-full">

                        <thead>

                            <tr className="border-b">

                                <th className="text-left">Name</th>

                                <th>Email</th>

                                <th>ATS</th>

                            </tr>

                        </thead>

                        <tbody>

                            {dashboard?.recent_candidates.map((candidate) => (

                                <tr
                                    key={candidate.id}
                                    className="border-b"
                                >

                                    <td>{candidate.name}</td>

                                    <td>{candidate.email}</td>

                                    <td>{candidate.ats_score}</td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

};

export default Dashboard;