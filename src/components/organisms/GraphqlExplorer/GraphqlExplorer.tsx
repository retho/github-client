import React, { useState } from 'react';
import cn from 'classnames';
import './style.scss';
import SvgIcon from 'components/atoms/SvgIcon';
import CodeEditor from 'components/molecules/CodeEditor';
import { ProgLang } from 'components/molecules/CodeEditor/CodeEditor';
import { useAjax, handleAjaxError, jsonQuery } from 'utils/ajax';
import { useDispatch } from 'react-redux';
import Modal from 'components/templates/Modal';

const codeSample = `
query {
  viewer {
    login
    email
  }
}
`;

const recommendedUserScopes = `user
public_repo
repo
repo_deployment
repo:status
read:repo_hook
read:org
read:public_key
read:gpg_key`;

export interface IGraphqlExplorerProps {
  className?: string;
}
const GraphqlExplorer: React.FC<IGraphqlExplorerProps> = ({ className }) => {
  const dispatch = useDispatch();
  const ajax = useAjax();

  const [gqlCode, setGqlCode] = useState(codeSample);
  const [variablesCode, setVariablesCode] = useState('{}');
  const [resCode, setResCode] = useState('');

  const handleSend = async () => {
    try {
      const [json] = await ajax(
        jsonQuery({
          path: '/graphql',
          method: 'POST',
          body: JSON.stringify({
            query: gqlCode,
            variables: JSON.parse(variablesCode),
          }),
        })
      );
      setResCode(JSON.stringify(json, null, '  '));
    } catch (err) {
      setResCode(err.toString());
      try {
        handleAjaxError(dispatch)(err);
      } catch {}
    }
  };

  const [isModalInfoOpen, setisModalInfoOpen] = useState(false);

  const handleInfoClick = () => setisModalInfoOpen(true);

  return (
    <div className={cn('GraphqlExplorer', className)}>
      <Modal open={isModalInfoOpen} onClose={() => setisModalInfoOpen(false)}>
        <div>
          To match the behavior of the{' '}
          <a href="https://developer.github.com/v4/explorer/">
            GraphQL Explorer
          </a>
          , request the following scopes:
          <pre className="GraphqlExplorer__pre">
            <code>{recommendedUserScopes}</code>
          </pre>
          <a href="https://developer.github.com/v4/guides/forming-calls/#authenticating-with-graphql">
            link 1
          </a>
          <br />
          <a href="https://developer.github.com/apps/building-oauth-apps/understanding-scopes-for-oauth-apps/">
            link 2
          </a>
          <br />
        </div>
      </Modal>
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
