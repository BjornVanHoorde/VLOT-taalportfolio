import Label from "../../../../Design/Form/Label";
import * as yup from "yup";
import Input from "../../../../Design/Form/Input";
import Button from "../../../../Design/Button/Button";
import useForm from "../../../../../core/hooks/useForm";
import Field from "../../../../Design/Form/Field";

const schema = yup.object().shape({
  taal: yup.string().required(),
});

const defaultData = {
  taal: "",
};

const AndereTaalForm = ({ initialData = {}, disabled, onSubmit, label }) => {
  const { values, errors, handleChange, handleSubmit } = useForm(schema, {
    ...defaultData,
    ...initialData,
  });

  const handleData = (values) => {
    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit(handleData)} noValidate={true} id="andereTaalForm">
      <Field>
        <Label htmlFor="name">Taal</Label>
        <Input
          type="text"
          name="taal"
          value={values.taal}
          onChange={handleChange}
          error={errors.taal}
          disabled={disabled}
        />
      </Field>
      <Button align="right" type="submit" disabled={disabled} label={label} />
    </form>
  );
};

export default AndereTaalForm;
