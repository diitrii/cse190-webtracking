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

    // basic navigator, screen, cookie, and memory features
    try { out["userAgent"] = navigator.userAgent; } catch { out["userAgent"] = null; }
    try { out["languages"] = navigator.languages; } catch { out["languages"] = null; }
    try { out["height"] = screen.height; } catch { out["height"] = null; }
    try { out["width"] = screen.width; } catch { out["width"] = null; }
    try { out["geolocation"] = "geolocation" in navigator; } catch { out["geolocation"] = null; }
    try { out["availHeight"] = screen.availHeight; } catch { out["availHeight"] = null; }
    try { out["availWidth"] = screen.availWidth; } catch { out["availWidth"] = null; }
    try { out["appVersion"] = navigator.appVersion; } catch { out["appVersion"] = null; }
    try { out["mediaCapabilities"] = "mediaCapabilities" in navigator; } catch { out["mediaCapabilities"] = null; }
    try { out["pdfViewerEnabled"] = navigator.pdfViewerEnabled; } catch { out["pdfViewerEnabled"] = null; }
    try { out["connection"] = "connection" in navigator; } catch { out["connection"] = null; }
    try { out["hardwareConcurrency"] = navigator.hardwareConcurrency; } catch { out["hardwareConcurrency"] = null; }
    try { out["deviceMemory"] = navigator.deviceMemory; } catch { out["deviceMemory"] = null; }
    try { out["clipboard"] = "clipboard" in navigator; } catch { out["clipboard"] = null; }
    try { out["cookieEnabled"] = navigator.cookieEnabled; } catch { out["cookieEnabled"] = null; }

    // userAgentData (Chromium only): "absent" = API missing, "error" = call failed
    try {
        out["uadHigh"] = navigator.userAgentData
            ? await navigator.userAgentData.getHighEntropyValues(
                ["fullVersionList", "platformVersion", "architecture", "bitness", "model"])
            : "absent";
    } catch {
        out["uadHigh"] = "error";
    }

    // identity strings
    try { out["vendor"] = navigator.vendor; } catch { out["vendor"] = null; }
    try { out["productSub"] = navigator.productSub; } catch { out["productSub"] = null; }
    try { out["vendorSub"] = navigator.vendorSub; } catch { out["vendorSub"] = null; }
    try { out["appName"] = navigator.appName; } catch { out["appName"] = null; }
    try { out["appCodeName"] = navigator.appCodeName; } catch { out["appCodeName"] = null; }
    try { out["platform"] = navigator.platform; } catch { out["platform"] = null; }

    // vendor properties
    try { out["hasOpr"] = "opr" in window; } catch { out["hasOpr"] = null; }
    try { out["hasBrave"] = "brave" in navigator; } catch { out["hasBrave"] = null; }
    try { out["hasOscpu"] = "oscpu" in navigator; } catch { out["hasOscpu"] = null; }
    try { out["hasBuildID"] = "buildID" in navigator; } catch { out["hasBuildID"] = null; }
    try { out["hasApplePay"] = "ApplePaySession" in window; } catch { out["hasApplePay"] = null; }
    try { out["hasSafari"] = "safari" in window; } catch { out["hasSafari"] = null; }

    // instance checks from navigator
    try { out["navBluetooth"] = "bluetooth" in navigator; } catch { out["navBluetooth"] = null; }
    try { out["navSerial"] = "serial" in navigator; } catch { out["navSerial"] = null; }
    try { out["navUsb"] = "usb" in navigator; } catch { out["navUsb"] = null; }
    try { out["navHid"] = "hid" in navigator; } catch { out["navHid"] = null; }
    try { out["navGpu"] = "gpu" in navigator; } catch { out["navGpu"] = null; }

    // class checks in window
    try { out["winBluetooth"] = "Bluetooth" in window; } catch { out["winBluetooth"] = null; }
    try { out["winSerial"] = "Serial" in window; } catch { out["winSerial"] = null; }
    try { out["winEyeDropper"] = "EyeDropper" in window; } catch { out["winEyeDropper"] = null; }
    try { out["winCookieStore"] = "CookieStore" in window; } catch { out["winCookieStore"] = null; }

    // prototype checks
    try { out["navProto"] = Object.getOwnPropertyNames(Navigator.prototype); } catch { out["navProto"] = "error"; }
    try { out["screenProto"] = Object.getOwnPropertyNames(Screen.prototype); } catch { out["screenProto"] = "error"; }
    try { out["docProto"] = Object.getOwnPropertyNames(Document.prototype); } catch { out["docProto"] = "error"; }
    try { out["htmlProto"] = Object.getOwnPropertyNames(HTMLElement.prototype); } catch { out["htmlProto"] = "error"; }
    try { out["elementProto"] = Object.getOwnPropertyNames(Element.prototype); } catch { out["elementProto"] = "error"; }
    try { out["windowProto"] = Object.getOwnPropertyNames(Window.prototype); } catch { out["windowProto"] = "error"; }
    try { out["cssProto"] = Object.getOwnPropertyNames(CSSStyleDeclaration.prototype); } catch { out["cssProto"] = "error"; }
    try { out["mediaProto"] = Object.getOwnPropertyNames(HTMLMediaElement.prototype); } catch { out["mediaProto"] = "error"; }

    // navigator driver and properties
    try { out["webdriver"] = navigator.webdriver; } catch { out["webdriver"] = null; }
    try { out["pluginNames"] = Array.from(navigator.plugins).map(p => p.name); } catch { out["pluginNames"] = null; }
    try { out["mimeTypeList"] = Array.from(navigator.mimeTypes).map(m => m.type); } catch { out["mimeTypeList"] = null; }
    try { out["chromeKeys"] = window.chrome ? Object.getOwnPropertyNames(window.chrome) : "absent"; } catch { out["chromeKeys"] = "error"; }
    try { out["orientationType"] = screen.orientation ? screen.orientation.type : "absent"; } catch { out["orientationType"] = "error"; }

    // device feature checks

    try { out["maxTouchPoints"] = navigator.maxTouchPoints; } catch { out["maxTouchPoints"] = null; }
    try { out["hasTouchStart"] = "ontouchstart" in window; } catch { out["hasTouchStart"] = null; }
    try { out["mqPointerCoarse"] = window.matchMedia("(pointer: coarse)").matches; } catch { out["mqPointerCoarse"] = null; }
    try { out["mqHoverHover"] = window.matchMedia("(hover: hover)").matches; } catch { out["mqHoverHover"] = null; }
    try { out["mqDark"] = window.matchMedia("(prefers-color-scheme: dark)").matches; } catch { out["mqDark"] = null; }
    try { out["mqReducedMotion"] = window.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch { out["mqReducedMotion"] = null; }

    // display feature check
    try { out["colorDepth"] = screen.colorDepth; } catch { out["colorDepth"] = null; }
    try { out["pixelDepth"] = screen.pixelDepth; } catch { out["pixelDepth"] = null; }
    try { out["devicePixelRatio"] = window.devicePixelRatio; } catch { out["devicePixelRatio"] = null; }

    // media codec check
    try {
        const codecs = [
            'video/mp4; codecs="avc1.42E01E"', 'video/mp4; codecs="hev1.1.6.L93.B0"',
            'video/mp4; codecs="av01.0.05M.08"', 'video/webm; codecs="vp8"',
            'video/webm; codecs="vp9"', 'video/ogg; codecs="theora"',
            'audio/mpeg', 'audio/mp4; codecs="mp4a.40.2"', 'audio/ogg; codecs="vorbis"',
            'audio/ogg; codecs="opus"', 'audio/webm; codecs="opus"', 'audio/wav',
            'audio/flac', 'audio/aac', 'application/vnd.apple.mpegurl'
        ];
        const v = document.createElement("video");
        out["canPlay"] = codecs.map(c => v.canPlayType(c));
    } catch { out["canPlay"] = "error"; }

    // js and css feature checks

    try {
        out["cssSupports"] = [
            "selector(:has(a))", "container-type: inline-size",
            "color: color-mix(in srgb, red, blue)", "text-wrap: balance",
            "anchor-name: --a", "field-sizing: content", "animation-timeline: scroll()",
            "color: oklch(0.5 0.2 200)", "grid-template-columns: subgrid",
            "view-transition-name: a", "backdrop-filter: blur(1px)",
            "aspect-ratio: 1 / 1", "-webkit-appearance: none", "-moz-appearance: none"
        ].map(t => CSS.supports(t));
    } catch { out["cssSupports"] = "error"; }

    try {
        out["jsProbes"] = [
            typeof Object.groupBy, typeof Array.fromAsync, typeof Promise.withResolvers,
            typeof Set.prototype.union, typeof Iterator, typeof Temporal,
            typeof Array.prototype.toSorted, typeof structuredClone, typeof Intl.Segmenter,
            typeof Array.prototype.at, typeof String.prototype.isWellFormed
        ];
    } catch { out["jsProbes"] = "error"; }

    // webgl feature check
    try {
        const gl = document.createElement("canvas").getContext("webgl");
        if (!gl) {
            out["gl"] = "absent";
        } else {
            out["gl"] = {
                version: gl.getParameter(gl.VERSION),
                shading: gl.getParameter(gl.SHADING_LANGUAGE_VERSION),
                vendor: gl.getParameter(gl.VENDOR),
                renderer: gl.getParameter(gl.RENDERER),
                extensions: gl.getSupportedExtensions(),
                limits: ["MAX_TEXTURE_SIZE", "MAX_VERTEX_ATTRIBS", "MAX_VERTEX_UNIFORM_VECTORS",
                    "MAX_VARYING_VECTORS", "MAX_COMBINED_TEXTURE_IMAGE_UNITS", "MAX_RENDERBUFFER_SIZE"
                ].map(n => gl.getParameter(gl[n])),
                viewport: Array.from(gl.getParameter(gl.MAX_VIEWPORT_DIMS)),
                lineWidth: Array.from(gl.getParameter(gl.ALIASED_LINE_WIDTH_RANGE))
            };
            const dbg = gl.getExtension("WEBGL_debug_renderer_info");
            out["glUnmasked"] = dbg
                ? [gl.getParameter(dbg.UNMASKED_VENDOR_WEBGL), gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL)]
                : "absent";
        }
    } catch { out["gl"] = "error"; }

    // more media queries
    try {
        out["mqExtra"] = [
            "(any-pointer: fine)", "(any-pointer: coarse)", "(any-hover: hover)", "(color-gamut: p3)",
            "(color-gamut: rec2020)", "(dynamic-range: high)", "(forced-colors: active)",
            "(inverted-colors: inverted)", "(prefers-contrast: more)", "(prefers-contrast: less)",
            "(prefers-reduced-data: reduce)", "(prefers-reduced-transparency: reduce)",
            "(display-mode: standalone)", "(display-mode: fullscreen)", "(scripting: enabled)",
            "(update: fast)", "(monochrome)", "(resolution: 2dppx)"
        ].map(q => window.matchMedia(q).matches);
    } catch { out["mqExtra"] = "error"; }

    // intl settings
    try { out["intlDate"] = Intl.DateTimeFormat().resolvedOptions(); } catch { out["intlDate"] = "error"; }
    try { out["intlNumber"] = Intl.NumberFormat().resolvedOptions(); } catch { out["intlNumber"] = "error"; }
    try {
        out["intlSamples"] = [
            (1234567.891).toLocaleString(), new Date(86400000 * 400).toLocaleString(),
            new Intl.RelativeTimeFormat().format(-1, "day"), new Intl.ListFormat().format(["a", "b", "c"])
        ];
    } catch { out["intlSamples"] = "error"; }

    // check for scrollbars
    try {
        const d = document.createElement("div");
        d.style.cssText = "width:100px;height:100px;overflow:scroll;position:absolute;left:-9999px";
        document.documentElement.appendChild(d);
        out["scrollbarWidth"] = d.offsetWidth - d.clientWidth;
        d.remove();
    } catch { out["scrollbarWidth"] = "error"; }

    // check for fonts and colors
    try {
        out["bodyStyle"] = [getComputedStyle(document.body).fontFamily, getComputedStyle(document.body).fontSize];
    } catch { out["bodyStyle"] = "error"; }
    try {
        out["defaultStyles"] = ["pre", "code", "button", "input", "h1", "a"].map(t => {
            const el = document.createElement(t);
            document.documentElement.appendChild(el);
            const cs = getComputedStyle(el);
            const r = [cs.fontFamily, cs.fontSize, cs.color];
            el.remove();
            return r;
        });
    } catch { out["defaultStyles"] = "error"; }

    // document and history properties
    try {
        out["docProps"] = [
            document.characterSet, document.contentType, document.compatMode, document.designMode,
            history.scrollRestoration, screen.orientation ? screen.orientation.angle : "absent"
        ].map(String);
    } catch { out["docProps"] = "error"; }

    // engine error wording and native-function text
    try {
        const errs = [
            () => null.x, () => undefined(), () => JSON.parse("{"), () => new Array(-1),
            () => { "use strict"; undeclaredVariableForFingerprint = 1; },
            () => decodeURIComponent("%"), () => (1).toFixed(101), () => BigInt(1.5),
            () => new Intl.DateTimeFormat("xx-invalid-locale-zzzzzzzzzz")
        ];
        out["errors"] = errs.map(f => {
            try { f(); return "none"; } catch (e) { return e.name + ": " + e.message; }
        });
    } catch { out["errors"] = "error"; }
    try { out["errorProps"] = ["captureStackTrace", "stackTraceLimit", "prepareStackTrace"].map(k => k in Error); } catch { out["errorProps"] = "error"; }
    try {
        out["nativeStr"] = [
            String(Math.max),
            String(Object.getOwnPropertyDescriptor(Navigator.prototype, "userAgent").get)
        ];
    } catch { out["nativeStr"] = "error"; }

    // check for window properties
    try { out["windowKeys"] = Object.getOwnPropertyNames(window); } catch { out["windowKeys"] = "error"; }

    return fingerprint(out);
}
