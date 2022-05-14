import React from "react";

// const handleClick = () => {
//     const {handleModalClick} = this.props;
//     handleModalClick(false);
// }

const ModalWindow = (props) =>{
    
    if (!props.modalActive){
            return null
    }
    else{
         return<div className={props.modalActive ? "modal active" : "modal"} 
                    onClick={() => props.handleModalClick(false)}>
            <div className="modal_content" onClick={e => e.stopPropagation()}>
                <div className="modal_header">
                    <h2>{props.title}</h2>
                </div>
                <div className="modal_title">
                    {props.children}
                </div>
            </div>
        </div>
    }
}

export default ModalWindow
