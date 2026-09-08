---
layout: ../../layouts/ArticleLayout.astro
title: "What Are Large Language Models (LLMs)? [Part 2: Technical Aspects]"
description: "Learn about the technical aspects of LLMs and Transformer Architecture in Part 2 of our comprehensive guide. Explore the nuances of training datasets; their curation, ethical considerations, and their keystone role in language models."
date: "2023-11-08"
sourceUrl: "https://datasci101.com/what-are-llms-part-2/"
sourceLabel: "datasci101.com"
author: "Britney Muller"
eyebrow: "Beginner's Guide to LLMs"
---

![](/blog/llm-101-part-2/54182ff7cc.webp)

<h4 id="part-2">Part 2</h4>

<h1 id="technical-aspects-of-llms-part-2">Technical Aspects of LLMs [Part 2]</h1>

In the [previous chapter](/blog/what-are-llms-part-1), we introduced the revolutionary impact of the Transformer model, introduced in 2017, which has redefined the machine learning or “AI” landscape as we know it. Its ability to decipher complex sequences has positioned it at the forefront of machine learning. Let’s uncover the mechanics and principles that underpin the Transformer’s powerful capabilities.

Highly recommend reading Part 1 of this LLM Guide before reading the following technical insights:

[What are Large Language Models? [Part 1]](/blog/what-are-llms-part-1)

## 

<h2 id="table-of-contents">Table of Contents</h2>

1. [Training Data](#keystone-of-llms)
   1. [Addressing Bias](#addressing-bias)
   2. [Key Takeaways](#key-takeaways-of-llm-training-data)
2. [Transformer Architecture](#transformer-architecture)
3. [Encoder-Decoder](#encoder-decoder)
4. [Attention Mechanism](#attention-mechanism)
5. [Normalization](#normalization)
6. [Tokenization](#tokenization)
7. [Embeddings](#embeddings)
8. [LLM Learning Techniques](#understanding-llm-learning-techniques)
9. [Decoding Strategies](#decoding-strategies)
10. [Summary](#summary)

<h1 id="keystone-of-llms">The Keystone of LLMs: Training Data</h1>

> *Quality training data is arguably* ***the most important part of machine learning****.*

Imagine embarking on a journey to learn a new language. How would you go about this? You’d probably want to immerse yourself in that language’s environment, listen to native speakers, practice conversations, and make mistakes in order to learn. Each interaction you have with this new language, every piece of dialogue, is a step towards fluency in your new language.

The Transformer’s journey to language fluency requires similar exposure to language through a vast array of training data! This data acts as the curriculum for the model’s intensive language course.

Just as you would expose yourself to various dialects, texts, contexts, and tonalities to grasp your new language, the Transformer needs many examples to discern the patterns, relationships, and semantics of a particular language.   
  
Training data is also referred to as ‘training set,’ ‘training dataset,’ and ‘learning set.’

<h1 id="two-training-data-types">Two Training Data Types</h1>

Training data is the foundation upon which machine learning models like LLMs (and ChatGPT) are built. This data can broadly be classified into two types, each with its own use cases and ethical considerations.

**Sidenote:** AI is like a tasty hotdog; you should know what kind of atrocities go into making it before taking a bite.

<h1 id="1-labeled-data">#1 Labeled Data</h1>

Labeled datasets come with annotations (or labels) that provide context to the machine. These labels help machines identify specific characteristics, classifications, properties, patterns, people, objects, etc. Just as a language learner uses labels to associate words with objects, labeled data aids in supervised learning, though creating these datasets can be very expensive and labor-intensive. 

The process of creating labeled data is not without its ethical quandaries. This work often involves human annotators (or ‘[cleaners](https://www.youtube.com/watch?v=iGCGhD8i-o4)’ <– please watch this trailer) who painstakingly label vast amounts of data, some gruesome and sometimes under less-than-ideal working conditions.

![](/blog/llm-101-part-2/fe84c27a03.webp)

<h1 id="2-unlabeled-data">#2 Unlabeled Data</h1>

In contrast, unlabeled data are raw, untagged datasets (like entire websites) used in unsupervised learning. This is akin to a language learner overhearing conversations without context, relying on pattern recognition to make sense of a language.

Because LLMs are trained on most of the internet, they are provided with raw unlabeled website data like below:

**Hybrid Data:** Uses both labeled and unlabeled data for multi-modal models that integrate data across various formats such as text, images, and audio.

![](/blog/llm-101-part-2/061bd5b79c.webp)

Datasets are critical for the development of AI models, but the process behind their creation must be scrutinized. There’s a growing call within the AI community for more ethical data collection and annotation practices ensuring fair compensation and working conditions for those involved in the creation of these datasets.

<h1 id="sourcing-training-data">Sourcing Training Data</h1>

![](/blog/llm-101-part-2/a355ee792c.webp)

There’s no ‘download all’ button for the internet. People behind ‘base’ or ‘foundational’ LLMs had to decide which parts of the internet should go into the model’s training and which should not.

<h1 id="addressing-bias">Addressing Bias</h1>

Datasets behind LLMs have grown dramatically in size because the testing of larger datasets used for LLM training led to enhanced performance never seen before. Essentially, the more text a model is trained on, the more adept it becomes at delivering outputs that mimic human-like communication. However, quantity does not equate to quality.

Let’s take a peek at one of the most common text datasets used to help train LLMs:

**The Colossal Clean Crawled Corpus**

The [Colossal Clean Crawled Corpus](https://huggingface.co/datasets/c4) (C4), despite its size, comes with inherent biases due to being English-based and its exclusion of certain terms. It’s important to note that several of these omissions are used positively by various minority groups, further erasing already marginalized voices. Sex, for example, a useful term in many appropriate contexts, falls within this omission list. 

Here are the top TLDs (make up the end of a URL) and the top 25 websites within C4 with their number of tokens (words or parts of words) that make up each website’s data contributing to the entire dataset:

![Line bars showing the top contributing websites to the Colossal Clean Common Corpus](/blog/llm-101-part-2/ed14afc08d.webp)

The English Wikipedia is the #2 highest website contributing to the C4 and appears to be a pretty solid information resource, right?

It’s important to note that even highly regarded websites like Wikipedia come with their fair share of biases.

The following is self-reported data for Wikipedia contributors (or editors):

![](/blog/llm-101-part-2/acc7bd1b5d.webp)

Self-reported contributors to Wikipedia are 87% male, are an average age of 27, have higher education, are single, with no kids. This demographic homogeneity (not representative of a diverse population) leads to a limited perspective on topics of broader interest and importance.

This has resulted in the following (and other) well-documented issues:

- [Racial Bias](https://en.wikipedia.org/wiki/Racial_bias_on_Wikipedia): The underrepresentation of Black history and the dominance of white, European, and North American editors results in a skewed portrayal of African topics. This also leads to perpetuating stereotypes and omitting significant historical and cultural information.
- [Geographical Bias](https://en.wikipedia.org/wiki/Geographical_bias_on_Wikipedia): The concentration of editors from Western countries introduces a geographical bias, often leading to an overrepresentation of Western perspectives and a lack of coverage of other regions, particularly the Global South.
- [Gender Bias](https://en.wikipedia.org/wiki/Gender_bias_on_Wikipedia): With fewer topics of interest to women and fewer biographies about women, the content on Wikipedia leans towards male-centric perspectives and interests.

![](/blog/llm-101-part-2/b1553b757e.webp)

<h1 id="ethical-implications">Ethical Implications</h1>

These kinds of dataset biases have profound implications beyond the websites themselves. As big tech companies continue to harness these skewed datasets to train AI models, there’s a risk of perpetuating and magnifying these prejudices on a much larger scale. Every interaction with these AI systems, however passive, inadvertently fine-tunes these models with the same skewed perspectives. If unchecked, the embedded biases will continue to shape AI behavior and potentially significantly affect necropolitics and global societal dynamics. 

Acknowledging that all datasets are biased and that we are all biased, is the first step. By shining a light on these implicit biases, we can raise awareness and take deliberate action. It’s important that we strive to develop AI models that are not just technologically advanced but are also shaped by a commitment to inclusivity, fairness, and a more equal representation of our global society. 

It’s interesting to think about LLM’s large dataset requirements and consider which companies hold massive amounts of our data.

Fun fact: ReCaptchas like below, are labeling images for image recognition models.

![](/blog/llm-101-part-2/f7e32adc30.webp)

<h1 id="key-takeaways-of-llm-training-data">#11 Key Takeaways on LLM Training Datasets</h1>

In the development of LLMs, the datasets used for training are the cornerstones that dictate their capabilities and performance. Here are some key takeaways regarding their role and importance:

**#1** **Quality Over Quantity:** The old saying “garbage in, garbage out” is true for machine learning. The quality of training data is crucial to a model’s performance.

**#2 Consent and Authorship:** Most content creators (writers, artists, or site owners) have not agreed to include their work in a model’s training data.

**#3 Representation and Bias:** There is an overrepresentation of individuals from privileged demographics in terms of race, gender, ability, age, religion, and nationality.

**#4 Anglocentric Bias:** English-speaking and Western perspectives often become the default, marginalizing the voices of the global majority. (Zhou et al., 2021)

**#5 Gender Biases:** Historical biases, such as the sexualization and objectification of women, are prevalent and have been well documented in search algorithms before the rise of LLMs, such as the [search results for “black girls](https://time.com/5209144/google-search-engine-algorithm-bias-racism/).”

**#6 Necropolitics:** The implementation of LLMs in social services can lead to systematic service denial, disproportionately affecting specific populations (Eubanks, 2018)

**#7 Privacy Concerns:** The potential extraction of Personally Identifiable Information (PII) from training models poses significant privacy risks (Carlini et al., 2021)

**#8 Illusion of Objectivity:** Large, uncurated datasets can present a “view from nowhere,” a false sense of objectivity that ignores nuances.

**#9 Data Centralization Risks:** A dependency on large datasets tends to consolidate AI power among companies capable of extensive data collection and processing. Accepting AI means implicitly endorsing pervasive surveillance and control (McQuilan, pg 14, 2022).

**#10 Immeasurable Human Experience:** AI cannot capture all facets of human experience and knowledge, a limitation that must be recognized.

**#11 Assumption of Omniscience:** These datasets often operate under the assumption that the sum of human knowledge is available online or in written format, a fundamentally flawed notion.

<h1 id="the-dark-side-of-data-preparation">The Dark Side of Data Preparation</h1>

The process behind dataset aggregation is often non-transparent and contentious. Awareness of the ethical concerns associated with exploiting low-wage labor for data sanitization and decision-making is critical. For example, [OpenAI’s use of Kenyan workers at less than $2 per hour to detoxify ChatGPT’s outputs](https://time.com/6247678/openai-chatgpt-kenya-workers/) has sparked ethical debates.

Dr. Margaret Mitchell sums up a prevailing ethical stance: “People aren’t subject to non-discrimination policies when freely writing online, but models should be.”

<h1 id="historical-context-rnns-to-transformers">Historical Context: RNNs to Transformers</h1>

Traditional NLP methods heavily relied upon RNNs (recurrent neural networks). RNNs rely on a simple encoder-decoder structure that helps the model handle data that changes over time, like words in a sentence. Reading a book is like an RNN processing text – taking in one word at a time and updating the understanding as you go along. But just like us humans, RNNs can struggle with remembering the details from the beginning of a long story. 

However, RNNs face an “informational bottleneck” challenge when dealing with longer text sequences. This means that as a sequence gets longer, RNNs find it difficult to remember information from earlier parts of the text. 

It’s like trying to recall what happened at the beginning of a long story without forgetting any important details. 

Because of this limitation, the performance of RNNs tends to decrease as the sequences get longer. In other words, RNNs struggle to capture the full context and connections between sections of lengthy text. 

Researchers have been working on new techniques (like attention) to help overcome this issue and improve the understanding of longer text sequences.

Highly recommend ‘[The Unreasonable Effectiveness of Recurrent Neural Networks](http://karpathy.github.io/2015/05/21/rnn-effectiveness/)’ by Karpathy to learn more about RNNs.

<h1 id="transformer-architecture">Transformer Architecture</h1>

When it comes to training a Transformer, think of it as a two-step dance. The first step is pre-training, where the model learns from a large corpus of text data, absorbing knowledge like a sponge. The second step is fine-tuning, where the model is further trained on a smaller, task-specific dataset, honing its skills to perfection.

<h1 id="encoder-decoder">Understanding Encoder-Decoder Framework</h1>

Let’s consider how baseball coaches create specific hand signals to communicate information to players at bat:[![](/blog/llm-101-part-2/cdbaf698fb.webp)](https://i0.wp.com/datasci101.com/wp-content/uploads/2023/11/baseball-signs.gif?ssl=1)

Note: Several international players on the team do not speak English. 

The team decides what information would be valuable to *encode* or communicate to players while up at bat. This information goes into a spreadsheet, assigning an abbreviated hand signal for each piece of information. These signs and corresponding information are communicated to each player in their preferred language.  
  
While a Spanish-speaking player is at bat, she sees a hand signal from her coach, who pulls at both ears and *decodes* that signal back into the original information “hit it to the moon” (however, she decodes this in Spanish) as “golpéalo a la luna” to process. The player then uses that information to strategically smash the ball out of the ballpark for a home run!

Encoder-decoder architecture helps transform language into 1s and 0s (hand signals in our example) for processing and back into a desired language task output.

[![](/blog/llm-101-part-2/5407bd0654.webp)](https://i0.wp.com/datasci101.com/wp-content/uploads/2023/11/twins.jpg?ssl=1)

Think of the encoder-decoder in the Transformer architecture like a dynamic duo—they don’t have to be identical twins. They can differ in structure or size, and different architectures can shine in different tasks. It’s all about finding the right fit for the task at hand.

Fun fact: GPT only uses the *decoder* part of Transformer architecture, and BERT only uses the *encoder*!

**Three Common Types of Transformer Models:**

- **Encoder-decoder:** Great for language translation and text summarization.

- **Encoder-only:** Tokenizes input text into numerical representations to accomplish various text classification tasks.

- **Decoder-only:** Good at predicting the next word in a sequence and commonly used for text generation. ChatGPT and all previous GPT models use a decoder-only architecture.

—While we’ve categorized three main types here, remember that these boundaries are not set. Many models are hybrids incorporating elements of all three types!

<h1 id="attention-mechanism">Attention Mechanism</h1>

The Attention mechanism is an innovative concept in machine learning to help solve the “informational bottleneck” problem.

The attention mechanism in machine learning is a true superstar. It was a significant innovation that allowed Transformers to come into the industry. Before Transformers, attention had a limited role in RNNs, but with the advent of self-attention in Transformers, this technique could be fully leveraged, propelling Transformers into the spotlight.

**Hidden States**

Imagine going on a hiking trip and trying to remember everything along the way. As you come across things on your hike like maybe you saw a cute fox and found some unopened trail mix! You place each of those experiences into your backpack (or memory). However, there are long stretches of your hike that are quite boring. If you were to try to put every single step as a memory into your backpack it would overflow and feel unnecessary. 

This is kind of how attention and hidden states work! A hidden state is like the backpack that the Transformer carries. Each time it sees a new word, it puts something about that word into the backpack. And as it comes across new words, it looks back into its backpack to discover relevant information and context for the new word. 

Unlike RNNs which generate a single hidden state for the input sequence (backpack overload), an encoder in attention-based models produces a hidden state *at each step of the journey (like the magical Transformer backpack above).* This allows the decoder to access multiple states and gather comprehensive information across an entire hike.

**Attention Mechanisms**

Imagine at the end of your hike if you had to go through every single item within your magical Transformer backpack, like where you saw the cute fox and each rock you saw. You’d be overwhelmed! The same thing happens when the decoder considers all states simultaneously. To address this, attention mechanisms come into play!

Attention plays a crucial role in determining which encoder states the decoder should prioritize. By assigning different weights or “attention” to each encoder state during each step, the decoder can selectively emphasize the relevant states (cute fox) while disregarding the less important ones (saw another rock). This targeted attention significantly improves a model’s ability to process input and generate output that is more accurate and meaningful. 

The integration of attention into the encoder-decoder architecture not only improves the model’s performance but also facilitates faster training! This powerful technique has contributed to numerous NLP breakthroughs.

<h1 id="positional-encoding">Positional Encoding</h1>

While RNNs tackle data one step at a time —like following a breadcrumb trail— Transformers are more like taking in the entire hike’s scenery simultaneously. But without knowing the sequence of events, our Transformer might mix up whether the fox sighting came before or after the heart-shaped rock.

In enters positional encoding, the brilliant solution to this sequential dilemma. Positional encoding is a way of timestamping every experience on our hike. It’s as if we’re creating a photo album where each picture is tagged with a number on the back that tells us its place in the sequence of our journey.

**How Positional Encoding Adds Context**

Imagine each photo (or data element) now has a unique pattern drawn on the back, a combination of lines that become more complex with each subsequent picture. These patterns are the positional encodings or carefully crafted vectors (numbers) that the Transformer uses like a map to determine the order of events. 

 

**Necessity of Positional Encoding**

These encoded vectors are like secret codes added to the memories of what we’ve seen. They help the Transformer understand that the birds came after the fox but before the distant lake. This understanding is critical for accurately translating languages, where the order of words can flip a sentence’s meaning (or any task where the order is contextually essential).

—Positional encodings allow transformer models to understand the order of input sequences in a way that retains the efficiency and power of the transformer’s parallel processing capabilities.

<h1 id="normalization">Normalization</h1>

Normalization in machine learning, and particularly within the context of NLP, is like preparing the foundation of your home before building it. It’s standardizing and cleaning data to ensure the model can effectively learn from the text.

It’s about tidying things up: trimming whitespace, making everything consistent and lowercase, converting all characters to a standard format (like ASCII), and handling special characters (non-alphanumeric like $) consistently. This removes irregularities and discrepancies that confuse the model and degrade its performance. 

For Transformer-based models like GPT, older techniques like stemming and lemmatization (reducing words to their bare bones or ‘stems’) aren’t invited to the cleaning party. Instead, these models roll with a more modern crew, employing specific tokenization methods that slice and dice text into subwords or characters, preserving the complexity of language. 

Normalization sets the stage for more advanced processing. Ensuring data is clean and consistent gives the model the best possible starting point to learn the nuances of language, leading to better predictions.

<h1 id="tokenization">Tokenization</h1>

After the text cleaning is done, it’s time to get tokenizing! Computers don’t read or process text like we do, they are binary machines using 1s and 0s to run software. So, Tokenization is used to translate human language into computer language (numbers).  
  
Tokenization essentially assigns secret codes (numbers) to parts of text. These parts of text are referred to as “tokens.” Tokens can be words, characters, parts of words, symbols, numbers, or common phrases. In the world of GPT-3 the word/token “the” has the numerical code ‘262’ and “cat” has the numerical code of ‘3797’. Pretty cool, right?!

Even cooler: the same word can have different codes. The capitalized “The” has the numerical code of ‘383’ and “The” at the beginning of a sentence or quote is coded as ‘464’. These same-word variations serve a distinct purpose of further coding/translating distinct meanings within text.

Fun fact: GPT-2 & GPT-3 have 50,257 tokens in their vocabulary!

<h1 id="embeddings">Embeddings</h1>

Embeddings play a vital role in the world of LLMs. Essentially, they convert tokens into dense numerical vectors. These vectors translate the complexities of language into a form that machines can interpret and process. Embeddings are our glimpse into how LLMs understand and relate linguistic concepts.

**Contextual Understanding**

Imagine every word or token being transformed into a multi-dimensional vector that captures its relationship with other words. This is the crux of embeddings. When we perform operations on these vectors, like the classic example of the vector representation for the word “King,”. —If you subtract the vector “man” from the vector for “King” and add the vector for “Woman,” it yields a strikingly similar vector for “Queen”. 

Similarly, if you subtract the vector for “state” from that of “California” and add “country”, the closest vector might correspond to “America”. Pretty wild, right!? Keep in mind that these relationships aren’t always universally valid and are heavily influenced by the specific training data and algorithms used.

**Visualizing Embeddings**

Interestingly, the space that houses LLM embeddings isn’t your typical two or three-dimensional space. Instead, it’s a high-dimensional space (think 10k-D) far beyond our imagination capabilities. Researchers frequently project this space into a compressed three-dimensional representation to create an interactive map where similar tokens appear near each other.

![](/blog/llm-101-part-2/b322466347.webp)

Source: <https://towardsdatascience.com/creating-word-embeddings-coding-the-word2vec-algorithm-in-python-using-deep-learning-b337d0ba17a8>

**Scale of Embeddings**

Let’s explore the scale to which token embeddings can expand. Consider the token ‘learning’ from the sentence “Learning about LLMs is fun!” and its numerical vector embedding within BertModel using BertTokenizer. The Pytorch’s ‘sum\_vec’ is used to represent this token embedding, which generated:

![](/blog/llm-101-part-2/40ada9de52.webp)

```
The above tensor([ 6.8373e-01, -2.7875e-01, 9.8956e-01,...continued for THREE pages.)
```

That’s a massive numerical vector (or matrix) embedding for a single token! 

The complexity of this token’s relationship is distilled into this high-dimensional vector representation, highlighting the power and sophistication of LLM embeddings. 

This is an excellent example of how computationally expensive training and running LLMs is. These massive matrixes or ‘tensors’ (where TensorFlow got its name) require large amounts of computing/energy power to run effectively.

**Visualizing the Invisible**

These incomprehensible, high-dimensional vectors (potentially thousands of dimensions) can be brought down to a more straightforward form. To visualize and make sense of this, researchers use techniques like t-SNE (T-distributed Stochastic Neighbor Embedding) to map these complex spaces onto 2D or 3D planes, where we can observe how similar words group together, forming clusters based on their shared meaning.

![](/blog/llm-101-part-2/e87fa542d4.webp)

Source: gif captured from a small embedding model I created in 2017.

It’s important to recognize that these visualizations only grant us a limited and simplified view of what’s happening inside these sophisticated models. Fully understanding and interpreting the workings of LLMs remains a massive challenge.

**Dynamic Embeddings**

The position of a word’s embedding is not fixed. As an LLM continues to learn and train on new data, these numerical representations often shift, reshaping the ‘map’ of word vectors to reflect new linguistic insights and connections.

**Embeddings Summary**

Embeddings are the LLM’s mechanism for grasping and representing language. They allow us a peek into the model’s understanding, capabilities, and limitations. However, comprehending the full extent of these embeddings remains an ongoing challenge in AI research.

<h1 id="pre-training-summary">Pre-Training Summary</h1>

Pre-training is a critical stage in developing models like GPT, where a model is exposed to massive amounts of text to learn a wide range of language patterns and information. This process provides the model with a broad understanding of language, enabling it to generate coherent text, make predictions, and understand context. 

Once pre-trained a model undergoes fine-tuning, where it’s adjusted and optimized for specific tasks or applications.

<h1 id="limitations-of-transformer-architecture">Limitations of Transformer Architecture</h1>

Transformer architecture has made significant contributions, but it is important to recognize its limitations. 

Here are some known constraints:

- **Limited labeled data:** Training a Transformer model for specific tasks with insufficient labeled data can pose challenges and hinder performance.
- **Lack of interpretability:** Transformers are often difficult or impossible to interpret. Understanding why a particular output is generated can be extremely challenging.
- **Challenges with long documents:** While attention mechanisms have addressed the Transformer’s ability to process longer sequences, processing large documents remains computationally expensive.
- **Computational requirements:** Transformers are computationally intensive models, requiring significant computational resources and memory to train and deploy. This also limits their use in resource-constrained environments or on devices with limited processing power (like mobile phones).
- **Difficulty with rare or out-of-vocabulary words:** Transformers are trained on a large dataset that lacks sufficient exposure to infrequent words which can lead to issues when it encounters them.

Acknowledging these limitations helps us understand that while the Transformer architecture has revolutionized many aspects of natural language processing, there are areas that require additional research and improvement.

![](/blog/llm-101-part-2/b63e9aae0d.webp)

<h1 id="understanding-llm-learning-techniques">Understanding LLM Learning Techniques</h1>

How do LLMs learn? LLMs use the above technology to translate mountains of text into computer language (1s and 0s). While we don’t know the training methods for the latest ChatGPT, we know that its predecessors in [open-source GPT](https://huggingface.co/docs/transformers/model_doc/openai-gpt) utilized Casual Language Modeling (CLM).

Note: In machine learning, “learning” and “training” are synonymous.

**Casual Language Modeling** predicts the next word throughout the training data, forming the backbone of language model training (as seen in GPT). 

**Other common language learning/training techniques:**

**Sequential Learning:** A broad term for any learning process that involves sequences, with CLM being one unique approach. Sequential Learning encompasses a range of models, including those that predict in both forward and backward directions or across sequences.

**Masked Language Modeling (MLM):** Used in models like [BERT](https://huggingface.co/blog/bert-101), this technique masks (hides) parts of the text in the middle of a sequence of text. The model then tries to predict the masked word(s), using bi-directional context from the text on each side of the masked information. This helps the model learn about word order meaning.

**Next Sentence Prediction (NSP):** Another BERT technique, NSP provides pairs of sentences to the model during training and tasks the model with predicting which sentence is the next sentence in a document. This helps teach the model about relationships between consecutive sentences, helping it to learn context.

**Reinforcement Learning from Human Feedback (RLHF):** This is used in later stages of model training to refine performance. Models are fine-tuned with human feedback, helping to better align the model’s output with human values and preferences. —This should be managed carefully to avoid reinforcing biases.

While CLM is a common training technique for models like GPT, combining multiple techniques like NSP can help enrich a model’s ability to discern and replicate complex language for more human-sounding outputs.

<h1 id="decoding-strategies">Decoding Strategies: For Text Generation</h1>

**So, how does a model like GPT decide the next word to generate into a sentence?** It’s a game of probabilities! Picture this: each word in an LLM’s immense vocabulary is written onto a slip of paper and tossed into an oversized hat. However, instead of each word having an equal shot at being picked from thousands of slips, some words stand a far better chance than others.

Instead of randomly drawing a word out of a hat, an LLM will focus only on the most probable next words. To do this, the model must look at all the next possible words (entire vocabulary) and assign probabilities to each.

It’s like a musician reading sheet music, moving through the notes one at a time. The goal is to figure out what the next word is likely to be as the model processes each word in the sentence.

—*This is a much different process from BERT, which leverages bidirectionality (both previous and future text) to predict a masked word/token. The GPT family (including ChatGPT) operates in a unidirectional manner, processing text from left to right.*

After calculating the probability distribution (across all tokens) for the next word, the words with the highest probability are selected, and a degree of randomness is introduced to decide which word/token to use. The amount of randomness is controlled by a fickle little thing called “temperature.” 

So, depending on the architecture of the decoding, sampling, and degree of temperature, the next word will be selected and the entire process will start again to predict the next word, and the next word, and the next. Generating the output you see from LLMs!

This highly iterative (and computationally intense) process is why LLMs require so much computing power and occasionally fail when overloaded with requests.

Example of an LLM’s next-word probability distribution:

![](/blog/llm-101-part-2/ad7f09b7ed.webp)

Note: Next-word probability distributions often exhibit an abrupt drop in probability percentages. This rapid descent is a staple of language models, lending an air of certainty to the text they generate. This tends to make the model’s output more cohesive and coherent, but it can also lead to less diversity in the generated text. 

Now, let’s dive into how LLMs generate text via decoding strategies!

<h1 id="decoding-strategies-essential-ingredient-randomness">Decoding Strategies Essential Ingredient: Randomness</h1>

Decoding and sampling strategies are fascinating and not talked about enough! These are the techniques used to achieve human-sounding output from LLMs. Understanding this concept will be valuable for your future prompt engineering.

LLMs learn to predict the next word within millions of web pages, which gives them the ability to contextually recognize and respond to a broad range of skills and requests. In addition, LLMs are exposed to specific tasks during pre-training like unscrambling words and specific language translation text. This gives LLMs the ability to transfer this knowledge during fine-tuning and employ these capabilities naturally while processing input and generating output!

**Why are degrees of randomness necessary for LLMs?**

You now know that LLMs predict words from a probability distribution (with a degree of randomness). But you might be wondering, why is randomness incorporated? Why not just select the most probable next word every time?

AI Engineers have tried that, and it’s commonly referred to as ‘Greedy sampling’.

**Greedy search decoding** (or Greedy algorithms): Select the most probable or locally optimal choice at each stage (sometimes missing global optimums). Greedy sampling often causes outputs to be repetitive, dry, robotic sounding, and lacking in creative or interesting outputs (albeit LLM output achieves more accurate responses this way!).

The other end of the spectrum is ‘Pure sampling’ or complete randomness.

**Pure search decoding:** Select completely random next words generating garbage or gibberish text like, “Learning about LLMs sandwich over hockey umbrellas play birthday now”. Not very helpful or human-sounding, right?

Like Goldilocks, you need something in between that generates interesting, human-like responses. And this setting is determined by the ‘Temperature’. 

**Here’s an easy way to remember temperature when it comes to LLMs:**

?  High temps = Spicy/creative text. Adds more randomness. 

❄️  Low temps = Boring/safe text. Decreases randomness.

You’ve probably heard people mention or refer to LLMs as ‘Stochastic Parrots’ ([Bender, Gebru et al 2021](https://dl.acm.org/doi/10.1145/3442188.3445922) ←know I’ve mentioned this throughout the guide, but *highly recommend you read it*). 

The word ‘stochastic’ derives from the Greek word “pertaining to chance” and means “randomly determined” or “random”. The term ‘Stochastic Parrots’ is in reference to the randomly generated next words that essentially ‘parrot’ or ‘repeat’ back information an LLM has read online. Pretty cool, right?!

**To recap, the element of randomness applied to the most probable next set of words is essential for LLMs to output interesting and creative text. Too little randomness and we get redundant, boring/robotic-sounding text. Too much randomness and we get complete gibberish. Something in between provides a beautiful balance that provides value and mimics personality.**

<h1 id="decoding-strategy-quiz-googles-bard-now-gemini-vs-openais-chatgpt">Decoding Strategy Quiz: Google&#x27;s Bard (now Gemini) vs OpenAI&#x27;s ChatGPT</h1>

Which LLM do you think uses a *less* randomized sampling strategy (or lower temperature setting): Google’s Bard (now Gemini) or OpenAI’s ChatGPT?  Think about the responses you get back from each. Which one sounds slightly drier?

*—A more robotic-sounding LLM is likely using a less randomized sampling strategy to appear more accurate. Does this sound like Gemini or ChatGPT?*

You’re likely leaning towards Gemini? But this makes sense! Google has a lot more to lose (worth 1.5T and has over 4.3B users worldwide) than OpenAI, so they are taking a more conservative approach when it comes to LLMs.

[![](/blog/llm-101-part-2/2321e3aa41.webp)](https://twitter.com/joehall/status/1638325407819653120)

Decoding strategies go beyond basic temperature settings and leverage more advanced algorithms to improve LLM outputs like *Beam Search Decoding*.

<h1 id="beam-search-decoding">Beam Search Decoding</h1>

Beam search is a commonly used technique to improve LLM output (quality and diversity) by considering multiple strings of next possible words. —The GPT family (including ChatGPT) uses Beam search.

The more beams you use, the better the output. However, you’ll run into slower text generation and require more computing power due to the parallel processes required for each beam.

![](/blog/llm-101-part-2/73f0ba983c.webp)

What’s really neat about this process is that instead of relying on the probabilities for each next word/token individually, each beam’s joint probability is calculated. 

```
An example of technical details that typically hit the editing floor (skip if non-technical):
Fun fact: To calculate sequence probabilities, the product of conditional probabilities is used. Conditional probabilities = the probability of an event given that another event has occurred. But, conditional probabilities often result in very very small numbers, causing numerical instability that leads to ‘underflow’. —Meaning a computer can’t accurately represent the number anymore. So, a log probability is used to join the conditional probabilities!  Is this interesting information to you? Let me know! If there's enough demand I can put together an advanced guide.
```

After each of the beam’s sequence probabilities are calculated, the LLM outputs the sequence with the highest joint probability score for the user.

One common issue with Beam search decoding is that it frequently results in repetitive outputs. 

If you could engineer a fix for repetitive outputs, how would you do it? I bet you can think of what machine learning engineers thought of for this fix!

Perhaps you would program something that tells a model not to repeat things? Bingo! Computer programmers refer to this fix as the n-gram penalty.

<h1 id="n-gram-penalty">N-gram Penalty</h1>

An n-gram penalty is commonly used in decoding to track which n-grams (‘n’ represents the number of items in a sequence; words, phrases or sentences) have been used and then block LLMs from producing a previously seen n-gram by setting their next token probability to zero.

This penalty encourages LLMs to generate more diverse and coherent outputs. 

Beam search decoding with n-gram penalty increases the quality and diverse output from LLMs.

In situations where textual accuracy is less of a concern, sampling methods can be used to similarly reduce repeating outputs while improving overall diversity and creative text generation.

<h1 id="top-k-and-nucleus-sampling">Top-k and Nucleus Sampling</h1>

Two common sampling methods are top-k and nucleus (top-p), which limit the number of tokens an LLM can sample from at each timestep. 

**Top-k**

Remember the element of randomization required to generate interesting outputs? This also becomes a liability when one out of every 300 generations chooses an inaccurate or inappropriate token with a lower probability score. The idea behind top-k is that those lower probability tokens are completely avoided by *only* sampling from the top k (highest probability) tokens.

Top-k sampling assigns static cut-offs for LLMs (ex. top\_k=75 would only sample from the top 75 highest probability tokens) and might not adapt well across various tasks. 

Another way to do this is by using a dynamic cutoff like nucleus sampling or “top-p”:

**Nucleus sampling (top-p)**

Nucleus sampling or “top-p” uses a flexible cutoff that helps LLMs generate predictable and creative outputs. Instead of relying on a fixed number of tokens (like top-k), nucleus sampling sets a probability threshold called “p”.

For example, if we set our p-value to 0.8. our LLM will consider the most probable words until their cumulative probability reaches 80%. Depending on the next word’s probability distribution, this could equate to just one word with a high (80%) probability or 75 words with lower probabilities distributed among them (note these would still be *the most* probable set of next words).

Fun fact: LLMs can use both top-p and top-k sampling (and often do). Incorporating a top\_k=75 and top\_p=0.85 would select tokens with a probability total of 85% from a maximum group of 75 tokens.

<h1 id="summary">Sampling Strategies Summary</h1>

Decoding strategies and sampling methods are fascinating techniques that play a vital role in making language models sound more human-like. 

Combining decoding and sampling methods helps strike a balance between coherent responses and creative outputs. 

**Which strategy is the best?**

This depends on what you’re trying to do. If you’re programming a physics tutor model, you should probably lower the temperature setting and possibly use greedy decoding. If you’re building a story generator, you might want to test a mix of top-k and nucleus (top-p) sampling in addition to a higher temperature.

<h1 id="beginners-guide-to-llms-part-2-technical-aspects-summary">Beginner&#x27;s Guide to LLMs [Part 2]: Technical Aspects Summary</h1>

In the second part of our journey into the technical intricacies of LLMs, we spotlight the keystone of these models: training data. We classified labeled and unlabeled datasets while noting unfair compensation and working conditions for people cleaning large datasets. We uncovered biases in widely used datasets like the Colossal Clean Crawled Corpus and highlighted the profound impact these biases can have on AI systems and societal dynamics. To improve AI models (and the industry), we need improved dataset documentation, quality, consent, transparency, and a commitment to DEIB.

We also uncover the technical evolution from Recurrent Neural Networks (RNNs) to Transformers, highlighting the latter’s versatility in the encoder-decoder framework. Attention mechanisms take center stage as pioneering technology, illustrated through analogies of hiking and hidden states. We dove into the significance of positional encoding, the role of normalization in data preparation, and the functions of tokenization and embeddings. 

Lastly, we illustrate how LLMs learn by guessing words over and over again and how decoding strategies are used to determine what words LLMs generate as output.

<h1 id="stay-tuned-for-part-3-demystifying-llm-performance-benchmarks">Stay Tuned for Part 3: Demystifying LLM Performance &amp; Benchmarks</h1>

What is ‘intelligence’? How do we know it when we see it? When will we know if we’ve reached AGI?

So, an LLM passed the Bar Exam? Does that make it as smart as a lawyer? 

We’ll break down why LLM performance is not always as it seems (or is hyped up to be).

<h2 id="congrats-to-you-for-leveling-up-your-llm-knowledge">Congrats to you for leveling up your LLM knowledge!</h2>

<h2 id="appreciate-you-reading-this-guide">Appreciate you reading this guide.</h2>

![](/blog/llm-101-part-2/72e33d2885.webp)

**In case you missed it:**

[What are Large Language Models [Part 1]](/blog/what-are-llms-part-1)

<h1 id="stay-tuned-for-part-3-llm-performance-benchmarks">Stay Tuned for Part 3: LLM Performance &amp; Benchmarks</h1>
