/* eslint-disable react/prop-types */
import { Table, Button } from 'react-bootstrap';
import './CreateReportStyles.css';

export default function ReportUI({ basicResult, scoreObj, sentiCheck, sentiCheckShow, variant }) {

    // Function to capitalize the first letter of each word
    const capitalize = (str) => str.toLowerCase().replace(/(?:^|\s)\S/g, (a) => a.toUpperCase());

    // Function to convert a number to a percentage string
    const toPercentage = (num) => (num * 100).toFixed(2) + '%';

    return (
        <div>
            <div className='report-element'>
                <h5>Primary Result:</h5>
                <Button variant={variant} className="report-button">
                    <i>{capitalize(basicResult === sentiCheck ? sentiCheckShow : basicResult)}</i>
                </Button>
            </div>

            <div className='report-element'>
                <h5>Deatiled Analysis</h5>
                {scoreObj && (
                    <Table striped="columns" bordered hover className="custom-table">
                        <thead>
                            <tr>
                                <th>Score Name</th>
                                <th>Percentage</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(scoreObj).map(([key, value]) => (
                                <tr key={key}>
                                    <td>{capitalize(key)}</td>
                                    <td>{toPercentage(value)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </div>
        </div>
    );
}
