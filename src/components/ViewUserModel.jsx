
function ViewUserModel({user,closeModal}) {

    
  return (
        <div className="modal show" style={{display:"block"}}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">User Details</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={closeModal}></button>
                    </div>
                    <div className="modal-body">
                        Name: {user.name} <br />
                        Email: {user.email} <br />
                        Age: {user.age} <br />
                        Gender: {user.gender}
                    </div>
                      <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={closeModal}>Close</button>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default ViewUserModel;