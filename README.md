# Employee Tracker

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

Manage your company's employee database with ease with the Employee Tracker command-line application.

Tutorial video: https://bootcampspot.instructuremedia.com/embed/1f83df35-506c-4f1b-8d79-9dc5f510944f

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Tests](#tests)
- [License](#license)
- [Questions](#questions)

## Installation

### Step 1: Verify dependencies

Check that package.json lists the dependencies below. Note that newer versions may be available to you.

```
  "dependencies": {
    "chalk": "^5.3.0",
    "dotenv": "^16.4.5",
    "inquirer": "^12.0.1",
    "pg": "^8.13.1"
  },
```

### Step 2: Install modules

In your terminal run the code below. Successful installation is observed with the creation of the `node_modules` directory.

```
npm install
```

### Step 3: Database Installation

Login to the psql terminal

```
psql -U <postgres username>
```

Create the staff_db database

```
\i db/schema.sql
```

Insert dummy data into the staff_db database

```
\i db/seeds.sql
```

## Usage

After installation, build and run the application in your terminal using:

```
npm run build
```

\*Note that your .env file should be located at the root directory from where you are running node.

## Contributing

Contributions to the Employee Tracker project are welcome and encouraged! Please fork the repository, create a new branch for your changes, and open a pull request when ready.

## Tests

## License

Copyright 2024 Mitchell Klein

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Questions

Contact me with any questions!

Github: https://github.com/Mjoel54  
Email: mitchjoelklein@hotmail.com
