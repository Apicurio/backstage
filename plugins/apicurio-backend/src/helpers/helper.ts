export const hasProperty = (
  properties: { [key: string]: string },
  prop?: string,
) => {
  if (!prop) {
    return true;
  }
  let artifactWithProperty = true;
  prop.split(',').forEach(p => {
    const [key, value] = p.split(':');
    if (!properties[key] || properties[key] !== value) {
      artifactWithProperty = false;
    }
  });
  return artifactWithProperty;
};
