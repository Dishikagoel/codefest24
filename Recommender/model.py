
import pickle

import numpy as np
import tensorflow as tf
# from tensorflow.keras import layers, models
# from tensorflow.keras.models import Model
import random

with open("data.pkl", "rb") as f:
    data = pickle.load(f)

random.seed(0)
random.shuffle(data)

train_data, train_labels, test_data, test_labels = [], [], [], []
for i in range(int(0.8*len(data))):
    train_data.append(data[i][:28])
    train_labels.append(data[i][28:])

for i in range(int(0.8*len(data)), len(data)):
    test_data.append(data[i][:28])
    test_labels.append(data[i][28:])

def model():
    model = tf.keras.models.Sequential()

    model.add(tf.keras.layers.Dense(128, activation='relu'))
    model.add(tf.keras.layers.BatchNormalization())
    model.add(tf.keras.layers.Dense(128, activation='relu'))
    model.add(tf.keras.layers.BatchNormalization())
    model.add(tf.keras.layers.Dense(64, activation='relu'))
    # model.add(layers.Dense(32, activation='relu'))
    model.add(tf.keras.layers.Dense(21, activation='softmax'))
    return model

m = model()
m.compile(
    optimizer=tf.keras.optimizers.Adam(),
    # loss={"ecc": "mse", "angle": "mse"},
    # metrics={"ecc": "mae", "angle": "mae"}
    loss=tf.keras.losses.CategoricalCrossentropy(),
    metrics=["accuracy"]
)

i = 0
while i < 20:
    m.fit(train_data,train_labels,batch_size=32)
    loss, acc = m.evaluate(test_data,test_labels)
    if acc > 0.5:
        m.save(f"model{i}acc={acc}")
    i+=1