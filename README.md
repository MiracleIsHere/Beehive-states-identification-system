# Beehive-states-identification-system
A system that can automatically identify different states of a hive based on audio recordings made from inside beehives.
*	Used React to implement frontend and Flask for machine learning model deployment.
*	[Developed a custom features extraction method with librosa.](https://github.com/MiracleIsHere/Audio-based-identification-of-beehive-states) Mel-frequency cepstral coefficients, melspectrogram, chroma_stft, chroma_cqt, chroma_cens features were extracted from the audio signal.
*	[Fine-tuned convolutional neural networks with Keras to classify beehive states, achieving a classification accuracy rate of 99%.](https://github.com/MiracleIsHere/Audio-based-identification-of-beehive-states) The BeeNoBee model works as a preselector of relevant samples. The BeeSound model makes the decision regarding the state of the hive.
## Results
BeeNoBee (0 – Bee, 1 – Noise)|BeeSound (0 – NoQueenBee, 1 – QueenBee, 2 – Swarming)
:-------------------------:|:-------------------------:
![](https://imgur.com/03i9re0.png) | ![](https://imgur.com/9yCMkse.png)
## Demo
Homepage|Quick Guide
:-------------------------:|:-------------------------:
![](https://imgur.com/DmLz7xJ.png) | ![](https://imgur.com/KLhQFoX.png)
Make A Record Of A Hive Or Upload An Existing Record|Labels Description
![](https://imgur.com/U5Mmjjw.png) | ![](https://imgur.com/pjZzshO.png)

Distinguish Your Hive – Pick A Color
:--------------------------------------------------:
![](https://imgur.com/zEWLGw6.png)
## How to use
*	Download [FFmpeg](https://ffmpeg.org/download.html) and put it under 'backend\\'.
*	Run Flask application ('backend\\run').
*	Install required packages and run React app ('frontend\\').
