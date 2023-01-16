from flask import Flask, request
from flask import jsonify
from tensorflow import keras
import librosa
import numpy as np
import os
import uuid
import subprocess


HIVE_STATES = {0: 'No Queen Bee', 1: 'Queen Bee', 2: 'Swarming'}


def convert(fn, new_fn):
    command = [r'backend\ffmpeg\bin\ffmpeg.exe', '-i', fn, new_fn]
    subprocess.run(command, stdout=subprocess.PIPE, stdin=subprocess.PIPE)


def preprocess(filename):
    y, sr = librosa.load(filename)
    mfccs = np.mean(librosa.feature.mfcc(y=y, sr=sr, n_mfcc=40).T, axis=0)
    melspectrogram = np.mean(librosa.feature.melspectrogram(
        y=y, sr=sr, n_mels=40, fmax=8000).T, axis=0)
    chroma_stft = np.mean(librosa.feature.chroma_stft(
        y=y, sr=sr, n_chroma=40).T, axis=0)
    chroma_cq = np.mean(librosa.feature.chroma_cqt(
        y=y, sr=sr, n_chroma=40, bins_per_octave=40).T, axis=0)
    chroma_cens = np.mean(librosa.feature.chroma_cens(
        y=y, sr=sr, n_chroma=40, bins_per_octave=40).T, axis=0)
    features = np.reshape(np.vstack(
        (mfccs, melspectrogram, chroma_stft, chroma_cq, chroma_cens)), (40, 5))

    x = np.array([features])
    x_2d = np.reshape(
        x, (x.shape[0], x.shape[1]*x.shape[2]))
    x_2d = np.reshape(x_2d, (x_2d.shape[0], 40, 5))
    x_2d = np.reshape(x_2d, (x_2d.shape[0], 40, 5, 1))
    return x_2d


beeNoBeeModel = keras.models.load_model(r'backend\mlModels\BeeNoBeeModel')
beeSoundModel = keras.models.load_model(r'backend\mlModels\BeeSoundModel')

# Initializing flask app
app = Flask(__name__)


@app.route('/predict', methods=['POST'])
def upload_file():
    file = request.files['audio']
    filename = os.path.join('backend', 'uploads', str(
        uuid.uuid4())+str(file.filename))

    if filename.endswith('.ogg'):
        file.save(filename)
        convert(filename, filename+'.wav')
        filename += '.wav'
    else:
        file.save(filename)

    x = preprocess(filename)

    beeOrNoise = beeNoBeeModel.predict(x)
    beeOrNoise_idx = np.argmax(beeOrNoise)

    hive = beeSoundModel.predict(x)
    hive_idx = np.argmax(hive)

    if beeOrNoise_idx == 0:
        return jsonify({'predict': HIVE_STATES[hive_idx]})
    else:
        if hive[0][hive_idx] >= 0.9:
            return jsonify({'predict': HIVE_STATES[hive_idx]})
        return jsonify({'predict': 'Noise'})


# Running app
if __name__ == '__main__':
    app.run(debug=True)
