import "./styles/Open.css";

const Open = ({ answer, onChange, value, readOnly }) => {
  return (
    <div className="field">
      <p className="question">{answer.vraag.vraag}</p>
      <textarea
        type="text"
        name={answer.id}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
      />
    </div>
  );
};

export default Open;
