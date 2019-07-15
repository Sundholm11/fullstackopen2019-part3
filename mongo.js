const mongoose = require('mongoose')

if ( process.argv.length < 3 ) {
	console.log('Give password as an argument')
	process.exit(1)
}
if ( process.argv.length === 4) {
	console.log('Give either 3 arguments to retrieve data or 5 arguments to add data')
	process.exit(1)
}
if ( process.argv.length > 5 ) {
	console.log('Give maximum of 5 arguments')
	process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://Sundholm:${password}@cluster0-cok3q.mongodb.net/Phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true })

const personSchema = new mongoose.Schema({
	name: String,
	number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 5) {
	const person = new Person({
		name: process.argv[3],
		number: process.argv[4],
	})

	person.save().then(() => {
		console.log(`Added ${person.name} number ${person.number} to phonebook`)
		mongoose.connection.close()
	})
}

if (process.argv.length === 3) {
	Person.find({}).then(result => {
		console.log('Phonebook:')
		result.forEach(person => {
			console.log(`${person.name} ${person.number}`)
		})
		mongoose.connection.close()
	})
}