import { useSelector as useSelectorOrigin } from 'react-redux';
import { RootState } from 'store';

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

export const useSelector = <TSelected>(
  selector: (state: RootState) => TSelected,
  equalityFn?: (left: TSelected, right: TSelected) => boolean
) => useSelectorOrigin(selector, equalityFn);
