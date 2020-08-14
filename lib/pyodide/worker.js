self.packages = [];

const loadPyodide = async () => {
  importScripts('https://pyodide-cdn2.iodide.io/v0.15.0/full/pyodide.js');

  await languagePluginLoader;

  // TODO: Save keys from global() object to an array to clean up non-default global variables later when running multiple times
};

const loadPackages = async (packages) => {
  await self.pyodide.loadPackage(packages);

  self.packages.concat[packages];
};

const setVars = async (vars) => {
  const keys = Object.keys(vars);

  for (let key of keys) {
    // Keys are arguments for the python script.
    // Set them on self, so that `from js import key` works.
    self[key] = vars[key];
  }
};

const runCodeAsync = async (code) => {
  try {
    // TODO: Reset global environment (clear global variables)

    // Intercept Python stdout & stderr to StringIO
    await pyodide.runPythonAsync(`import io, sys
sys.stdout = io.StringIO()
sys.stderr = io.StringIO()`);

    console.log('worker.runCodeAsync');

    const output = await self.pyodide.runPythonAsync(code, (res) => {
      console.log('inside runPythonAsync callback');
      console.log(res);
    });
    const stdout = await self.pyodide.runPythonAsync('sys.stdout.getvalue()');
    const stderr = await self.pyodide.runPythonAsync('sys.stderr.getvalue()');

    return {
      hasError: false,
      output,
      stdout,
      stderr,
    };
  } catch (err) {
    return {
      hasError: true,
      errorMessage: err.message,
    };
  }
};

addEventListener('message', async (event) => {
  self.languagePluginUrl = 'https://pyodide-cdn2.iodide.io/v0.15.0/full/';

  let codeResult, checkResult;

  switch (event.data.type) {
    case 'LOAD_PYODIDE':
      postMessage({
        type: 'PYODIDE_LOAD_START',
      });

      await loadPyodide();

      postMessage({
        type: 'PYODIDE_LOAD_COMPLETE',
      });

      break;

    case 'RUN_CODE':
      codeResult = await runCodeAsync(event.data.userCode);

      postMessage({
        type: 'CODE_RUN_COMPLETE',
        result: codeResult,
      });

      break;

    case 'RUN_AND_CHECK_CODE':
      codeResult = await runCodeAsync(event.data.userCode);

      let runAndCheckResult = Object.assign(codeResult, {
        isCorrect: false,
      });

      if (!codeResult.hasError) {
        checkResult = await runCodeAsync(event.data.checkCode);

        runAndCheckResult = Object.assign({}, codeResult, {
          hasError: checkResult.hasError,
          isCorrect: !checkResult.hasError,
          errorMessage: checkResult.errorMessage,
        });
      }

      postMessage({
        type: 'CODE_RUN_AND_CHECK_COMPLETE',
        result: runAndCheckResult,
      });

      break;

    default:
      postMessage({
        type: 'COMMAND_NOT_FOUND',
        data: null,
      });
  }
});
