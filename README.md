# Skylroom — a live soundscape studio

Ambient soundscapes generated **live in the browser** with the Web Audio API.
No audio files, no loops — rain, waves, fire, wind, birdsong, thunder, a stream,
a singing bowl and wind chimes are all synthesized from raw waveforms.

This is a plain static site: **HTML + CSS + JavaScript**, no build step, no server.
Just upload the files. Accounts and ads are optional and off until you add keys.

---

## What's in this folder

| File | What it is |
|------|------------|
| `index.html` | The page |
| `style.css` | All styling + the 6 colour themes |
| `script.js` | The audio engine, themes, auth and saved-mixes logic |
| `config.js` | **The only file you edit** — your Supabase & AdSense keys |
| `.htaccess` | Security headers + HTTPS redirect (for GoDaddy/Apache) |
| `supabase-schema.sql` | Run once in Supabase to create the database tables |
| `assets/favicon.svg` | Site icon |
| `README.md` | This file |

You can deploy **right now** with none of the setup below — the soundscape studio,
themes, focus timer and on-device saving all work out of the box. Do the Supabase
and AdSense steps only when you want accounts and ads.

---

## 1. Deploy to GoDaddy

These steps assume **GoDaddy Web Hosting** (cPanel). If you only bought a domain,
you'll need a hosting plan too (or point the domain at any static host).

1. Log in to GoDaddy → **My Products** → your Web Hosting → **cPanel Admin**.
2. Open **File Manager** → go into the `public_html` folder.
3. Upload `index.html`, `style.css`, `script.js`, `config.js`, `.htaccess`,
   and the `assets` folder.
   - `.htaccess` starts with a dot and may be hidden. In File Manager click
     **Settings** (top-right) → tick **Show Hidden Files (dotfiles)**.
4. Visit your domain. Done.
5. **SSL / HTTPS:** in GoDaddy, make sure SSL is active for the domain
   (GoDaddy hosting includes a free certificate). The `.htaccess` will then
   force every visitor onto `https://`.

> Tip: to update the site later, just re-upload the changed file(s).

---

## 2. Accounts + cloud-saved mixes (Supabase)

Free tier is plenty. Takes about 5 minutes.

### 2a. Create the project
1. Go to <https://supabase.com> → **New project**. Pick a name and a region.
2. When it's ready, open **Project Settings → API** and copy:
   - **Project URL** (e.g. `https://abcd1234.supabase.co`)
   - **anon public** key
3. Paste both into **`config.js`**:
   ```js
   SUPABASE_URL:      "https://abcd1234.supabase.co",
   SUPABASE_ANON_KEY: "eyJhbGciOi...your-anon-key...",
   ```
   The anon key is **meant to be public** — it's safe in front-end code. Your data
   is protected by Row Level Security (below), which the schema turns on.

### 2b. Create the tables
1. In Supabase open **SQL Editor → New query**.
2. Paste the entire contents of `supabase-schema.sql` and press **Run**.
   This creates a `mixes` table and a `profiles` table, and locks them down so
   each person can only ever read or change **their own** rows.

### 2c. Turn on "Login with Google"
1. In Supabase: **Authentication → Providers → Google → Enable**.
2. You'll need a Google OAuth client:
   - Go to <https://console.cloud.google.com> → **APIs & Services → Credentials**.
   - **Create Credentials → OAuth client ID → Web application**.
   - Under **Authorized redirect URIs** add the callback Supabase shows you on the
     provider screen — it looks like
     `https://abcd1234.supabase.co/auth/v1/callback`.
   - Copy the generated **Client ID** and **Client secret** back into the Supabase
     Google provider screen and **Save**.
3. In Supabase **Authentication → URL Configuration**, set **Site URL** to your
   live domain (e.g. `https://yourdomain.com`) and add it to **Redirect URLs**.
4. Email/password sign-up also works immediately. By default Supabase sends a
   confirmation email; you can toggle that under **Authentication → Providers → Email**.

That's it — the **Sign in** button now opens the account panel, and saved mixes
sync to the logged-in user across devices. Signed-out visitors still save to their
own device.

---

## 3. Google Ads (AdSense)

You need your own approved AdSense account — Google reviews every site.

1. Sign up / sign in at <https://adsense.google.com> and add your domain.
2. Once approved, go to **Ads → By ad unit → Display ads**, create a unit, and copy:
   - your **publisher ID** — looks like `ca-pub-1234567890123456`
   - the **ad slot ID** — a number like `1234567890`
3. Paste them into `config.js`:
   ```js
   ADSENSE_CLIENT: "ca-pub-1234567890123456",
   ADSENSE_SLOT:   "1234567890"
   ```
4. Re-upload `config.js`. A responsive ad appears near the bottom of the page.
   Until then the ad area stays hidden, so the page looks clean during review.

The AdSense domains are already allow-listed in the `.htaccess` security policy.

---

## 4. The sounds (all synthesized)

12 layers, each built from oscillators and filtered noise:

Rain · Waves · Wind · Fire · Forest (birdsong) · Crickets · Drone ·
**Thunder** · **Stream** · **Singing bowl** · **Wind chimes** · Brown noise

Keyboard: `Space` play/pause · `1`–`9` toggle the first nine sounds · `S` save.

---

## 5. Themes

Six colour themes ship in the switcher (top-right): **Midnight, Ember, Verdant,
Ice, Rosé,** and a light **Daybreak**. The choice is remembered per device.
Add your own by copying a `[data-theme="…"]` block in `style.css` and adding an
entry to the `THEMES` array in `script.js`.

---

## Notes

- Everything is static — no Node, no build, no database server to run yourself.
- If you change your Supabase project, update the domain in the `.htaccess`
  CSP only if you tightened it from the wildcard `*.supabase.co`.
- Private/incognito windows may block on-device saving; that's expected.

---

## What's new in v2 (Skylroom)

**New files to upload alongside the originals:**
`manifest.json`, `sw.js`, `robots.txt`, `sitemap.xml`, and the new images in `assets/`
(`icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `apple-touch-icon.png`).

### SEO
`index.html` now ships a full set of tags (title, description, keywords, Open Graph,
Twitter card, and JSON-LD structured data) aimed at people searching for meditation,
sleep, yoga, focus and relaxation sounds. **One thing to do after you pick a domain:**
find-and-replace `https://your-domain.com` with your real domain in three places —
`index.html` (the canonical/OG/Twitter/JSON-LD URLs), `robots.txt`, and `sitemap.xml`.
Then, in Google Search Console, add your site and submit `sitemap.xml` so Google indexes it.

### Installable app (PWA)
With `manifest.json` and `sw.js` in place and the site served over HTTPS, visitors get an
**Install** button (and "Add to Home Screen" on phones). Installed users come back more
often — good for ad revenue. The service worker is network-first, so your edits always
show; if you ever want to disable it, delete `sw.js` and remove the small `initPWA()` call.

### Timers
- **Focus timer** now has a **custom minutes** box in addition to 15/25/45.
- **Sleep timer** is new: it counts down, then gently **fades the sound out and pauses** —
  ideal for falling asleep. Presets 20/30/60 plus a custom box.

### Ads
The single responsive ad unit is unchanged. Once you're approved, the easiest way to
monetize is **AdSense Auto ads**: turn them on in your AdSense dashboard and Google places
ads automatically — the script is already loaded when your `ca-pub-` id is set in `config.js`.
Keep ad density reasonable so you stay within AdSense policy.
