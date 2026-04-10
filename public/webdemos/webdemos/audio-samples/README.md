# Audio Samples for Speech Preprocessing Demo

This directory needs the following audio files for the Speech Preprocessing Demo to work properly:

## Required Files for Speech Preprocessing Demo

- `speech_male.wav` - A clear recording of male speech, 16kHz mono
- `speech_female.wav` - A clear recording of female speech, 16kHz mono
- `speech_child.wav` - A clear recording of child speech, 16kHz mono
- `vowel.wav` - A sustained vowel sound, 16kHz mono

## How to Obtain These Files

You can obtain suitable audio files in several ways:

1. **Use existing datasets**: Resources like the TIMIT corpus, VoxCeleb, or LibriSpeech contain 
   high-quality speech recordings.

2. **Record your own**: Use a high-quality microphone to record these samples.

3. **Generate synthetic samples**: Using text-to-speech systems to generate clean examples.

## Audio Specifications

For best results, the audio files should:
- Be mono channel (single channel)
- Have a 16kHz sample rate (or will be resampled)
- Be in WAV format
- Contain clean speech with minimal background noise
- Be 2-5 seconds in length

## Note on Resampling

The demo includes functionality to resample audio files if needed, but starting with correctly
sampled audio will provide the best visualization results. 