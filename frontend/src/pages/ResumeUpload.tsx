import { useState } from "react";
import { uploadResume } from "../services/resumeService";

const ResumeUpload = () => {

    const [file, setFile] = useState<File | null>(null);

    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState("");

    const handleUpload = async () => {

        if (!file) {

            alert("Please select a PDF");

            return;
        }

        try {

            setLoading(true);

            const data = await uploadResume(file);

            setMessage(data.message);

            setFile(null);

        } catch (error) {

            console.log(error);

            alert("Upload Failed");

        } finally {

            setLoading(false);

        }

    };

    return (

        <div>

            <h1 className="text-3xl font-bold mb-8">

                Resume Upload

            </h1>

            <div className="bg-white p-6 rounded shadow w-[500px]">

                <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => {

                        if (e.target.files) {

                            setFile(e.target.files[0]);

                        }

                    }}
                />

                <button
                    onClick={handleUpload}
                    disabled={loading}
                    className="mt-6 bg-blue-600 text-white px-6 py-2 rounded"
                >

                    {loading ? "Uploading..." : "Upload Resume"}

                </button>

                {message && (

                    <p className="mt-5 text-green-600">

                        {message}

                    </p>

                )}

            </div>

        </div>

    );

};

export default ResumeUpload;