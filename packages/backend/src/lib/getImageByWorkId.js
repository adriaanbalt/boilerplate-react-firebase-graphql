const admin = require('firebase-admin')
const { FIREBASE_BUCKET_NAME } = require('../constants')
module.exports = (workId) => {
    const storageBucket = admin.storage().bucket(FIREBASE_BUCKET_NAME)
    return admin
        .firestore()
        .collection('images')
        .where('workId', '==', workId)
        .get()
        // https://cloud.google.com/nodejs/docs/reference/storage/1.4.x/File#getSignedUrl
        .then(querySnapshot => storageBucket.file(querySnapshot.docs[0].data().url).getSignedUrl({
            action: "read",
            expires: '03-17-2025'
        }))
        .then((data) => data[0])
        .catch(err => console.log('Error getting document', err))
}