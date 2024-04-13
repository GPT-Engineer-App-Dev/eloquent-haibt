# eloquent-haibt

Implement an internal tool for viewing code edit data from a CSV file:

1. Install a CSV parsing library like PapaParse 
2. Add a file input to allow uploading a CSV file
3. When a file is selected, parse the CSV data using the library
4. Filter the parsed data to only include rows where type is "ai_update"
5. Extract the unique project IDs from the filtered data
6. Add a dropdown to select a project ID. Default to the first project ID.
7. When a project ID is selected, filter the data to that project
8. Display the filtered data in a table with these columns:
   - Edit ID
   - Commit SHA
   - GitHub commit link using the format: https://github.com/search?q=commit%3A{COMMIT_SHA}&amp;type=commits
   - Parsed tags.coutput data. Handle parsing errors gracefully.
9. Show a message if no data matches the selected project ID.
10. Add styling to make the tool easy to use and read.

## Collaborate with GPT Engineer

This is a [gptengineer.app](https://gptengineer.app)-synced repository 🌟🤖

Changes made via gptengineer.app will be committed to this repo.

If you clone this repo and push changes, you will have them reflected in the GPT Engineer UI.

## Tech stack

This project is built with REPLACE_WITH_TECH_STACK_SUMMARY.

REPLACE_WITH_TECH_STACK_POINTS

## Setup

```sh
git clone https://github.com/GPT-Engineer-App-Dev/eloquent-haibt.git
cd eloquent-haibt
npm i
```

```sh
npm run dev
```

This will run a dev server with auto reloading and an instant preview.

## Requirements

- Node.js & npm - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
