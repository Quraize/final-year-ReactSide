/* eslint-disable react/prop-types */
import Alert from "react-bootstrap/Alert";
import { useState } from "react";
import "./AlertMessageStyles.css";

export default function AlertMessage({ Variant, message }) {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <Alert
        variant={Variant}
        className="alert-self"
        onClose={() => setShow(false)}
        dismissible
      >
        <Alert.Heading>Bad Request</Alert.Heading>
        <p> {message}</p>
      </Alert>
    );
  }
}
