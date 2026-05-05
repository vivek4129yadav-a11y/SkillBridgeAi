export const SEEKER_ROLES = ['individual_youth', 'individual_bluecollar', 'individual_informal'];

export const ORGANIZATION_ROLES = ['org_employer', 'org_ngo', 'org_govt'];

export const isSeeker = (role?: string) => role ? SEEKER_ROLES.includes(role) : false;
export const isOrganization = (role?: string) => role ? ORGANIZATION_ROLES.includes(role) : false;
