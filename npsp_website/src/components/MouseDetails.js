// MouseDetails.js
import React from 'react';
import './styles.css'; // Ensure you have the styles for the component

const MouseDetails = ({ details }) => {
    return (
        <div className="mouse-details">
            <div className="mouse-detail">
                <span className="detail-label">Site:</span>
                <span className="detail-value">{details.site || 'N/A'}</span>
           
                <span className="detail-label">Fecal slurry dose:</span>
                <span className="detail-value">{details.slurrydose || 'N/A'}</span>
            </div>
            <div className="mouse-detail">
               
                <span className="detail-label">Type of Study:</span>
                <span className="detail-value">{details.studytype || 'N/A'}</span>
           
         
                <span className="detail-label">Study endpoint:</span>
                <span className="detail-value">{details.endpoint || 'N/A'}</span>
                
            </div>
            <div className="mouse-detail">
                <span className="detail-label">Mouse ID:</span>
                <span className="detail-value">{details.mouse_id || 'N/A'}</span>
            </div>
        </div>
    );
};

export default MouseDetails;
