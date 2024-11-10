import AnimationData1 from '../../../../assets/translation.json';
import Lottie from 'lottie-react';
import Loader from '../../../../assets/imageloader.json';
import { useEffect, useMemo, useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Form from "react-bootstrap/Form";
import AOS from "aos";
import "aos/dist/aos.css";

function ReportComp({ Input }) {
    const [summary, setSummary] = useState(''); // Holds the final summary
    const [Loading, setLoading] = useState(false);
  
    const handleReport = useMemo(
      () => async () => {
        if (Input) {
          try {
            setLoading(true);
            const response = await fetch(
              "http://localhost:8000/evaluation/summarize",
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
  
            if (!response.ok || !reportData.summary) {
              toast.error(reportData.message || "Failed to fetch report data.");
              return;
            }
  
            // Store the summary directly
            setSummary(reportData.summary);
          } catch (error) {
            setLoading(false);
            toast.error(error.message || "An error occurred while generating the report.");
          }
        }
      },
      [Input]
    );
  
    useEffect(() => {
      handleReport();
    }, [handleReport, Input]);

    useEffect(() => {
        AOS.init({
          duration: 1500,
          easing: "ease-in-out-back",
        });
      }, []);
  
    return (
      <div>
        {Loading ? (
          <Lottie animationData={Loader} className="sentiment-analysis-loading" />
        ) : summary ? (
          <div className="report-self">
            <Form.Control
              as="textarea"
              readOnly
              rows={6}
              value={summary} // Directly showing the summary here
              className="summary-text-field"
              data-aos="fade-bottom"
            />
          </div>
        ) : (
          <Lottie animationData={AnimationData1} className="report-animation-data-preview" />
        )}
        <ToastContainer />
      </div>
    );
}

export default ReportComp;
