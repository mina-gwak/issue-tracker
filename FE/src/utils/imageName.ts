export const getImageName = (file: File) => {
  const imageType = file.type.split('/')[1];
  return file.name.replace(`.${imageType}`, '');
}
