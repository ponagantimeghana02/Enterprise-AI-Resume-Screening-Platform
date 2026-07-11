export interface RecentCandidate {
    id: number;
    name: string;
    email: string;
    ats_score: number;
    uploaded_at: string;
}

export interface DashboardData {
    total_candidates: number;
    average_ats_score: number;
    top_candidate: {
        id: number;
        name: string;
        ats_score: number;
    } | null;

    recent_candidates: RecentCandidate[];
}