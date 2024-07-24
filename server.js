import { concurrently } from 'concurrently';
import fs from 'fs';
// commands list
const commands = [
    {
        name: 'UI',
        command: 'yarn dev'
    },
    {
        name: 'JSON Server',
        command: 'json-server db.json --port 5001'
    }
];

if (!fs.existsSync('db.json')) {
    fs.writeFileSync('db.json', JSON.stringify({ freelancer: [], jobs: [], companies: [], appliedJobs: [] }));
}

const main = async () => {
    await concurrently(commands);
}

// call main
main();