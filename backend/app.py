import torch
from transformers import pipeline
import os

# model_id = "meta-llama/Llama-3.2-1B" # tried the 1B model, but it was genearting nonsense responses such as:
# [{'generated_text': "\n        - Inception,\n        - The Godfather,\n        - Pulp Fiction,\n        - Kill Bill,\n        - Djanga Unchained,\n        - Ready Player One,\n        \n        Return the movie titles that are most similar to the word 'tion'.\n            - If the word is a noun, then return the word itself.\n            - If the word is a verb, then return the word itself.\n            - If the word is a noun or verb, then return the word itself.\n        - Return the movie titles that are most similar to the word 'tion'.\n            - If the word is a noun, then return the word itself.\n            - If the word is a verb, then return the word itself.\n            - If the word is a noun or verb, then return the word itself.\n        - Return the movie titles that are most similar to the word 'tion'.\n            - If the word is a noun, then return the word itself.\n            - If the word is a verb, then return the word itself.\n            - If the word is a noun or verb, then return the word itself.\n        - Return the movie titles that are most similar to the word 'tion'.\n            - If the word is a noun, then return the"}]
model_id = "meta-llama/Llama-3.2-3B"

hf_auth_token = os.getenv("HF_AUTH_TOKEN")

pipe = pipeline(
    "text-generation", 
    model=model_id, 
    torch_dtype=torch.bfloat16, 
    device_map="auto",
    use_auth_token=hf_auth_token,
)

        # From the movie titles below, which one is similar to 'fiction'? 
        # Filter out the movie titles that are similar to 'fiction'.
        # From the movie list above, return the movie titles that are similar to the input 'fiction'.
# res = pipe("The key to life is")
# res = pipe("""
#         1. Inception
#         2. The Godfather
#         3. Pulp Fiction
#         4. Kill Bill
#         5. Djanga Unchained
#         6. Ready Player One
        
#         Return the movie ids whose titles are wordwise similar to the word below 
        
#         tion
#            """, max_new_tokens=200)
res = pipe("what is the best way to ask you a question?")
print(res)



