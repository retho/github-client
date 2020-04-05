const slicenameCreator = () => {
  if (process.env.NODE_ENV === 'development') {
    const alreadyUsed: Record<string, boolean> = {};
    return (sn: string) => {
      if (alreadyUsed[sn])
        throw new Error(`Slice with name "${sn}" already exists`);
      alreadyUsed[sn] = true;
      return sn;
    };
  }
  return (sn: string) => sn;
};
export const getSliceName = slicenameCreator();
