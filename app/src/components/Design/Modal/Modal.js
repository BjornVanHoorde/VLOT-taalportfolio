import { useEffect } from "react";
import '../Modal/styles/modal.css'
import close from '../../../img/close.svg';

const Modal = ({ children, title, onDismiss }) => {
  useEffect(() => {
    // body falls outside of React project -> old-school classList allowed
    document.body.classList.add("modal-open");
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, []);

  return (
    <>
      <div
        className="modal fade show"
        style={{ display: "block" }}
        id="staticBackdrop"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                {title}
              </h5>
                <img src={close} alt="close" className="close-modal" onClick={onDismiss}/>
            </div>
            <div className="modal-body">{children}</div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show" />
    </>
  );
};

export default Modal;
