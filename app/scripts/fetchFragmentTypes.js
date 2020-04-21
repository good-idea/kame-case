const fetch = require('node-fetch')
const fs = require('fs')
const path = require('path')

fetch(`http://localhost:8080/.netlify/functions/graphql/`, {
	method: 'POST',
	headers: { 'Content-Type': 'application/json' },
	body: JSON.stringify({
		variables: {},
		query: `
      {
        __schema {
          types {
            kind
            name
            possibleTypes {
              name
            }
          }
        }
      }
    `,
	}),
})
	.then((result) => result.json())
	.then((result) => {
		// here we're filtering out any type information unrelated to unions or interfaces
		const filteredData = result.data.__schema.types.filter((type) => type.possibleTypes !== null)
		result.data.__schema.types = filteredData
		fs.writeFile(path.resolve(__dirname, '..', 'src', 'services', 'fragmentTypes.json'), JSON.stringify(result.data), (err) => {
			if (err) {
				console.error('Error writing fragmentTypes file', err)
			} else {
				console.log('Fragment types successfully extracted!')
			}
		})
	})
