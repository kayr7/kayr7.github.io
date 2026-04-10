# Audio Files for WebDemos

This directory contains audio samples and impulse responses used in the WebDemos application.

## Required Audio Files

The Fourier Convolution Demo requires the following files:

### Audio Samples (in `/audio-samples/`)

- `voice.mp3`: A spoken voice recording
- `drums.mp3`: A drum kit recording
- `flute_music.wav`: A flute music recording
- `short-sample.wav`: A short audio sample for quick calculations

### Impulse Responses (in `/impulse-responses/`)

- `small-room.wav`: A small room impulse response
- `concert-hall.wav`: A concert hall impulse response
- `cathedral.wav`: A cathedral impulse response
- `simple-impulse.wav`: A simple impulse response for demonstration

## Creating a Simple Impulse Response

If you don't have a simple impulse response file, you can create one using an audio editor like Audacity:

1. Create a new mono audio file with sample rate of 44.1kHz
2. Add a single impulse (a very short click or spike) at the beginning
3. Add some decay/reverb effect if desired
4. Export as WAV format
5. Name it `simple-impulse.wav` and place in the `impulse-responses` directory

## Note

These audio files are required for the proper functioning of the WebDemos, particularly the Impulse Response Demo and the Fourier Convolution Demo. Without these files, the demos will not work correctly. 