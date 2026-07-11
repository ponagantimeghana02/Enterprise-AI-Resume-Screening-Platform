import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

import { getAnalytics } from "../services/analyticsService";
import { Analytics as AnalyticsType } from "../types/analytics";
import Card from "../components/Card";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Analytics = () => {

    const [analytics, setAnalytics] =
        useState<AnalyticsType | null>(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadAnalytics();

    }, []);

    const loadAnalytics = async () => {

        try {

            const data = await getAnalytics();

            setAnalytics(data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    if (loading) {

        return <h2>Loading Analytics...</h2>;

    }

    const chartData = {
        labels: [
            "Average ATS",
            "Average Match",
            "Highest ATS",
            "Highest Match",
        ],
        datasets: [
            {
                label: "Score",
                data: [
                    analytics?.average_ats_score,
                    analytics?.average_match_score,
                    analytics?.highest_ats_score,
                    analytics?.highest_match_score,
                ],
            },
        ],
    };

    return (

        <div>

            <h1 className="text-3xl font-bold mb-6">

                Analytics Dashboard

            </h1>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">

                <Card
                    title="Total Resumes"
                    value={analytics?.total_resumes || 0}
                />

                <Card
                    title="Average ATS"
                    value={`${analytics?.average_ats_score}%`}
                />

                <Card
                    title="Average Match"
                    value={`${analytics?.average_match_score}%`}
                />

                <Card
                    title="Highest ATS"
                    value={analytics?.highest_ats_score || 0}
                />

                <Card
                    title="Highest Match"
                    value={analytics?.highest_match_score || 0}
                />

            </div>

            <div className="bg-white mt-8 p-6 rounded shadow">

                <h2 className="text-xl font-bold mb-4">

                    Analytics Chart

                </h2>

                <Bar data={chartData} />

            </div>

        </div>

    );

};

export default Analytics;