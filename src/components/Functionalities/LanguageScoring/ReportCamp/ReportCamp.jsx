import AnimationData1 from "../../../../assets/sentiinput.json";
import Lottie from "lottie-react";
import Loader from "../../../../assets/imageloader.json";
import { useEffect, useMemo, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from 'react-bootstrap';

function ReportCamp({ Input }) {
  const [basicResult, setBasicResult] = useState([]);
  const [Loading, setLoading] = useState(false);

  const handleReport = useMemo(
    () => async () => {
      if (Input) {
        try {
          setLoading(true);

          const response = await fetch(
            "http://localhost:8000/evaluation/keywords",
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

          if (!response.ok || !reportData.keywords) {
            toast.error("Failed to fetch report data.");
            return;
          }

          // Split keywords string into an array and store in basicResult
          setBasicResult(reportData.keywords.split(", "));
          toast.success("Report generated successfully!");
        } catch (error) {
          setLoading(false);
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

  return (
    <div>
      {Loading ? (
        <Lottie animationData={Loader} className="senitment-analysis-loading" />
      ) : basicResult.length > 0 ? (
        <div className="report-self">
          <div className="report-element">
            <h5>Result:</h5>
            {basicResult.map((keyword, index) => (
              <Button key={index} variant="success" className="report-button">
                {keyword}
              </Button>
            ))}
          </div>
        </div>
      ) : (
        <Lottie
          animationData={AnimationData1}
          className="report-animation-data-preview"
        />
      )}
      <ToastContainer />
    </div>
  );
}

export default ReportCamp;
