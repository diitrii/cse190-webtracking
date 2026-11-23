// CSE 190 -- Audio Fingerprinting
//
// Place your implementation in the three functions below.
// Do not rename the functions and do not change `collect()`.

async function audioSum() {
  const ctx = new OfflineAudioContext(1, 5000, 44100);

  // sine wave at ~C5
  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.value = 528;

  const comp = ctx.createDynamicsCompressor();
  comp.threshold.value = -50;
  comp.knee.value = 40;
  comp.ratio.value = 12;
  comp.attack.value = 0;
  comp.release.value = 0.2;

  osc.connect(comp);
  comp.connect(ctx.destination);
  osc.start();

  const buffer = await ctx.startRendering();
  const samples = buffer.getChannelData(0);

  let hash = 0;
  for (let i = 0; i < samples.length; ++i) {
    hash += Math.abs(samples[i]);
  }
  return hash;
}

async function audioSumWithSimpleFarbling() {
  // TODO: Implement an audio sum fingerprint in the presence of simple farbling.
  const ctx = new OfflineAudioContext(1, 5000, 44100);

  // sine wave at ~C5
  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.value = 528;

  const comp = ctx.createDynamicsCompressor();
  comp.threshold.value = -50;
  comp.knee.value = 40;
  comp.ratio.value = 12;
  comp.attack.value = 0;
  comp.release.value = 0.2;

  osc.connect(comp);
  comp.connect(ctx.destination);
  osc.start();

  const buffer = await ctx.startRendering();

  const N = 500;
  let total = 0;
  for (let run = 0; run < N; ++run) {
    const samples = buffer.getChannelData(0);
    let sum = 0;
    for (let i = 0; i < samples.length; ++i) {
      sum += Math.abs(samples[i]);
    }
    total += sum;
  }
  const avg = total / N;
  const hash = Number(avg.toFixed(4));
  return hash;
}

// EXTRA CREDIT (optional). Leave this as-is if you don't do the extra credit. 
async function audioSumWithComplexFarbling() {
  // TODO: Implement an audio sum fingerprint in the presence of complex farbling.
}


// DO NOT MODIFY collect(). The grader calls it and reads exactly these keys.
export async function collect() {
  const out = {};
  try { out["audio_sum"] = await audioSum(); } catch { out["audio_sum"] = null; }
  try { out["audio_sum_simple_farbled"] = await audioSumWithSimpleFarbling(); } catch { out["audio_sum_simple_farbled"] = null; }
  try { out["audio_sum_complex_farbled"] = await audioSumWithComplexFarbling(); } catch { out["audio_sum_complex_farbled"] = null; }
  return out;
}
