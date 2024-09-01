# Catgram

Instagram for cats

## Prerequisites

1. Install [Node](https://nodejs.org)

2. Install [pnpm](https://pnpm.io/installation)

## Setting Up Your API Key

To use the cat API in this project, you need to set up an API key. Follow these steps:

1. Get a Cat API Key: Visit [https://thecatapi.com](https://thecatapi.com)

2. In the root directory of this project, create a new file named `.env.local`. This file will store your API key.

3. Add Your API Key: Add the following line in the `.env.local` file, replacing `YOUR_API_KEY_HERE` with your actual API key:

```
API_KEY=<YOUR_API_KEY_HERE>
```

For reference, you can look at the `.env.example` file in the project root. It shows the expected format for the `.env.local` file.

## Getting Started

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
