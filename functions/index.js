const { onCall, HttpsError } = require('firebase-functions/v2/https');
const admin = require('firebase-admin');

admin.initializeApp();

const PRO_LAUNCH_AT = new Date('2026-04-01T00:00:00+02:00').getTime();
const PREMIUM_LAUNCH_AT = new Date('2026-06-01T00:00:00+02:00').getTime();

exports.requestProActivation = onCall({ region: 'europe-west3' }, async (request) => {
  if (!request.auth || !request.auth.uid) {
    throw new HttpsError('unauthenticated', 'Bitte zuerst einloggen.');
  }

  if (Date.now() < PRO_LAUNCH_AT) {
    throw new HttpsError('failed-precondition', 'Calculo Pro startet am 01.04.2026.');
  }

  const uid = request.auth.uid;
  const userRef = admin.firestore().collection('users').doc(uid);

  await userRef.set(
    {
      proEnabled: true,
      proEnabledAt: admin.firestore.FieldValue.serverTimestamp(),
      proSource: 'callable-requestProActivation'
    },
    { merge: true }
  );

  return {
    allowed: true,
    message: 'Pro wurde serverseitig freigeschaltet.'
  };
});

exports.requestPremiumActivation = onCall({ region: 'europe-west3' }, async (request) => {
  if (!request.auth || !request.auth.uid) {
    throw new HttpsError('unauthenticated', 'Bitte zuerst einloggen.');
  }

  if (Date.now() < PREMIUM_LAUNCH_AT) {
    throw new HttpsError('failed-precondition', 'Calculo Premium startet am 01.06.2026.');
  }

  const uid = request.auth.uid;
  const userRef = admin.firestore().collection('users').doc(uid);

  await userRef.set(
    {
      premiumEnabled: true,
      premiumEnabledAt: admin.firestore.FieldValue.serverTimestamp(),
      premiumSource: 'callable-requestPremiumActivation',
      proEnabled: true,
      proEnabledAt: admin.firestore.FieldValue.serverTimestamp(),
      proSource: 'premium-includes-pro'
    },
    { merge: true }
  );

  return {
    allowed: true,
    message: 'Premium wurde serverseitig freigeschaltet.'
  };
});
