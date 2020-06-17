import React, {useMemo, useState, useEffect} from 'react';
import './style.scss';
import {from, Subject} from 'rxjs';
import {map, mergeAll, scan, debounce} from 'rxjs/operators';
import {sleep} from 'utils/async';

interface IFormValues {
  a: string;
  b: string;
}

const initialFormValues: IFormValues = {a: '', b: ''};

export interface IDemoRxJsProps {}
const DemoRxJs: React.FC<IDemoRxJsProps> = () => {
  const a$ = useMemo(() => new Subject<string>(), []);
  const b$ = useMemo(() => new Subject<string>(), []);

  const [stringifiedFormValues, setStringifiedFormValues] = useState('');

  useEffect(() => {
    const obs$ = from([a$.pipe(map((x) => ({a: x}))), b$.pipe(map((x) => ({b: x})))]).pipe(
      mergeAll(),
      scan((acc, curr) => ({...acc, ...curr}), initialFormValues),
      debounce(() => sleep(1000))
    );
    obs$.subscribe((x) => setStringifiedFormValues(JSON.stringify(x)));
  }, []);

  const handleAChange = (e: React.ChangeEvent<HTMLInputElement>) => a$.next(e.target.value);
  const handleBChange = (e: React.ChangeEvent<HTMLInputElement>) => b$.next(e.target.value);

  return (
    <div className="DemoRxJs">
      <input onChange={handleAChange} />
      &nbsp;&nbsp;&nbsp;
      <input onChange={handleBChange} />
      &nbsp;&nbsp;&nbsp;
      {stringifiedFormValues}
    </div>
  );
};

export default DemoRxJs;
