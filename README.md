# parlaqui.swiss

This is quiz game about swiss parlament politicians.
It started as a fun project to learn about the super fun [svelte framework](https://svelte.dev/).

## Get started

Install the dependencies

```bash
npm install
```

...then start [Rollup](https://rollupjs.org):

```bash
npm run dev
```

Navigate to [localhost:5000](http://localhost:5000). You should see the app running.

## Import data form parlament api
```bash
npm run import
```

## Build a production build
```bash
npm run build
```

## Deploy to production

All pushes to the `master` branch are replicated by a Github Action to the [Liip parlaqui private repository](https://gitlab.liip.ch/liip/parlaqui), which runs a Gitlab CI job to create the Gitlab pages for Parlaqui.swiss (and other domains.
