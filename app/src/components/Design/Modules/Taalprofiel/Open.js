import "./styles/Open.css";

const Open = ({ answer, onChange, value }) => {
  return (
    <div className="field">
      <p className="question">{answer.vraag.vraag}</p>
      <textarea
        type="text"
        name={answer.id}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Open;
