import { ReactElement, useState } from 'react';

import CodeMirror from '@uiw/react-codemirror';
import 'codemirror/keymap/sublime';
import 'codemirror/mode/javascript/javascript';

// TODO currently for catching errors I'm just wrapping the whole thing
// in a try catch. This can be escaped by a user if they wanted
// Not sure what the best way to handle the errors would be
const prelude = `"use strict";
try {
console.log=this.consoleLog;`;

const postscript = `this.flushConsole();
} catch (e) {
  console.log(e);
  this.flushConsole();
}`;

// TODO take expected output to display for noscript users
interface Props {
  code: string;
  hiddenPrelude: string;
  codeHeight?: string;
}

// TODO noscript
export const CodeRegion = (props: Props):ReactElement => {
  const [codeMirrorProgram, setCodeMirrorProgram] = useState(props.code);
  const [consoleHistory, setConsoleHistory] = useState('');

  const exec = (program: string) => {
    const consoleBuffer = [] as string[];
    const fakeConsole = (...data: any[]) => {
      // TODO we can do better than just .toString() here
      // Can check here for guidance https://github.com/whatwg/console
      const newData: string = data.map(d => d.toString()).join(', ');
      consoleBuffer.push(newData);
    };
    const flushConsole = () =>
      setConsoleHistory(consoleBuffer.join('\n'));

    const thisObj = {
      consoleLog: fakeConsole,
      flushConsole,
    };

    // TODO look further into making sure this is safe
    // eslint-disable-next-line no-new-func
    return Function(`${prelude}${props.hiddenPrelude}${program}${postscript}`).apply(thisObj);
  };

  return (
    <div className='code-region'>
      <CodeMirror
        value={ props.code }
        onChange={ (editor) => setCodeMirrorProgram(editor.getValue()) }
        height={ props.codeHeight || '12em' }
        lazyLoadMode={ false }
        options={{
          theme: 'nicks-theme',
          keyMap: 'sublime',
          mode: 'js',
        }}
      />
      <div className='control-row'>
        <div className='controls'>
          <button onClick={ () => exec(codeMirrorProgram) }>Run</button>
          <button onClick={ () => setConsoleHistory('') }>Clear</button>
        </div>
        <div className='output'>
          <CodeMirror
            value={ consoleHistory }
            height='8em'
            options={{
              theme: 'nicks-output-theme',
              keyMap: 'sublime',
              mode: 'none',
              readOnly: 'nocursor',
              lineNumbers: false,
            }}
          />
        </div>
      </div>
    </div>
  );
};


