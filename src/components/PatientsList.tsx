import { useState, useEffect } from "react";
import PatientProfile from "./PatientProfile";
import DataForm from "./DataForm";

const PatientsList = () => {
  const [patients, setPatients] = useState([]);
  const [modalVisibility, setModalVisibility] = useState(false);

  useEffect(() => {
    getPatients();
  }, []);

  const getPatients = async () => {
    try {
      let response = await fetch("http://localhost:3000/patients");

      // Check if the HTTP status is successful (200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      let data = await response.json();
      setPatients(data);

    } catch (error) {
      console.error("Could not fetch patients:", error);
    }
  }

  return (
    <>
      <div id="header">
        <h1>Patients List</h1>
        <button
          onClick={() => {
            setModalVisibility(true);
          }}
        >
          Create New Profile
        </button>
      </div>
      {patients.map((patient, index) => (
        <PatientProfile key={index} props={patient} />
      ))}
      {modalVisibility && (
        <div>
          <div id="modal">
            <DataForm setVisibility={setModalVisibility} />
          </div>
        </div>
      )}
    </>
  );
};

export default PatientsList;
