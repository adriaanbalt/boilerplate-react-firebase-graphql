const { ApolloError, ValidationError } = require('apollo-server-express')

const admin = require('firebase-admin')
const objectAssignDeep = require('object-assign-deep')
module.exports = (workId) => {
    return admin
        .firestore()
        .collection('work')
        .doc(workId)
        .get()
        .then(doc => {
            if (doc.exists) {
                return (objectAssignDeep({}, { id: doc.id }, doc.data()))
            }
            else {
                const error = new ValidationError('[work] Document does not exist')
                console.error(error)
                return null
            }
        })
        .catch(err => console.log('Error getting document', err))
}