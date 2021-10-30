export const getOrganization = (organizationId, organizations) => {
  const organization = organizations.filter((element) => element.id === organizationId)[0];
  return organization;
};

export const getOrganizations = (channelId, organizations) => {
  const records = organizations.filter((element) => element.channelId === channelId);
  return records;
};

export const searchOrganizations = (searchKey, organizations) => {
  const dOrganizations = organizations.filter((organization) => organization.name.toLowerCase().includes(searchKey.toLowerCase()));
  return dOrganizations;
};
