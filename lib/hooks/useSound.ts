"use client";
import { useCallback, useRef } from "react";
import { useMode } from "@/lib/ModeContext";

// Tone descriptor — frequency (Hz), duration (s), waveform
interface Tone { freq: number; dur: number; type?: OscillatorType; vol?: number }

function playTone(ctx: AudioContext, { freq, dur, type = "square", vol = 0.08 }: Tone) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime);
  gain.gain.setValueAtTime(vol, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + dur);
}

export function useSound() {
  const { soundEnabled } = useMode();
  const ctxRef = useRef<AudioContext | null>(null);

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    if (ctxRef.current.state === "suspended") ctxRef.current.resume();
    return ctxRef.current;
  }, []);

  const play = useCallback((tones: Tone | Tone[]) => {
    if (!soundEnabled) return;
    try {
      const ctx = getCtx();
      const arr = Array.isArray(tones) ? tones : [tones];
      let offset = 0;
      for (const tone of arr) {
        const t = { ...tone };
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = t.type ?? "square";
        osc.frequency.setValueAtTime(t.freq, ctx.currentTime + offset);
        gain.gain.setValueAtTime(t.vol ?? 0.08, ctx.currentTime + offset);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + offset + t.dur);
        osc.start(ctx.currentTime + offset);
        osc.stop(ctx.currentTime + offset + t.dur);
        offset += t.dur;
      }
    } catch {
      // AudioContext blocked — ignore silently
    }
  }, [soundEnabled, getCtx]);

  return {
    // Single blip on button press / menu select
    playClick: useCallback(() => play({ freq: 440, dur: 0.06, type: "square", vol: 0.07 }), [play]),
    // Soft tick for typewriter (called per character batch)
    playTick: useCallback(() => play({ freq: 880, dur: 0.015, type: "square", vol: 0.03 }), [play]),
    // Upward arpeggio for level transition
    playTransition: useCallback(() => play([
      { freq: 220, dur: 0.07, type: "square", vol: 0.06 },
      { freq: 330, dur: 0.07, type: "square", vol: 0.06 },
      { freq: 440, dur: 0.1,  type: "square", vol: 0.07 },
    ]), [play]),
    // Confirm / start sound
    playConfirm: useCallback(() => play([
      { freq: 523, dur: 0.08, type: "square", vol: 0.07 },
      { freq: 659, dur: 0.12, type: "square", vol: 0.08 },
    ]), [play]),
  };
}
