// Simple notification stub. Replace with Twilio / SendGrid integrations.


const notifyEmergencyContact = async ({ user, entry }) => {
console.log('Notify emergency contact for user', user.email, 'entry', entry._id);
// TODO: integrate Twilio or Africa's Talking
};


module.exports = { notifyEmergencyContact };