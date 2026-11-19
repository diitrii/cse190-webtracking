import { canon, fingerprint } from "./helpers.js";

export async function collect() {
    // TODO: Fill in this function with static features to help you discern
    // different browsers from one another.
    //
    // For each feature you identify, add it to the "out" struct, similarly to
    // the userAgent feature below. Wrap every lookup in try/catch: a property
    // that does not exist in one browser must not crash the whole fingerprint.
    //
    // Your fingerprint must be STATIC and DETERMINISTIC. Collecting anything
    // that changes between runs of the same browser (timings, Math.random,
    // Date.now) will score zero, even though it makes every instance look unique.
    //
    // DO NOT MODIFY the last line in this function (fingerprint(out)); this is
    // necessary to ensure your fingerprints are being properly compared to one
    // another.

    const out = {};
    try { out["userAgent"] = navigator.userAgent; } catch { out["userAgent"] = null; } //fingerprinting userAgent
    try { out["languages"] = navigator.language; } catch { out["languages"] = null; } //fingerprinting multiple languages
    try { out["height"] = screen.height; } catch { out["height"] = null; } //fingerprinting the screen's height
    try { out["width"] = screen.width; } catch { out["width"] = null; } //fingerprint the screen's width
    try { out["geolocation"] = navigator.geolocation; } catch { out["geolocation"] = null; } //check user location
    try { out["orientation"] = screen.orientation; } catch { out["orientation"] = null; } //check user orientation (prolly mobile vs desktop)
    try { out["availHeight"] = screen.availHeight; } catch { out["availHeight"] = null; } //check the height of screen minus user interface features
    try { out["availWidth"] = screen.availWidth; } catch { out["availWidth"] = null; } //check available width of the screen 
    try { out["appVersion"] = navigator.appVersion; } catch { out["appVersion"] = null; } //check verison of browser
    try { out["mimeTypes"] = navigator.mimeTypes; } catch { out["mimeTypes"] = null; } //check mime types
    try { out["mediaCapabilities"] = navigator.mediaCapabilities; } catch { out["mediaCapabilities"] = null; } //check media capabilities
    try { out["pdfViewerEnabled"] = navigator.pdfViewerEnabled; } catch { out["pdfViewerEnabled"] = null; } //check current settings if pdfs can be viewed inline
    try { out["connection"] = navigator.connection; } catch { out["connection"] = null; } //check user connection 
    try { out["hardwareConcurrency"] = navigator.hardwareConcurrency; } catch { out["hardwareConcurrency"] = null; } //check hardware concurrency
    try { out["deviceMemory"] = navigator.deviceMemory; } catch { out["deviceMemory"] = null; } //check device memory

    return fingerprint(out);
}