# ByQuiz
<a href="https://deepscan.io/dashboard#view=project&tid=10181&pid=12879&bid=206032"><img src="https://deepscan.io/api/teams/10181/projects/12879/branches/206032/badge/grade.svg" alt="DeepScan grade"></a>
<a href="https://www.codacy.com/manual/subwaymatch/byquiz-prototype?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=subwaymatch/byquiz-prototype&amp;utm_campaign=Badge_Grade"><img src="https://app.codacy.com/project/badge/Grade/f44c518a3b884f5b9a4c917206ad116d"/></a>

<blockquote>Learn to code by solving problems - both inside and outside the classroom.</blockquote>

**This project is in development.**

Vercel Project - [https://vercel.com/subwaymatch/byquiz-prototype](https://vercel.com/subwaymatch/byquiz-prototype)

## Overview

Learning to code - whether it's hardcore C/C++, less-hardcore Python, or SQL - is challenging. Hands-on coding experince is a must. But orchestrating a learning experience in a classroom environment poses multiple challenges. 

- You can't embed code exercises into the Powerpoint slides. Switching between the slides and code exercises is an overhead for both the instructor and the students.
- There is no way to check whether a learner's progress when working on code exercises. An instructor can walk around to see how everyone's doing.


## Getting Started with Development

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Browsers Support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Opera | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Edge |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| >= 52 (Mar 2017)                                                                                                                                                                                                  | >= 57 (Mar 2017)                                                                                                                                                                                              | >= 11 (Sep 2017)                                                                                                                                                                                              | >= 44 (Mar 2017)                                                                                                                                                                                          | >= 16 (Oct 2017)                                                                                                                                                                                           |

- [WebAssembly](https://webassembly.org/) is used to integrate Python 3.8 runtime to the browser using [Pyodide](https://github.com/iodide-project/pyodide). Please check WebAssembly support in your browser at [https://caniuse.com/#feat=wasm](https://caniuse.com/#feat=wasm).
- [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) are used to run Python scripts in non-main threads. You need to use a browser that supports Web Workers. You can check the browser support at [https://caniuse.com/#feat=webworkers](https://caniuse.com/#feat=webworkers).

## Deployment

![next-vercel-illustration](https://user-images.githubusercontent.com/1064036/89702608-860a2900-d908-11ea-83ad-aa228b4322ae.jpg)

[ByQuiz](https://byquiz.com) is built with [Next.js](https://nextjs.org/) and is continuously deployed to [Vercel](https://vercel.com/).
