const Open = ({ vraag, onChange }) => {
  return (
    <div className="field">
      <p>{vraag.vraag}</p>
      <textarea
        type="text"
        name={vraag.id}
        value={vraag.answer}
        onChange={onChange}
      />
    </div>
  );
};

export default Open;
