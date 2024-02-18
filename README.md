# Coronavirus Analyser

A react tool for coronavirus analysis and other basic functionalities.

## Usage Via Git
1. Fork the repository.
2. Clone the local repository.
3. Install dependencies using `npm i react-scripts`.
4. Run the app in development mode using `npm start`.
5. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Usage Via Docker
1. Identify your system architecture using `uname -m`.
2. If architecture is `x86_64` use `tag-name=amd64`, else if architecture is `arm64` use `tag-name=arm64`.
3. Pull docker image using `docker pull yadavvaibhav/coronavirus-analyser:<tag-name>`
4. Run the docker image using `docker run -it -p 3000:3000 yadavvaibhav/coronavirus-analyser<tag-name>`.
5. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
