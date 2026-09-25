# Admin dashboard

Only the email(s) listed in `ADMIN_EMAILS` (in `constants/firebase.ts`) get access.

Currently:
- `tdeillon@gmail.com`

## Required Firestore security rules

For the admin to be able to read the full `/users` collection, and for
"Mon journal" to be backed up online, update your Firestore rules in the
Firebase Console (Build → Firestore Database → Rules):

```
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    // ── Helper : admin recognized by email ──
    function isAdmin() {
      return request.auth != null
        && request.auth.token.email != null
        && request.auth.token.email.lower() == 'tdeillon@gmail.com';
    }

    // ── /users/{uid} ──
    // Chaque utilisateur ne peut lire/écrire que SON propre document.
    // L'admin peut lire toute la collection et supprimer les docs
    // orphelins (laissés par une suppression Auth qui ne cascade pas
    // sur Firestore).
    match /users/{uid} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
      allow read: if isAdmin();
      allow delete: if isAdmin();
    }

    // ── /journals/{uid}/entries/{day} ──
    // "Mon journal" : une réponse par jour. Chaque utilisateur ne lit et
    // n'écrit que SON journal. Volontairement AUCUN accès admin : ce sont
    // des réponses personnelles.
    match /journals/{uid}/entries/{day} {
      allow read, delete: if request.auth != null && request.auth.uid == uid;
      allow create, update: if request.auth != null && request.auth.uid == uid
        && day.matches('^[0-9]{4}-[0-9]{2}-[0-9]{2}$')
        && request.resource.data.keys().hasOnly(['date', 'ts', 'locale', 'question', 'answer', 'updatedAt'])
        && request.resource.data.date == day
        && request.resource.data.answer is string
        && request.resource.data.answer.size() <= 20000;
    }

    // ── /launch_subscribers/{deviceId} ──
    // Legacy (book-launch sign-ups): no longer written by the app since
    // 4.1; kept so the list stays available for the book launch.
    match /launch_subscribers/{deviceId} {
      allow create, update: if request.auth != null;
      allow read, delete: if isAdmin();
    }

    // Tout le reste est refusé par défaut.
  }
}
```

After publishing these rules, the admin dashboard at `/admin` will load.

Until the `journals` rule is published, "Mon journal" keeps working on each
phone (answers are stored locally per account) and the online backup is
retried at every launch: nothing is lost, it just doesn't sync yet.

The old `launch_subscribers` collection (book-launch sign-ups) is no longer
used by the app. It is kept (with its rule) so the list stays available for
the book launch; it can be read from the Firestore console.

## "Mon journal" data

- Stored in `/journals/{uid}/entries/{YYYY-MM-DD}`, separate from `/users`,
  so it never appears in the admin dashboard.
- Deleted by the app when the user deletes their account.
- If you delete a user from the Auth console instead, their journal is left
  behind: delete `/journals/{uid}` (recursive delete) in the Firestore console.

## Engagement signals shown per user

| Signal | Source field | Meaning |
|---|---|---|
| 🕐 quizzes | `quizResults.length` | Number of quizzes completed |
| 👥 profiles | `childProfiles.length` | Saved child profiles |
| 🔎 XP | `dossierProgress.totalXP` | Sherlock Files cumulated XP |
| 📔 fiches | `dossierProgress.unlockedFiches.length` | Suspect files unlocked (out of 45) |
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
