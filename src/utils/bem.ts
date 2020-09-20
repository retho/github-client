// eslint-disable-next-line no-restricted-imports
import {withNaming} from '@bem-react/classname';

export const cn = (...args: (boolean | null | undefined | string)[]) =>
  args.filter((x) => x).join(' ');

const bem = withNaming({n: '', e: '__', m: '--', v: '_'});
export default bem;
