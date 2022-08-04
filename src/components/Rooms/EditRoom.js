import React from 'react';
import { useParams } from 'react-router-dom';

export function EditRoom() {
  const { roomID } = useParams();

  return <div>Edit Room @{roomID}</div>;
}
