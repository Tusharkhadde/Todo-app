const ConfirmModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <p>{message}</p>
        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
          <button className="btn btn-primary" onClick={onConfirm} style={{ background: 'linear-gradient(135deg, #ff7675, #e17055)' }}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
