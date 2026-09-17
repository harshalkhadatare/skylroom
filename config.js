/* =========================================================
   Skylroom — configuration
   ---------------------------------------------------------
   This is the ONLY file you need to edit to turn on accounts
   and ads. Fill in your own keys, then redeploy.

   • Supabase  → https://supabase.com  (free tier is plenty)
   • AdSense   → https://adsense.google.com

   Leaving a value as its placeholder simply keeps that
   feature switched off — the soundscape studio still works.
   ========================================================= */

window.DRIFT_CONFIG = {
  /* ---- Supabase (accounts + cloud-saved mixes) ---- */
  // From: Supabase dashboard → Project Settings → API
  SUPABASE_URL:      "YOUR_SUPABASE_URL",        // e.g. https://abcd1234.supabase.co
  SUPABASE_ANON_KEY: "YOUR_SUPABASE_ANON_KEY",   // the public "anon" key (safe to expose)

  /* ---- Google AdSense ---- */
  // From: AdSense → Ads → By ad unit (create a Display unit)
  ADSENSE_CLIENT: "",   // e.g. "ca-pub-1234567890123456"
  ADSENSE_SLOT:   ""    // e.g. "1234567890"
};

/* Helpers — do not edit below. */
window.DRIFT_CONFIG.supabaseReady = (function () {
  var c = window.DRIFT_CONFIG;
  return !!c.SUPABASE_URL && c.SUPABASE_URL.indexOf("http") === 0 &&
         !!c.SUPABASE_ANON_KEY && c.SUPABASE_ANON_KEY !== "YOUR_SUPABASE_ANON_KEY";
})();
window.DRIFT_CONFIG.adsReady = (function () {
  var c = window.DRIFT_CONFIG;
  return !!c.ADSENSE_CLIENT && c.ADSENSE_CLIENT.indexOf("ca-pub-") === 0 && !!c.ADSENSE_SLOT;
})();
