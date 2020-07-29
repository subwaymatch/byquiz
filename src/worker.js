addEventListener('message', async (event) => {
  console.log(event);

  switch (event.data.type) {
    case 'LOAD_PYODIDE':
      postMessage({
        type: 'LOAD_REQUESTED',
        data: null,
      });

      break;
    default:
      postMessage({
        type: 'COMMAND_NOT_FOUND',
        data: null,
      });
  }
});
