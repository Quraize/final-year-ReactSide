/* eslint-disable react/prop-types */
import Button from "react-bootstrap/esm/Button";


export default function ReportUI({ basicResult, scoreObj, sentiCheck, sentiCheckShow, variant }) {

    // Function to capitalize first letter of each word
    const capitalize = (str) => str.toLowerCase().replace(/(?:^|\s)\S/g, (a) => a.toUpperCase());
    return (
        <>
            <Button variant={variant} className="report-button"><i>{capitalize(basicResult === sentiCheck ? sentiCheckShow : basicResult)}</i></Button>
            {scoreObj && Object.entries(scoreObj).map(([key, value]) =>
                <p key={key}>{key}:{value}</p>
            )}
        </>
    )
}
