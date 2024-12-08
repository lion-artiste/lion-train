//import type { SOURCE } from "$lib/utils/sources";

import type { Source } from "@prisma/client";

export default class SourcePlayer {
  private audioContext: AudioContext;
  private gainNode: GainNode;
  private currentSourceIndex: number;
  private sourceList: Source[];
  private mediaElementNodes: MediaElementAudioSourceNode[];
  private verbose: boolean;

  constructor(actx: AudioContext, sourceList: Source[] | null = null, verbose = false) {
    this.audioContext = actx;
    this.gainNode = this.audioContext.createGain();
    this.gainNode.gain.setValueAtTime(1.0, this.audioContext.currentTime);
    this.currentSourceIndex = 0;
    this.sourceList = sourceList ?? [];
    this.mediaElementNodes = Array(this.sourceList.length).fill(null);
    this.verbose = verbose;

    this.loadSource();
  }

  /**
   * Creates a new MediaElementAudioSourceNode for the source provided, and connects it to the Gain Node
   * @param source The url of an audio file
   * @returns A MediaElementAudioSourceNode loaded with the source provided
   */
  private createMediaElementNode(source: string): MediaElementAudioSourceNode {
    if (this.verbose) console.log("Creating a new MediaElementNode in createMediaElementNode function, for source : ", source)
    const audio = new Audio(source);
    audio.crossOrigin = "anonymous";
    audio.loop = true;
    const mediaElementNode = this.audioContext.createMediaElementSource(audio);
    mediaElementNode.connect(this.gainNode);
    return mediaElementNode;
  }

  /**
   * Creates a new Audio Element if needed, and adds it to the MediaElementNodesArray
   */
  private loadSource(): void {
    if (this.sourceList.length === 0) return;
    if (this.mediaElementNodes[this.currentSourceIndex] !== null) return;

    const currentSource = this.sourceList[this.currentSourceIndex];
    if (!currentSource.audio) return;
    if (this.verbose) console.log("Loading sourcce in loadSource function : ", currentSource.audio);
    const mediaElementNode = this.createMediaElementNode(currentSource.audio);
    this.mediaElementNodes[this.currentSourceIndex] = mediaElementNode;
  }

  /**
   * Starts playing the source, with a fade in if asked
   * @param fadeDuration duration of the fade in in seconds
   * @returns A Promise of nothing
   */
  async play(fadeDuration: number = 0): Promise<void> {
    if (this.mediaElementNodes.length === 0) return;
    this.loadSource();

    const mediaElementNode = this.mediaElementNodes[this.currentSourceIndex];
    const audio = mediaElementNode.mediaElement as HTMLAudioElement;
    audio.currentTime = 0;
    audio.play();
    //console.log("Node started");
    await this.fadeIn(fadeDuration);
  }

  /**
   * Stops the audio with a fade
   * @param fadeDuration duration of stopping in seconds
   * @returns A Promise of void
   */
  async stop(fadeDuration: number = 0): Promise<void> {
    if (this.mediaElementNodes.length === 0) return;
    await this.fadeOut(fadeDuration);

    const mediaElementNode = this.mediaElementNodes[this.currentSourceIndex];
    const audio = mediaElementNode.mediaElement as HTMLAudioElement;
    audio.pause();
    audio.currentTime = 0;
  }

  /**
   * 
   * @param index the index of the new Source
   * @returns The new Source, or null if the index is the same as before
   */
  private changeSource(index: number): Source | null {

    if (this.currentSourceIndex === index) return null;

    if (index < 0 || index >= this.sourceList.length) {
      throw new Error('Invalid source index');
    }

    this.currentSourceIndex = index;
    return this.sourceList[this.currentSourceIndex];
  }

  changeToRandomSource(): Source | null {
    const randomIndex = Math.floor(Math.random() * this.sourceList.length);
    return this.changeSource(randomIndex);
  }

  async stopAndSwitch(fadeDuration: number = 0): Promise<Source | null> {
    await this.stop(fadeDuration);
    let source = this.changeToRandomSource();
    
    this.loadSource();

    return source;
  }

  getSource(): Source | null {
    if (this.sourceList.length > 0) {
      return this.sourceList[this.currentSourceIndex];
    }
    return null;
  }

  connect(to: AudioNode): AudioNode {
    return this.gainNode.connect(to);
  }

  private fadeOut(duration: number): Promise<void> {
    return new Promise((resolve) => {
      const currentTime = this.audioContext.currentTime;
      this.gainNode.gain.linearRampToValueAtTime(0, currentTime + duration);
      setTimeout(resolve, duration * 1000);
    });
  }
  
  private fadeIn(duration: number): Promise<void> {
    return new Promise((resolve) => {
      const currentTime = this.audioContext.currentTime;
      this.gainNode.gain.linearRampToValueAtTime(1, currentTime + duration);
      setTimeout(resolve, duration * 1000);
    });
  }
}
