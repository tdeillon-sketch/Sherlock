# Admin dashboard

Only the email(s) listed in `ADMIN_EMAILS` (in `constants/firebase.ts`) get access.

Currently:
- `tdeillon@gmail.com`

## Required Firestore security rules

For the admin to be able to read the full `/users` and `/launch_subscribers`
collections, update your Firestore rules in the Firebase Console
(Build → Firestore Database → Rules):

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Helper: is the caller a recognized admin?
    function isAdmin() {
      return request.auth != null
        && request.auth.token.email != null
        && request.auth.token.email in [
          'tdeillon@gmail.com'
          // add more admin emails here if needed
        ];
    }

    // /users/{uid}
    match /users/{uid} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
      allow read: if isAdmin();
      // Admin can delete orphan docs (left behind after Auth-only deletion)
      allow delete: if isAdmin();
    }

    // /launch_subscribers/{deviceId}
    match /launch_subscribers/{deviceId} {
      // Anyone authenticated (incl. anonymous) can write their own subscription
      allow create, update: if request.auth != null;
      allow read: if isAdmin();
    }
  }
}
```

After publishing these rules, the admin dashboard at `/admin` will load.

## Engagement signals shown per user

| Signal | Source field | Meaning |
|---|---|---|
| 🕐 quizzes | `quizResults.length` | Number of quizzes completed |
| 👥 profiles | `childProfiles.length` | Saved child profiles |
| 🔎 XP | `dossierProgress.totalXP` | Sherlock Files cumulated XP |
| 📔 fiches | `dossierProgress.unlockedFiches.length` | Suspect files unlocked (out of 45) |
| 🔥 streak | `dossierProgress.streak` | Current daily-mission streak (days) |
| 🏅 badges | `badges.length` | Sherlock badges earned |

The **engagement score (0–100)** is a weighted sum of these:

```
score =
  quizCount * 8
  + childProfiles * 12
  + min(sherlockXp / 50, 30)  // capped at 30 pts
  + unlockedFiches * 2
  + badges * 6
```

- **0** = ghost user (opened the app, did nothing measurable)
- **≥ 50** = heavy user
- **100** = fully engaged

Tweak the weights in `computeEngagement()` in `constants/firebase.ts` as you
learn from real data.

## Broadcasting at book launch

When the book is out:

1. In the admin dashboard → **Vue d'ensemble** → tap **"Exporter les push tokens"**
   to share/copy all subscriber Expo push tokens.
2. POST those tokens (in batches of 100) to the Expo push API:
   ```
   POST https://exp.host/--/api/v2/push/send
   Content-Type: application/json

   [
     { "to": "ExponentPushToken[…]", "title": "Le livre est sorti !",
       "body": "« On a tous besoin de quelqu'un d'autre » est disponible.",
       "sound": "default" },
     …
   ]
   ```
3. In parallel, tap **"Exporter les emails 'sortie'"** and send the launch
   email through your usual provider (Mailchimp, etc.)
