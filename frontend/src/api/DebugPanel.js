import React from 'react';

const DebugPanel = ({ title, data }) => (
  <div style={{ 
    margin: '10px 0', 
    padding: '10px', 
    background: '#f0f0f0', 
    border: '1px solid #ccc',
    borderRadius: '4px'
  }}>
    <strong>{title}:</strong>
    <pre>{JSON.stringify(data, null, 2)}</pre>
  </div>
);

export default DebugPanel;