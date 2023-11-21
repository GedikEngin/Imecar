import os
import moviepy.editor as mp
import speech_recognition as sr
from tqdm import tqdm

def video_to_text(video_path):
    # Extract audio from the video file
    video = mp.VideoFileClip(video_path)
    audio = video.audio
    video_name = os.path.splitext(os.path.basename(video_path))[0]
    audio_path = f'{video_name}_extracted_audio.wav'
    audio.write_audiofile(audio_path)

    # Initialize the recognizer with Sphinx
    r = sr.Recognizer()

    # Set the Sphinx recognizer as the recognizer engine
    with sr.AudioFile(audio_path) as source:
        audio_data = r.record(source)

    # Transcribe audio to text
    try:
        # Use Sphinx for local speech recognition
        text = r.recognize_sphinx(audio_data)
        print("Transcription:\n", text)

        # Save the transcript to a text file
        transcript_path = f'{video_name}_transcript.txt'
        with open(transcript_path, 'w') as file:
            file.write(text)
        print(f'Transcript saved to: {transcript_path}')

    except sr.UnknownValueError:
        print("Sphinx could not understand audio")
    except sr.RequestError as e:
        print(f"Error with Sphinx recognizer: {e}")

if __name__ == "__main__":
    # Path to your video file
    video_path = r'python\misc_tools\song.mp4'
    video_to_text(video_path)
