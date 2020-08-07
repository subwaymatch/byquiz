import dynamic from 'next/dynamic';

const sample = `class Animal {
    constructor(public name: string) { }
    move(meters: number) {
        console.log(this.name + " moved " + meters + "m.");
    }
}
class Snake extends Animal {
    move() {
        console.log("Slithering...");
        super.move(5);
    }
}
class Horse extends Animal {
    move() {
        console.log("Galloping...");
        super.move(45);
    }
}
var sam = new Snake("Sammy the Python")
var tom: Animal = new Horse("Tommy the Palomino")
sam.move()
tom.move(34)`;

const MonacoEditor = dynamic(import('react-monaco-editor'), { ssr: false });

function MonacoExamplePage() {
  return (
    <MonacoEditor
      height={'600px'}
      language="typescript"
      theme="vs-dark"
      value={sample}
      onChange={console.log}
      editorDidMount={() => {
        window.MonacoEnvironment.getWorkerUrl = (moduleId, label) => {
          if (label === 'json') return '/_next/static/json.worker.js';
          if (label === 'css') return '/_next/static/css.worker.js';
          if (label === 'html') return '/_next/static/html.worker.js';
          if (label === 'typescript' || label === 'javascript')
            return '/_next/static/ts.worker.js';
          return '/_next/static/editor.worker.js';
        };
      }}
    />
  );
}

export default MonacoExamplePage;
