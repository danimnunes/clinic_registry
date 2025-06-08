import React from 'react';
import { getUserRoles } from '../utils/auth';

export default function RequireRole({ roles, children }) {
  const userRoles = getUserRoles();
  const hasRole = roles.some(role => userRoles.includes(role));

  if (!hasRole) return null;

  return <>{children}</>;
}
