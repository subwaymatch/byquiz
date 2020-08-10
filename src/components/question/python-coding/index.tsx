import React from 'react';
import dynamic from 'next/dynamic';
const ControlledEditor = dynamic(
  import('@monaco-editor/react').then((mod) => mod.ControlledEditor),
  {
    ssr: false,
  }
);

export default function PythonCodingQuestion() {
  return (
    <div>
      <ControlledEditor height="40vh" language="python" />
    </div>
  );
}
