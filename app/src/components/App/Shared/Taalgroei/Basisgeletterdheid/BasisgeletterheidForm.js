import { useEffect, useState } from "react";
import BasisgeletterdheidChoices from "../../../../../core/constants/BasisgeletterdheidChoices";
import Vaardigheden from "../../../../../core/constants/Vaardigheden";
import useForm from "../../../../../core/hooks/useForm";
import Button from "../../../../Design/Button/Button";
import Select from "../../../../Design/Form/Select";

const transformData = (initialData) => {
  const transformedData = {};

  initialData.forEach((data) => {
    transformedData[data.id] = `${data.status}`;
  });

  return transformedData;
};

const BasisgeletterdheidForm = ({
  data,
  onSubmit,
  klas,
  isStudent = false,
}) => {
  const [currentAll, setCurrentAll] = useState("");
  const { values, handleChange, handleSubmit, handleInvalidate } = useForm(
    null,
    transformData(data)
  );

  // invalidate the form when the data changes
  useEffect(() => {
    handleInvalidate(transformData(data));
  }, [data]);

  const handleData = (values) => {
    onSubmit(values);
  };

  const handleAllChange = (e) => {
    setCurrentAll(e.target.value);

    if (e.target.value !== "") {
      // Update all the values to the value given
      for (const index in values) {
        values[index] = e.target.value;
      }
    }
  };

  return (
    <>
      {!isStudent && (
        <>
          <label>verander alle waarden</label>
          <Select
            name="change all"
            options={[{ label: "-", value: "" }, ...BasisgeletterdheidChoices]}
            value={currentAll}
            onChange={handleAllChange}
          />
        </>
      )}
      <form
        className="basisgeletterdheid-form"
        onSubmit={handleSubmit(handleData)}
      >
        {Vaardigheden.map((vaardigheid) => {
          return (
            <div
              key={vaardigheid.label}
              className="basisgeletterdheid-form__subpart"
            >
              <h2>{vaardigheid.label}</h2>
              {data.map((element) => {
                if (
                  element.basisgeletterdheid.vaardigheid === vaardigheid.label
                ) {
                  return (
                    <div
                      key={element.id}
                      className="basisgeletterdheid-form__field"
                    >
                      {klas && (
                        <p>
                          {element.leerling.voornaam}{" "}
                          {element.leerling.achternaam}
                        </p>
                      )}
                      <label>{element.basisgeletterdheid.geletterdheid}</label>
                      <Select
                        name={`${element.id}`}
                        options={BasisgeletterdheidChoices}
                        value={values[element.id]}
                        onChange={handleChange}
                        disabled={isStudent}
                      />
                    </div>
                  );
                }
              })}
            </div>
          );
        })}
        {!isStudent && (
          <Button align="right" label="Opslaan" className="form-button" />
        )}
      </form>
    </>
  );
};

export default BasisgeletterdheidForm;
