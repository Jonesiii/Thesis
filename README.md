# Thesis Work - Comparative Study of Web Front-end Frameworks

This project has a Python back-end made with Flask and front-ends made with Angular, React, Svelte and Vue.

## Back-end Installation

Use the package manager [pip](https://pip.pypa.io/en/stable/) to install Flask.

```bash
cd .\Backend\
pip install Flask
```

Set Environment Variables: Create a .env file in the project directory and set the following environment variables:

```
ORGANIZATION=<your_openai_organization_id>
API_KEY=<your_openai_api_key>
```
Replace <your_openai_organization_id> and <your_openai_api_key> with your actual OpenAI organization ID and API key, respectively.

## Back-end Usage

```bash
cd .\Backend\
python app.py
```

## Front-end Installation
Run the npm install command for every front-end directory. An example for Angular:
```bash
cd .\Frontend\angular-app\
npm install
```

## Front-end Usage
Use these commands to start the front-ends in development mode:

```
cd .\angular-app\
npm start
```
```
cd .\react-app\
npm run start
```
```
cd .\svelte-app\
npm run dev -- --open
```
```
cd .\vue-app\
npm run dev
```

## License

[MIT](https://choosealicense.com/licenses/mit/)