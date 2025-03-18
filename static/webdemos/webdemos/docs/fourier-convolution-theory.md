# Fourier Transform and Convolution

This document explains the theory behind the Fourier Convolution Demo, which demonstrates how the Fast Fourier Transform (FFT) can be used to perform convolution operations more efficiently.

## Convolution in Digital Signal Processing

Convolution is a fundamental operation in digital signal processing (DSP) that combines two signals to form a third signal. For audio processing, it's particularly important for:

- Adding reverb/echo effects (convolving with an impulse response)
- Filtering signals (convolving with filter coefficients)
- Simulating acoustics of different environments

### Time Domain Convolution

The direct/time-domain convolution of two discrete signals x[n] and h[n] is mathematically defined as:

```
y[n] = (x * h)[n] = Σ(k=-∞ to ∞) x[k] × h[n-k]
```

For finite-length signals of length N and M, the output signal has length N+M-1.

In code, this looks like:

```javascript
// Direct convolution
for (let n = 0; n < outputLength; n++) {
  for (let k = 0; k < h.length; k++) {
    if (n - k >= 0 && n - k < x.length) {
      output[n] += x[n - k] * h[k];
    }
  }
}
```

The time complexity of this operation is O(N×M), which becomes very computationally expensive for long signals.

## The Fourier Transform

The Fourier Transform converts a signal from the time domain to the frequency domain, representing it as a sum of sinusoidal components.

### The Convolution Theorem

The convolution theorem states that:

> Convolution in the time domain equals pointwise multiplication in the frequency domain.

Mathematically:

```
x[n] * h[n] ⟷ X(ω) · H(ω)
```

where X(ω) and H(ω) are the Fourier transforms of x[n] and h[n], respectively.

## Fast Fourier Transform (FFT)

The Fast Fourier Transform is an algorithm to compute the Discrete Fourier Transform (DFT) efficiently, with a time complexity of O(N log N) instead of O(N²) for a direct DFT calculation.

### Convolution Using FFT

Using the FFT for convolution follows these steps:

1. Compute the FFT of both signals: X = FFT(x) and H = FFT(h)
2. Multiply the results pointwise: Y = X · H
3. Compute the inverse FFT to get the result: y = IFFT(Y)

The time complexity is O(N log N), which is much faster than O(N²) for long signals.

## Computational Comparison

For signals of length N, the theoretical computational costs are:

- Direct convolution: O(N²)
- FFT-based convolution: O(N log N)

This means that for large N, FFT-based convolution can be significantly faster. The demo visually demonstrates this performance difference.

## When to Use Each Method

- **Direct convolution** is simpler to implement and may be faster for very short signals (N < 64 typically)
- **FFT-based convolution** is more efficient for longer signals and is the standard method used in professional audio processing

## The Web Audio API

In the Web Audio API:

- The `ConvolverNode` uses FFT-based convolution internally
- For custom implementations, libraries like DSP.js provide FFT functionality

## References

1. Smith, Julius O. "Mathematics of the Discrete Fourier Transform (DFT)." W3K Publishing, 2007.
2. Oppenheim, Alan V., and Schafer, Ronald W. "Discrete-Time Signal Processing." Prentice Hall, 2009.
3. Web Audio API Specification: https://webaudio.github.io/web-audio-api/ 