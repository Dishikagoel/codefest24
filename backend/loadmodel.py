import tensorflow as tf
import numpy as np


model = tf.keras.models.load_model("model.keras")
#../Recommender/model1acc=0.6855000257492065/saved_model
# model.summary()
content = [1, 1, 1, 1, 0, 0, 0, 3, 2, 0, 2, 3, 3, 2, 1, 1, 2, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0]
pred = model.predict(np.array([content]))
print(pred)