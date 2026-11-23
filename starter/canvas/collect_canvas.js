// CSE 190 -- Canvas Fingerprinting
//
// Place your implementation in the three functions below. 
// Do not rename the functions and do not change `collect()`.

import { hash, canon, FONTS } from "./helpers.js";

function textCanvasFingerprint() {
    // TODO: Implement a basic, text-based canvas fingerprint.
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.font = "18pt Arial";
    ctx.textBaseline = "top";
    ctx.fillText("Sphinx of black quartz, judge my vow. ", 2, 2);
    const fp = canvas.toDataURL();
    return hash(fp);
}

function detectInstalledFonts() {
    // TODO: Implement a mechanism to identify which of the fonts in FONTS are
    // installed (see helpers.js)
    const inferredFonts = [];
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const testString = 'mmmmmmmmmmlli';
    const testSize = '72px';
    const generics = ['monospace', 'serif', 'sans-serif'];

    const baseWidths = {};
    for (let i = 0; i < generics.length; i++) {
        const g = generics[i];
        ctx.font = `${testSize} ${g}`;
        baseWidths[g] = ctx.measureText(testString).width;
    }

    for (let i = 0; i < FONTS.length; i++) {
        const font = FONTS[i];
        for (let j = 0; j < generics.length; j++) {
            const g = generics[j];
            ctx.font = `${testSize} '${font}', ${g}`;
            if (ctx.measureText(testString).width !== baseWidths[g]) {
                inferredFonts.push(font);
                break;
            }
        }
    }

    return inferredFonts;
}

function graphicalCanvasFingerprint() {
    // TODO: Text-based canvas fingerprinting no longer works, so use the
    // canvas in a different way to build a browser fingerprint.
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    //background with gradient
    const grad = ctx.createLinearGradient(0, 0, 200, 100);
    grad.addColorStop(0, '#f60');
    grad.addColorStop(1, '#06f');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 200, 100);
    //translucent overlapping circles
    ctx.fillStyle = 'rgba(255, 0, 255, 0.6)';
    ctx.beginPath();
    ctx.arc(70, 50, 40, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'rgba(0, 255, 255, 0.6)';
    ctx.beginPath();
    ctx.arc(130, 50, 40, 0, Math.PI * 2);
    ctx.fill();
    //curve (anti-aliasing stroke)
    ctx.strokeStyle = 'rgba(0, 128, 0, 0.8)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(10, 90);
    ctx.bezierCurveTo(60, 0, 140, 100, 190, 10);
    ctx.stroke();
    const fp = canvas.toDataURL();
    return hash(fp);
}

// ---------------------------------------------------------------------------
// DO NOT EDIT BELOW THIS LINE! 
// ---------------------------------------------------------------------------

export async function collect() {
    const out = {};
    try { out["part_one"] = textCanvasFingerprint(); } catch { out["part_one"] = null; }
    try { out["part_two"] = detectInstalledFonts(); } catch { out["part_two"] = null; }
    try { out["part_three"] = graphicalCanvasFingerprint(); } catch { out["part_three"] = null; }
    return out;
}
