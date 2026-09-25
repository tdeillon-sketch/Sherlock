# Admin dashboard

Only the email(s) listed in `ADMIN_EMAILS` (in `constants/firebase.ts`) get access.

Currently:
- `tdeillon@gmail.com`

## Prerequisite: anonymous sign-in

Since 4.1 the app can be used without an account: it starts an anonymous
Firebase session. In the Firebase console, **Authentication > Sign-in method >
Anonymous** must be **enabled** (and "Enable create (sign-up)" left on in
Authentication > Settings). If it is disabled, the app falls back to the
sign-in screen, with a "Continuer sans compte" retry.

Anonymous sessions (one per install) appear in the admin as a separate count
("sessions sans compte"), not in the account lists.

## Prerequisite: Sign in with Apple revocation

Apple requires that deleting an account also revokes Sign in with Apple. The
app always asks for Apple once more before deleting an Apple account, then
sends that sheet's one-time code to Firebase (`accounts:revokeToken`), which
exchanges it with Apple using the key stored in the Firebase console.

State checked on 2026-09-25 (Firebase console > Authentication > Sign-in
method > **Apple**), nothing to do:
- **Services ID** = `com.thomasdeillon.sherlock` (the bundle ID). **Do not
  change it.** The project has no Firebase iOS app (only the web app), so this
  field is what lets the iPhone's Apple tokens in, and it is the client the
  one-time code is issued to. Replacing it with a separate Services ID would
  break every Apple sign-in, and with it the deletion of Apple accounts.
- **OAuth code flow configuration**: Team ID (`6VXK7BJANY`), Key ID and
  private key are filled in.

Only if that key is ever revoked: Apple Developer > Keys > **+**, enable
**Sign in with Apple** with Primary App ID `com.thomasdeillon.sherlock`,
download the `.p8` (only once), then paste the new Key ID and the whole `.p8`
(BEGIN/END lines included) into "OAuth code flow configuration". Leave the
Services ID as it is.

If a revocation fails (no answer within 8 s, key problem), the account and its data are
still deleted, and the app tells the user they can remove 5herlock under Sign
in with Apple in their Apple Account settings. Check on a TestFlight build
(not Expo Go): after deleting an Apple account, 5herlock must be gone from
that list. This admin tool only deletes Firestore documents, and deleting a
user in the Firebase console does not revoke Apple either (no code): only the
in-app deletion does.

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
