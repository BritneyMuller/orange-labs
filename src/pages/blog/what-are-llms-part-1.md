---
layout: ../../layouts/ArticleLayout.astro
title: "What Are Large Language Models (LLMs)? [Part 1]"
description: "Unlock the mysteries of LLMs like ChatGPT without any tech jargon! Dive into our easy-to-understand guide and lay the foundation for grasping these powerful AI language tools."
date: "2023-08-10"
sourceUrl: "https://datasci101.com/what-are-llms-part-1/"
sourceLabel: "datasci101.com"
author: "Britney Muller"
eyebrow: "Beginner's Guide to LLMs"
---

![](/blog/llm-101-part-1/37c76a0535.webp)

<h4 id="part-1">Part 1</h4>

<h1 id="introduction-to-llms">Introduction to LLMs</h1>

Large Language Models (LLMs), such as [ChatGPT](https://chat.openai.com/) and [Gemini](https://gemini.google.com/app), have been center stage lately, and for good reason. These models can produce astonishing results in response to complex requests, such as writing Shakespearean-style oven cleaning instructions or outlining a book on the Buffalo Bills, with seemingly little effort.

These two silly examples would be difficult for the average person to write. We’d need to research the topics, consider the tone, decide on an organizational structure, etc. but ChatGPT magically does all this simultaneously. How?!

You don’t need a technical background to understand the fundamentals of how LLMs work. 

Let’s demystify this technology so you can effectively wield the power of LLMs and navigate this ever-changing landscape with confidence.

<iframe src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1635850794&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true" width="100%" height="100" allow="autoplay" loading="lazy"></iframe>
<p class="audio-credit"><a href="https://soundcloud.com/britneymuller/how-do-llms-like-chatgpt-work-part-1">How Do LLMs (like ChatGPT) Work? [Part 1]</a></p>

<h2 id="table-of-contents">Table of Contents</h2>

1. LLMs
   1. [Summary](#summary) & [Key Takeaways](#key-takeaways)
   2. [Dissecting ‘Large’, ‘Language’, ‘Model’](#dissecting-large-language-model)
   3. [What LLMs are Good vs Bad at](#what-are-llms-good-vs-bad-at)
   4. [LLM Capabilities & Limitations](#llm-capabilities-and-limitations)
   5. [LLM Risk Mitigation Efforts](#llm-risk-mitigation-efforts)
2. LLM Example – [What is ChatGPT?](#what-is-chatgpt)
3. LLM History – [Background: Understanding AI & NLP](#background-understanding-ai-and-nlp)
   1. [The Game Changer: The Transformer](#the-transformer)

<h1 id="summary">Summary</h1>

To oversimplify, LLMs learn from mountains of text, nearly all of the internet, to get good at next-word predictions. With some input text (from you the user), the model creates a probability distribution of the most probable next set of words & randomly picks from those to develop a confident, human-sounding response.

However, their skill isn’t limited to text predictions; they’re also excellent at question-answering, language translation, programming, etc., thanks to the many examples of these tasks in their training data.

If the information you seek via an LLM is available via Google, an LLM like ChatGPT has likely trained on those results, aiding in its brilliant word-calculating skills. This capability (parroting back information it’s seen in slightly different ways) fools people into believing LLMs are intelligent and can reason and use logic or common sense. Spoiler: They don’t, but they’re damn good at mimicking it! Language models don’t “understand” language as humans do, they merely simulate it through observed patterns in text.

> LLMs are essentially aliens from a different universe: while they have access to all our world’s text, they lack genuine comprehension of languages, nuances of our reality, and the intricacies of human experience and knowledge.

This doesn’t mean LLMs aren’t useful. When harnessed responsibly and for the right tasks, LLMs hold the potential to revolutionize fields and empower people on an unprecedented scale. However, if misused (despite good intentions) or put in the wrong hands, this technology also poses significant risks. 

Acquiring a fundamental understanding of how LLMs, like ChatGPT, work + basic data literacy is critical to successfully navigating the ever-evolving AI landscape. 

While much about LLMs remains unknown, a basic grasp of their architecture will empower you to harness their strengths and avoid potential pitfalls.

<h1 id="key-takeaways">Key Takeaways:</h1>

**1. LLMs are not search engines! LLMs don’t perform information retrieval, nor are they deterministic (systems that involve no randomness).** LLMs generate randomized outputs based on a probability distribution.

**2.** **Versatility:** LLMs can be used for a wide range of tasks. They can analyze product reviews for customer insights, support creative processes like writing or music composition, provide programming support, and summarize long legal documents, among many other things.

**3. Encoded biases:** These models amplify societal biases, such as racism, sexism, ableism, and power inequalities.

**4. Availability:** LLMs can work around the clock on various tasks, providing consistent support and service whenever needed.

**5. Error-prone:**  It’s crucial not to view LLMs as a one-size-fits-all solution. They can inadvertently produce inaccuracies and are not appropriate for all tasks. An initial mistake can cascade, resulting in subsequent errors, given the way LLMs build on previous text.

**6. Fine-tuning capabilities:** LLMs can be tailored for specific industry tasks and datasets, improving their performance for specific use cases.

**7. Environmental & computational costs:** The environmental and financial costs of training LLMs are massive. The carbon footprint of training GPT-3 is comparable to a [round trip to the moon](https://www.theregister.com/2020/11/04/gpt3_carbon_footprint_estimate/) in a car. Note: GPT-4 is at least 10x larger.

**8. Integration:** LLMs can (and likely will) be integrated into many popular platforms and tools, enhancing their capabilities.

**9. Accountability:** Does stating that an LLM is “an experiment” remove accountability for when things go wrong? In the event of misuse or real-world harm, defining who will be held accountable is essential.

**10. Lack of interpretability or “black box”:** The lack of interpretability in LLMs limits our understanding of why they generate specific outputs.

**11. Human exams (like the Bar & SAT) are not good benchmarks of LLM performance:** While LLMs are good at memorizing questions and answers and learning the laws of language, they struggle with generalizing information. Ex. When test standardized questions get reworded but seek the same outcome/answer, LLMs [don’t currently score well](https://aiguide.substack.com/p/did-chatgpt-really-pass-graduate).

<h3 id="dissecting-large-language-model">Dissecting Large, Language, Model:</h3>

<h3 id="1-large-references-both-the-massive-dataset-used-for-training-the-size-of-the-model-itself">1. ‘Large’ references both the massive dataset used for training &amp; the size of the model itself</h3>

![Massive pile of books in a warehouse with a computer](/blog/llm-101-part-1/4e5b996e11.webp)

Source: Midjourney

You might be wondering why are such large datasets are required to train LLMs? Great question! The testing of larger and larger datasets to train language models led to enhanced performance never seen before. Essentially, the more text you feed a language model to train on, the better it is at providing human-like outputs across a large variety of domains. However, these massive datasets bring significant ethical and moral tradeoffs that we’ll dissect later.

Note: OpenAI has not disclosed the training data used to train ChatGPT, but we know that C4 ([Colossal Clean Crawled Corpus](https://www.washingtonpost.com/technology/interactive/2023/ai-chatbot-learning/)) was used. While C4 only represents a fraction of all the text ChatGPT was trained on and is a commonly used dataset, its blocklist filter is problematic because it removes pages containing ‘bad words’ like ‘sex’ and others that disproportionately erase text about minority groups and individuals. ([Dodge et all 2021](https://arxiv.org/abs/2104.08758))

‘Large’ also refers to the size of the model itself. This is commonly in reference to the number of model parameters or weights. A model’s parameters or weights are essentially the tuning knobs assigning values within the model. The more parameters or weights within a model, the larger the latent multi-dimensional space and the more complex patterns and relationships a model can map and identify.

[![size of LLM models over time](/blog/llm-101-part-1/22a6e5b2a2.webp)](https://i0.wp.com/datasci101.com/wp-content/uploads/2023/08/llm-model-size-.png?ssl=1)

Source: [Scale.com/guides/large-language-models](https://scale.com/guides/large-language-models#model-size-and-performance)

[Note: Larger models don’t come without setbacks.](https://dl.acm.org/doi/pdf/10.1145/3442188.3445922)

<h3 id="2-language-references-the-linguistic-nature-of-the-model">2. ‘Language’ references the linguistic nature of the model</h3>

![Photo of a mother and daughter laughing. Communication is learned from our elders.](/blog/llm-101-part-1/b4dcbbbaa5.webp)

Source: Midjourney

Language, a crucial element in LLMs is more complex than more people think and often overlooked. As emphasized by Dr. Emily Bender during a [DAIR Institute Talk](https://peertube.dair-institute.org/w/p/5k7JempgUbCAcpTjUZPuKQ), linguistics stands as an independent field, not just a subset of AI. 

Linguistics dives into the comprehensive scientific study of language, dissecting its structure, historical evolution, and more. It incorporates subfields such as phonetics, morphology, syntax, and historical linguistics to unravel language intricacies akin to biological studies. 

LLMs excel at identifying and mirroring the inherent statistical ‘laws of language,’ given sufficient text data. Text and speech aren’t random words but linguistical patterns used to structure phrases and convey meaning. Aspects like grammar, punctuation, and capital letters govern sentence structure. 

While a language model is adept at identifying the statistical structure of language, it by no means understands the meaning or semantics of language as humans do. Instead, they generate text based on patterns they’ve identified in the training data. So, instead of understanding the content in the way humans do, they’re more similar to an alien born in a dark cave, alone with no understanding of the real world, but have access to all of the world’s text. —That’s closer to what a language model “knows”.

However, language is ambiguous, its meaning is shaped by social situations, cultures, and current events—nuances that LLMs cannot fully navigate. Nevertheless, LLMs are trained to discern linguistic, statistical laws. Intriguingly, the exact mechanisms of how they do so remain a mystery even to researchers.

<h3 id="3-model-references-the-virtual-learning-environment">3. ‘Model’ references the virtual learning environment</h3>

> *“All Models are wrong, but some are useful” -George Box*

Models have been instrumental in scientific progress for centuries, aiding understanding and facilitating research.

 A model is a representation—physical, mathematical, or conceptual—of a system or ideas.

![what are models?](/blog/llm-101-part-1/2e22cfbec4.webp)

In research, models often describe and explain phenomena that are either directly inaccessible or automated to save experimental resources. They offer simplified portrayals of diverse scenarios, primarily aiding research through predictive capabilities and pattern recognition. For example, physics frequently employs models to circumvent the cost and time of real-world experiments, enabling scalability. —A plausible reason for the migration of so many physicists to ML/AI.

Consider, for example, estimating the time it would take for an object to fall from a certain height. Sure, you could test this in the real world with variables like wind, temperature, etc. or you could simulate it thousands of times in a virtual environment under ideal conditions. 

![science model example](/blog/llm-101-part-1/a9c6a08ce7.webp)

Once a model identifies the principles of force equals mass times acceleration, you no longer need all previous virtual examples but can reconstruct the outcome using this law/model.

This same concept applies to LLMs that identify and reconstruct language laws.

However, instead of explicitly being programmed with language laws, LLMs learn linguistic patterns through training on massive datasets. This allows LLMs to mimic human-like output by predicting linguistic units like tokens(text), token sequences(sentences), and symbols on a probability distribution. 

Like physical phenomena, language has a statistical structure!

<h1 id="what-are-llms-good-vs-bad-at">What LLMs are Good vs Bad at:</h1>

The observations listed below pertain to core LLMs — the “foundational models” without any integrations or ‘hookups’ that could potentially amplify their capabilities.

The current AI landscape changes quickly, and the capabilities of these models can expand when combined with other technologies or when supplemented with specialized datasets and algorithms. However, to grasp the fundamental strengths and limitations of LLMs we must consider them in their purest form. This allows us to appreciate their power and inherent constraints, setting a baseline of sorts.

My hope is that this section (and the entire guide) will help you make more informed judgements about their generated outputs.

<h3 id="llms-are-good-at">LLMs are good at:</h3>

- Language translation
- Content summarization
- Content generation
- Writing support
- Question answering
- Correcting spelling and grammar
- Programming support
- Classification (spam detection)
- Simplifying complex content
- Stylized writing (applying Poe to x)
- Personalization
- Prompt engineering
- Speech recognition
- Mimicking dialogue
- Sentiment analysis

<h3 id="llms-are-not-good-at">LLMs are NOT good at:</h3>

- Current events
- Common sense
- Math/counting
- Handling uncommon scenarios
- Humor
- Consistency
- High-level strategy
- Being factual 100% of the time
- Being environmentally friendly
- Understanding context
- Reasoning & logic
- Emotional intelligence
- Any data-driven research
- Representing minorities
- Extended recall/memory

<h3 id="llm-capabilities-and-limitations">LLM Capabilities &amp; Limitations</h3>

LLMs excel at content generation, paraphrasing, and style transfer. However, their design presents limitations around current events, factual accuracy, biases, privacy concerns, and carry massive environmental + computational costs.

Interestingly, LLMs serve as wonderful program/code assistants because programming languages are intentionally designed to be unambiguous. This inherent structure enables LLMs to surface more accurate code and support. Interestingly, the English language (used for LLM prompts) could potentially lead [English to become a dominant programming language](https://www.databricks.com/blog/introducing-english-new-programming-language-apache-spark) as LLMs support code generation. 

In contrast, spoken languages are incredibly ambiguous. Words often carry different meanings based on regional, social and cultural contexts. Moreover, genuine ‘meaning’ is a product of shared life experiences and mutual understanding between people.

While LLMs are expected to improve their mathematical capabilities, other limitations they exhibit are likely to persist until further models or functionalities are integrated. This approach, often called “model stacking,” adds functionality to LLMs to improve their accuracy and performance. 

—One example of this is **Retrieval Augmented Generation (RAG)** which connects LLMs to external information retrieval resources (like Google) to provide an LLM with additional relevant, up-to-date, and accurate information to improve outputs. Bing & Google have incorporated this functionality into their LLM chatbots to make them more useful.

![Retrieval Augmented Generation (RAG) workflow chart: 1. User Query. 2. Query gets sent to Search Relevant information from knowledge sources. 3. This relevant information for enhanced context is fed back into the system to get added to the query. 4. Both the query and the enhanced context get fed into the LLM 5. This generates the text response](/blog/llm-101-part-1/1d7b0251d3.webp)

Understanding the limitations of isolated LLMs is essential. While they might generate outputs confidently, it doesn’t necessarily mean the results are always accurate or socially acceptable. A notable illustration of this can be found in [Microsoft’s experiment with their chatbot named “Tay](https://www.theverge.com/2016/3/24/11297050/tay-microsoft-chatbot-racist).” Launched to mimic the language patterns of a 19-year-old American girl, Tay was designed to learn and adapt from user interactions on Twitter. However, within just 24 hours of its release, “Tay” began to generate inappropriate and racist comments, influenced by malicious users who took advantage of its learning mechanisms. This incident highlights the need for oversight and careful implementation of LLMs, particularly when exposed to unfiltered public input.

[![](/blog/llm-101-part-1/596ca395cd.webp)](https://twitter.com/TayandYou)

TayTweets Profile Photo (@TayandYou)

These early mishaps are quickly forgotten and easily overlooked, highlighting the moral responsibility of those providing LLM technology as a solution/tool to remind users of these harms and limitations.

A disturbing theme in the AI arms race is that what’s good for the general public and the larger field of AI is often at odds with corporate best interests (revenue). 

[![](/blog/llm-101-part-1/49423cdf01.webp)](http://m-mitchell.com/)

[Meg Mitchell](m-mitchell.com), a Senior Researcher at AI startup Hugging Face and former co-lead of Google’s AI Ethics Team, spoke about AI harm, “A year ago, people probably wouldn’t believe that these systems could beg you to try to take your life…But now people see how that can happen.” –[Bloomberg](https://www.bloomberg.com/opinion/articles/2023-02-17/microsoft-s-bing-should-ring-alarm-bells-on-rogue-ai#xj4y7vzkg?leadSource=uverify%20wall).

***The core risk of this technology isn’t just the dissemination of false information, but the potential to emotionally manipulate and hurt people.***

<h1 id="llm-risk-mitigation-efforts">LLM Risk Mitigation Efforts:</h1>

**1. Ethical AI Efforts:** Many individuals have expressed concerns and risks around LLMs, and there are growing efforts to build LLMs more thoughtfully and better educate the general public about LLMs while promoting safe AI. Companies like [DAIR Institute](https://www.dair-institute.org/) have launched AI research initiatives free from big tech’s corporate interest. Amplifying these expert’s concerns can help save people’s lives and minimize risks.

**2. Renewable energy sources:** [Leveraging renewable resources](https://blogs.nvidia.com/blog/2023/07/27/i-am-ai-clean-energy/) to train these models is moving in the right direction, but still incurs an environmental cost and eliminates that resource from other applications. Efforts to report energy usage and deploy impact trackers are also being tested ([Lottick et al. 2019](https://arxiv.org/abs/1911.08354) & [Henderson et al. 2020](https://arxiv.org/abs/2002.05651)).

**3. Prioritize computationally efficient hardware:** Efforts around more efficient hardware have existed for decades. [Google announced its TPU](https://techcrunch.com/2021/05/18/google-launches-the-next-generation-of-its-custom-ai-chips/#:~:text=At%20its%20I/O%20developer%20conference%2C%20Google%20today,custom%20Tensor%20Processing%20Units%20(TPU)%20AI%20chips.) (Tensor Processing Units) in 2021 to power its machine learning initiatives more efficiently. Many large tech companies and chip providers are working hard to create more efficient chips for these ever-larger models. One of the most promising computational advancements is quantum computing. Green AI are also promoting efficiency as an evaluation metric. ([Schwartz et al., 2020](https://arxiv.org/abs/1907.10597))

**4. Data Documentation (Data Cards):** To make AI more interpretable, Meg Mitchell, inspired by Timnit Gebru’s previous work around [data sheets for datasets](https://arxiv.org/abs/1803.09010), initiated [Model Cards](https://arxiv.org/abs/1810.03993) or [Data Cards](https://sites.research.google/datacardsplaybook/). Like a nutritional label, it’s a resource for transparency in AI dataset documentation.

**5. Accuracy Improvements:** Integrating information retrieval and other models into an LLM (commonly referred to as stacking or ensemble algorithms) can [help increase the probability of accurate output](https://towardsdatascience.com/overcoming-the-limitations-of-large-language-models-9d4e92ad9823). Other improvement efforts you’ll learn more about later in this guide are: Prompt improvements, prompt chaining, fine-tuning, RLFH (reinforcement learning from human feedback), multi-modal integration, etc., are all being researched to improve LLM performance. It’s important to note that the inherent limitations of LLMs mentioned throughout this guide (due to their probabilistic nature and construction) will continue to exist and possibly leak through various improvement efforts.

<h3 id="what-is-chatgpt">What is ChatGPT?</h3>

![Demonstration of ChatGPT](/blog/llm-101-part-1/5b9d9a1302.webp)

ChatGPT interacts with users in a conversational way and is the fourth iteration of OpenAI’s GPT (**Generative Pretrained Transformer**) models. When a user provides text into ChatGPT, the model tries to produce a ‘reasonable continuation’ of that text based on everything the model has seen — pretty much all of the internet.

There’s a common misconception that LLMs copy the entire internet and refer back to it to generate outputs. The reality is that LLMs essentially compress all of the internet’s text into a multidimensional latent space. What’s a multidimensional latent space? It’s a mathematical space that maps out contextual relationships between words (meaning similar words are closer to each other, and each word’s connection to other relevant words is mapped out) based on everything it’s learned from the text. Note: This space has so many dimensions (in the thousands) that we, humans, cannot conceive of what it looks like. To comprehend these spaces, we need to smush them into 2D or 3D representations like the one below.

![LDA T-SNE Example of how similar words like (painter, sculpter) are closer together](/blog/llm-101-part-1/9f50671822.webp)

t-SNE visualization

Once an LLM has organized a language’s text into a multidimensional latent space, it uses those contextual relationships to generate text through randomized outputs based on a probability distribution.

Remember: LLMs have no grounding in human emotion or real-world experiences. They learn from a very narrow space much different from a human. 

The introduction of the [Transformer in 2017](https://arxiv.org/abs/1706.03762), a neural network architecture, paved the way for advanced models like ChatGPT. You’ll learn more about the significance of Transformers in Part 2.

> ***Fun fact: Both GPT & BERT are Transformers!***

<h1 id="background-understanding-ai-and-nlp">Background: Understanding AI &amp; NLP</h1>

To understand LLMs we first need to understand what is Artificial Intelligence and how LLMs emerged. Let’s explore how machines have learned to decipher and interact with human language!

### 

### 

### 

<h3 id="what-is-artificial-intelligence-ai">What is Artificial Intelligence (AI)?</h3>

 

AI refers to computer systems that mimic human-like (or above) capabilities and learn or improve over time. In essence, AI is the science of creating machines that can think, learn, and adapt in a human-like way, tackling a vast array of tasks with efficiency.

 

While AI is a broad field of research, the term “AI” receives a lot of criticism due to being so ill-defined. What is intelligence? When will we know if we’ve reached genuine artificial intelligence? 

 

These probing questions are tough nuts to crack and answers remain elusive.

 

**Two primary types of AI models:**

![Narrow intelligence is task specific knowledge like Google translate, fraud detection or customer support. General intelligence is generalized knowledge of the world. This isn't available yet, has the ability to pass the turing test, possesses common sense and can plan and reason.](/blog/llm-101-part-1/640ecb7a6b.webp)

### 

### 

### 

### 

<h3 id="narrow-intelligence-or-artificial-narrow-intelligence-ani-or-weak-ai">Narrow Intelligence or Artificial Narrow Intelligence (ANI or weak AI):</h3>

Models specifically programmed to solve one type of task. The likes of self-driving cars, Grammarly, recommendation engines (think YouTube), and Siri all serve as shining examples of narrow intelligence models. All AI we currently interact with today (as of 2023) falls under Narrow AI.

 

<h3 id="general-intelligence-or-artificial-general-intelligence-agi-or-strong-ai">General Intelligence or Artificial General Intelligence (AGI or strong AI):</h3>

Here, a model boasts the general problem-solving capabilities of a human rather than being designed for a specific task. An AGI exhibits common sense, reasoning, creativity, and emotions and can apply knowledge across diverse contexts and modalities (even ones it has never seen before).

Many AI Researchers argue that we will never see AGI and others are working hard to make it a reality. 

While AGI is a controversial topic, in large part due to its ambiguous definition (s*eriously, how will we determine if we’ve reached it?*), many respected AI researchers note that we’re far from achieving [true AGI](https://www.scientificamerican.com/article/artificial-general-intelligence-is-not-as-imminent-as-you-might-think1/). They also caution that an undue emphasis on AGI detracts from efforts in more immediately beneficial narrow applications, such as life-saving healthcare solutions.

<h3 id="artificial-super-intelligence-asi">Artificial Super Intelligence (ASI):</h3>

When an AI model spectacularly surpasses human capabilities.

Fun brain buster: How can we determine when these models have outperformed us at tasks? How can we gauge answers and outcomes to information out of our reach?! Warning: these thought-provoking questions lead to sleepless nights. 

Historically, we’ve leaned on the Turing Test as a benchmark for determining “AI” or “AGI” (synonyms). 

<h3 id="what-is-the-turing-test">What is the Turing Test?</h3>

The iconic AI ‘Turing Test’ was invented by Alan Turing in 1950 and serves as an evaluation method to decide if a model has reached artificial intelligence.

 

<h3 id="how-does-the-turing-test-work">How does the Turing Test work?</h3>

A questioner poses specific subject matter questions routed to both a computer and a human. If the questioner guesses that the computer is the human in half the test runs or more (or fools 30% of human interrogators during a five-minute conversation), it’s considered to have achieved artificial intelligence.

 

For a deeper dive into the Turing Test and its variations, controversies, and limitations, do check out Stanford’s entry on the [Turing Test](https://plato.stanford.edu/entries/turing-test/). 

 

<h3 id="the-ai-llm-landscape">The AI + LLM Landscape:</h3>

![The AI Landscape](/blog/llm-101-part-1/8fefcaab3a.webp)

The term “AI” covers a broad array of sub-fields, so let’s tackle the ones most pertinent to LLMs:

<h3 id="natural-language-processing">Natural Language Processing</h3>

Ever wonder how your phone seems to “understand” you or why some apps can translate sentences into another language instantly? That’s all thanks to a special area of technology called Natural Language Processing (NLP). At its core, NLP is essentially a bridge between human language and computers, combining insights from linguistics, computer science, and machine learning.

For instance, think about determining whether someone’s words sound happy or sad, identifying the main topic of a chat, or even spotting a person’s name or a place in a book. While these seem like no-brainers for us, they’re actually big challenges for computers. Computers also need to translate between languages and fully grasp what people mean when they speak or write.

When you chat with voice assistants like Siri, Alexa, or Google Assistant, or when you’re using apps like Google Translate, you’re witnessing NLP in action. All of this is possible because of the work done to help computers understand language through NLP. Thanks to these efforts, we have many incredible tools that can communicate with us in ways we once only dreamed of!

<h3 id="generative-ai-vs-discriminative-ai">Generative AI vs Discriminative AI</h3>

Generative and discriminative models represent two cornerstone approaches in AI, each with unique architecture and applications.

Let’s weave a hypothetical scenario involving the two AI models: one will generate entirely new/artificial images of dogs (NewDogAI) and another will be tasked with accurately identifying a dog’s breed from a photo (DogBreedAI). So which model would be generative and which would be discriminative?

<h3 id="generative-ai">Generative AI</h3>

**![Generative AI example of what snoop dog might look like if he turned into a dog.](/blog/llm-101-part-1/e6845ca0e5.webp)**

Source: [BoardPanda](https://www.boredpanda.com/visual-dog-puns-with-an-ai-kevin-lamb/)

Generative models create new outputs based on sequential data that unfolds over space/time (text, image, video, audio, etc.). They identify patterns within the training data and generate new outputs echoing these patterns and characteristics. NewDogAI would be an example of generative AI, creating new images like the one above.

 

Generative models are probabilistic rather than deterministic. This makes generative models more challenging to evaluate because the generated output in most applications is largely subjective.

<h3 id="discriminative-ai">Discriminative AI</h3>

![Discriminative AI Example](/blog/llm-101-part-1/56fec57453.webp)

Source: [Dog-Breed-Classification.ipyn](https://github.com/floydhub/image-classification-template/blob/master/dog-breed-classification.ipynb)

Discriminative models aim to classify or categorize different kinds of data. Instead of learning to comprehend a dataset’s distribution, they differentiate between classes, learning the boundaries to make future predictions or decisions based on the training data. DogBreedAI would be an example of discriminative AI, classifying dog images into different categories (breeds).

<h1 id="history-of-text-generation-timeline">History of Text Generation [Timeline]</h1>

The genesis of what we now understand as Natural Language Generation (NLG), harks back to the 60s with the advent of [ELIZA](https://en.wikipedia.org/wiki/ELIZA). Developed at MIT by Joseph Weizenbaum, ELIZA wasn’t a true NLG model in the contemporary sense. It simulated conversation with simple pattern-matching and substitution techniques but didn’t ‘understand’ or ‘generate’ language as modern NLG systems do. Nevertheless, it served as a prototype of what was to come. 

The true era of commercial NLP applications didn’t arrive until the 1990s, and it has only become more prevalent recently with the explosion of more sophisticated models like ChatGPT. 

Markov chains, rule-based algorithms, and Recurrent Neural Networks (RNNs) were some of the earliest technologies used for text generation. However, everything changed in 2017 when Google published the [Attention Is All You Need](https://arxiv.org/abs/1706.03762) Paper that introduced the Transformer model, which would forever change the trajectory of NLG!

To give you a flavor of the journey, here’s a brief timeline:

![](/blog/llm-101-part-1/203fbcd83f.webp)

Like so many technologies today, these milestones have stood on the shoulders of giants. In [1948, Claude Shannon](https://people.math.harvard.edu/~ctm/home/text/others/shannon/entropy/entropy.pdf) led research evaluating how well simple n-gram models were at compressing and [predicting natural language](https://www.princeton.edu/~wbialek/rome/refs/shannon_51.pdf). An n-gram represents a sequence of words from a given text set and is used to predict the likelihood of the next word in a given sentence.  —Very useful for NLG, speech recognition, and spell check.

The Transformer’s impact on NLP is like the smartphone for personal communication, a revolutionary leap. Imagine how your first cellphone transformed your communication and access to information. The Transformer model did the same for NLP, but on a larger scale, evolving how computers understand and process human information.

<h3 id="the-transformer">The Game Changer: The Transformer</h3>

In 2017, a groundbreaking neural network architecture called the Transformer was introduced in the paper “[Attention Is All You Need](https://arxiv.org/abs/1706.03762)” by Google Researchers.

Before the Transformer, language models relied heavily on a type of neural network known as a Recurrent Neural Network (RNNs). RNNs are great at predicting the next word in a sentence, understanding handwriting, and even speech recognition. However, they have limitations when it comes to handling long sequences of data efficiently.

—This is where the Transformer architecture comes in with its unique learning approach that outperforms most earlier NLP models.

Think of the Transformer as having a super-powered computer that can not just understand the words in a sentence, but the entire story regardless of how long or complex! This unique capability extends its influence beyond text and into other fields like computer vision, audio, speech processing tasks, etc. This unique versatility has also fostered collaboration and innovation across many different (usually siloed) industries —how cool is that?!

So, what’s the secret behind the Transformer’s remarkable power?

Read Part #2 of this [Large Language Guide](/blog/what-are-llms-part-2) to find out:

[What are Large Language Models? [Part 2]](/blog/what-are-llms-part-2)

<h4 id="part-2">Part 2</h4>

<h2 id="what-youll-learn-in-part-2">What You’ll Learn In Part 2:</h2>

![](/blog/llm-101-part-1/c7773e56d1.webp)

<h3 id="transformer-basics">Transformer Basics</h3>

Encoder-Decoder Structure

![](/blog/llm-101-part-1/8bce6ba3e9.webp)

<h3 id="types-of-transformers">Types of Transformers</h3>

GPT, BERT, and more

![](/blog/llm-101-part-1/92badbe773.webp)

<h3 id="embeddings">Embeddings</h3>

Representative Text in High-Dimensional Vectors

![](/blog/llm-101-part-1/a6ea6178e3.webp)

<h3 id="the-power-of-attention">The Power of Attention</h3>

Exploring Attention Mechanism in LLMs

![](/blog/llm-101-part-1/ad0a242583.webp)

<h3 id="tokenization">Tokenization</h3>

Preparing Text for LLM Input

![](/blog/llm-101-part-1/94ae6438af.webp)

<h3 id="decoding-and-improving-llm-outputs">Decoding and Improving LLM Outputs</h3>

Learn About Common Decoding Strategies
