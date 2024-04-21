from openai import OpenAI
import streamlit as st
import os
from dotenv import load_dotenv

# Load the environment variables from the .env file
load_dotenv()

st.title("💬 Bit.by.bit")
st.caption("🚀 A chatbot powered by Finetuned OpenAI LLM for Autistic Children!")
if "messages" not in st.session_state:
    st.session_state["messages"] = [{"role": "assistant", "content": "How can I help you?"}]

for msg in st.session_state.messages:
    st.chat_message(msg["role"]).write(msg["content"])

if prompt := st.chat_input():

    client = OpenAI(api_key=os.getenv('OPENAI_API'))
    st.session_state.messages.append({"role": "user", "content": prompt})
    st.chat_message("user").write(prompt)
    response = client.chat.completions.create(model="ft:gpt-3.5-turbo-0125:personal::9GCHGPWm", messages=[{"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": "I find it difficult to explain to others things that I understand easily, when they don't understand it first time"}] + st.session_state.messages)
    msg = response.choices[0].message.content
    st.session_state.messages.append({"role": "assistant", "content": msg})
    st.chat_message("assistant").write(msg)