import Canvas from "./Canvas";
import DataForm from "./DataForm";

interface Props {
  props: any;
}

const PatientProfile = ({ props }: Props) => {
  return (
    <div className="patient-profile">
      <Canvas id={props.id} pointCloudData={props.pointCloudData} />
      <DataForm existingPatient={props} />
    </div>
  );
};

export default PatientProfile;
