import React from 'react';

const StatusBadge = ({ status }) => {
  const statusClassMap = {
    PENDING: 'badge-pending',
    ACCEPTED: 'badge-accepted',
    REJECTED: 'badge-rejected',
  };

  const statusLabelMap = {
    PENDING: 'Pending',
    ACCEPTED: 'Accepted',
    REJECTED: 'Rejected',
  };

  return (
    <span className={`badge ${statusClassMap[status] || ''}`}>
      {statusLabelMap[status] || status}
    </span>
  );
};

export default StatusBadge;