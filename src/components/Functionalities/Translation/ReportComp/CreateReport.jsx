/* eslint-disable react/prop-types */
import AnimationData1 from '../../../../assets/translation.json';
import Lottie from 'lottie-react';
import Loader from '../../../../assets/imageloader.json';
import { useEffect, useMemo, useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateReport({Input}) {
    const [basicResult, setBasicResult] = useState('');
    const [score, setScore] = useState(null);
    const [Loading, setLoading] = useState(false);

    const handleReport = useMemo(
        () => async () => {
            if (Input) {
                try {
                    setLoading(true);
                    const response = await fetch(
                        "http://localhost:8000/analysis/sentiment",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(Input),
                        }
                    );

                    const reportData = await response.json();
                    setLoading(false);

                    if (!response.ok || reportData.success === false) {
                        // Trigger error toast if response indicates failure
                        toast.error(reportData.message || "Failed to fetch report data.");
                        return;
                    }

                    // Success: update result and score, show success toast
                    setBasicResult(reportData.result.output);
                    setScore(reportData.result.probas);
                    toast.success("Report generated successfully!");
                } catch (error) {
                    setLoading(false);
                    // Trigger error toast on any fetch error
                    toast.error(error.message || "An error occurred while generating the report.");
                }
            }
        },
        [Input]
    );

    useEffect(() => {
        handleReport();
    }, [handleReport, Input]);

    return (
        <div>
            {Loading ? (
                <Lottie animationData={Loader} className="senitment-analysis-loading" />
            ) : basicResult ? (
                <div className="report-self">
                        Report here
                </div>
            ) : (
                <Lottie animationData={AnimationData1} className="report-animation-data-preview" />
            )}
        </div>
    );
}

export default CreateReport
