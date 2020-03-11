import React, { useState } from 'react';
import cn from 'classnames';
import './style.scss';
import SvgIcon from 'components/atoms/SvgIcon';
import CodeEditor from 'components/molecules/CodeEditor';
import { ProgLang } from 'components/molecules/CodeEditor/CodeEditor';
import { useAjax } from 'utils/ajax';

const codeSample = `
query {
  viewer {
    login
  }
}
`;

export interface IGraphqlExplorerProps {
  className?: string;
}
const GraphqlExplorer: React.FC<IGraphqlExplorerProps> = ({ className }) => {
  const ajax = useAjax();

  const [gqlCode, setGqlCode] = useState(codeSample);
  const [variablesCode, setVariablesCode] = useState('{}');
  const [resCode, setResCode] = useState('');

  const handleSend = async () => {
    try {
      const res = await ajax({
        path: 'https://api.github.com/graphql',
        init: {
          method: 'POST',
          body: JSON.stringify({
            query: gqlCode,
            variables: JSON.parse(variablesCode),
          }),
        },
        transformResponse: (x) => Promise.resolve(x),
      });
      const resBody = await res.json();
      setResCode(JSON.stringify(resBody, null, '  '));
    } catch (err) {
      setResCode(err.toString());
    }
  };

  const handleInfoClick = () => null;

  return (
    <div className={cn('GraphqlExplorer', className)}>
      <div className="GraphqlExplorer__panel GraphqlExplorer__panel--left">
        <div className="GraphqlExplorer__code">
          <div className="GraphqlExplorer__controls">
            <SvgIcon
              className="GraphqlExplorer__control-icon GraphqlExplorer__control-icon--play"
              type="octicon-play"
              onClick={handleSend}
            />
            <SvgIcon
              className="GraphqlExplorer__control-icon GraphqlExplorer__control-icon--info"
              type="octicon-info"
              onClick={handleInfoClick}
            />
          </div>
          <CodeEditor
            lang={ProgLang.graphql}
            value={gqlCode}
            onChange={setGqlCode}
          />
        </div>
        <h5>query variables</h5>
        <div className="GraphqlExplorer__code">
          <CodeEditor
            lang={ProgLang.json}
            value={variablesCode}
            onChange={setVariablesCode}
          />
        </div>
      </div>
      <div className="GraphqlExplorer__panel">
        <div className="GraphqlExplorer__code GraphqlExplorer__code--res">
          <CodeEditor
            readOnly
            lang={ProgLang.json}
            value={resCode}
            onChange={() => null}
          />
        </div>
      </div>
    </div>
  );
};

export default GraphqlExplorer;
