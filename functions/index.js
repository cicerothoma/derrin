const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data, context) => {
  // Get User And Add Custom Claim (Admin)
  return admin
    .auth()
    .getUserByEmail(data)
    .then((user) => {
      return admin.auth().setCustomUserClaims(user.uid, {
        admin: true,
      });
    })
    .then(() => {
      return {
        message: `Success!! ${data} is now an Admin!!`,
      };
    })
    .catch((err) => {
      return err;
    });
});
