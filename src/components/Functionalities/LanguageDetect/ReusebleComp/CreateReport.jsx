import "./CreateReportStyles.css";
import AnimationData1 from "../../../../assets/sentiinput.json";
import Lottie from "lottie-react";
import Loader from "../../../../assets/imageloader.json";
import { useEffect, useMemo, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from 'react-bootstrap';

function CreateReport({ Input=[] }) {
  const [basicResult, setBasicResult] = useState([]);
  const [score, setScore] = useState(null);
  const [Loading, setLoading] = useState(false);

  const handleReport = useMemo(
    () => async () => {
      if (Input && Array.isArray(Input.texts)) {
        // Ensure Input is structured as { texts: [...] }
        try {
          setLoading(true);

          // Make a request to the updated Node.js endpoint
          const response = await fetch(
            "http://localhost:8000/analysis/language-detect", // Update the URL to your Node.js endpoint
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ texts: Input.texts }), // Send texts in the expected format
            }
          );

          const reportData = await response.json();
          setLoading(false);

          // If successful, process the report data
          setBasicResult(reportData.result); // Assuming setBasicResult is meant to show the results
        } catch (error) {
          setLoading(false);
          // Display error message for any fetch errors
          toast.error(
            error.message || "An error occurred while generating the report."
          );
        }
      }
    },
    [Input]
  );

  useEffect(() => {
    handleReport();
  }, [handleReport, Input]);

  console.log("Report", basicResult)
  return (
    <div>
      {Loading ? (
        <Lottie animationData={Loader} className="senitment-analysis-loading" />
      ) : basicResult.length > 0 ? (
        <div className="report-self">
          {basicResult.map((result, index) => (
            <div key={index}>
              <div className="report-element">
                <h5>Primary Result:</h5>
                <Button variant="success" className="report-button">
                  {result.predicted_language}
                </Button>
              </div>
              <div className="report-element">
                <h5>Relative Score:</h5>
                <Button variant="success" className="report-button">
                  {(result.score * 100).toFixed(2)}%
                </Button>
              </div>
              <div className="report-element">
                <h5>Provided Text</h5>
                <h3>{result.text}</h3>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Lottie
          animationData={AnimationData1}
          className="report-animation-data-preview"
        />
      )}
    </div>
  );
}

export default CreateReport;
