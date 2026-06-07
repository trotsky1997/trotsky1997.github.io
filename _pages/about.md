---
permalink: /
title: ""
seo_title: "Di Zhang | LLM Reasoning and Scientific Intelligence"
excerpt: "Di Zhang is a PhD candidate at Fudan University working on LLM reasoning, scientific intelligence, agentic learning, and foundation models for scientific discovery."
keywords: "Di Zhang, 张迪, Fudan University, LLM reasoning, scientific intelligence, agentic learning, chemical AI, test-time scaling"
author_profile: true
share: false
redirect_from:
  - /about/
  - /about.html
---

<span class='anchor' id='about-me'></span>

# Di Zhang: LLM Reasoning and Scientific Intelligence

I am a PhD candidate at Fudan University, working on chemical AI, multimodal reasoning, test-time search, reinforcement learning, and foundation models for scientific discovery. My recent work includes ChemLLM, ChemVLM, MCTSr, Llama-Berry, Critic-V, Chem-R, and related systems for reasoning and chemistry.

I am a Research Resident and Head of Agent Model at MindLab starting in 2026. Previously, I interned at NVIDIA Research from 2025 to 2026 and Shanghai AI Lab from 2023 to 2025, worked full-time as a machine learning developer at Alibaba from 2022 to 2023, and received my Master of Engineering from the USTC Robotics Lab from 2019 to 2022. I also interned at Ant Group and MIT Han Lab.

<div class="profile-links">
  <a href="{{ site.author.cv | relative_url }}">CV</a>
  <a href="mailto:di.zhang@ustc.edu">Email</a>
  <a href="https://scholar.google.com/citations?user=vxAO250AAAAJ&hl=en">Google Scholar</a>
  <a href="https://www.linkedin.com/in/di-zhang-740238330/?locale=en">LinkedIn</a>
  <a href="https://huggingface.co/di-zhang-fdu">HuggingFace</a>
  <a href="https://github.com/{{ site.author.github }}">GitHub</a>
  <a href="https://x.com/di_zhang_fdu">X/Twitter</a>
  <a href="{{ site.author.blog | relative_url }}">Blog</a>
  <a href="https://di-zhang-fdu.medium.com">Medium Blog</a>
</div>

<span class='anchor' id='-updates'></span>

## Updates

{% include update-list.html limit=4 compact=true %}

{% include update-links.html %}

<span class='anchor' id='-research'></span>

## Research

My current research is centered on the work I have pursued since 2025:

- **LLM reasoning**: test-time scaling, reinforcement learning, tree search, self-evaluation, critic models, and controllable reasoning, represented by Llama-Berry, Control-R, SELT, Chem-R, Critic-V, and TinyEye.
- **Scientific intelligence**: foundation models and reasoning systems for chemistry, materials science, molecules, and scientific discovery, represented by ChemVLM, Mol-R1, MolReflect, ChemAgent, MOOSE-Chem3, CMPhysBench, and LoRA-Chem.
- **Agentic learning**: tool-using agents, memory, retrieval-time critique, scalable training/serving infrastructure, parameter-efficient personal models, and protocols for agentic model development, represented by PEFT scaling, MinT, delta-mem, Retrieval Is Not Enough, and MCP-based reasoning.

<span class='anchor' id='-publications'></span>

## Selected Papers

Visit [Google Scholar](https://scholar.google.com/citations?user=vxAO250AAAAJ&hl=en) for the complete publication list.

<div class='paper-box'><div class='paper-box-image'><div><div class="badge">NAACL 2025</div><img src='images/papers/llama-berry.webp' alt="Llama-Berry" width="760" height="410" loading="lazy" decoding="async"></div></div>
<div class='paper-box-text' markdown="1">

<span class="paper-title">Llama-Berry: Pairwise Optimization for Olympiad-Level Mathematical Reasoning via o1-like Monte Carlo Tree Search</span>

<span class="author-highlight">Di Zhang</span>, Jianbo Wu, Jingdi Lei, Tong Che, Jiatong Li, Tong Xie, Xiaoshui Huang, Shufei Zhang, Marco Pavone, Yuqiang Li, and others.

Proceedings of NAACL-HLT 2025, Long Papers, pages 7315-7337.

<p class="paper-links"><a href="https://huggingface.co/papers/2410.02884">HF Paper</a></p>
</div>
</div>

<div class='paper-box'><div class='paper-box-image'><div><div class="badge">CVPR 2025</div><img src='images/papers/critic-v.webp' alt="Critic-V" width="760" height="410" loading="lazy" decoding="async"></div></div>
<div class='paper-box-text' markdown="1">

<span class="paper-title">Critic-V: VLM Critics Help Catch VLM Errors in Multimodal Reasoning</span>

<span class="author-highlight">Di Zhang</span>, Jingdi Lei, Junxian Li, Xunzhi Wang, Yujie Liu, Zonglin Yang, Jiatong Li, Weida Wang, Suorong Yang, Jianbo Wu, and others.

Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition, 2025, pages 9050-9061.

<p class="paper-links"><a href="https://huggingface.co/papers/2411.18203">HF Paper</a></p>
</div>
</div>

<div class='paper-box'><div class='paper-box-image'><div><div class="badge">CVPR 2026</div><img src='images/papers/iag.webp' alt="IAG" width="760" height="410" loading="lazy" decoding="async"></div></div>
<div class='paper-box-text' markdown="1">

<span class="paper-title">IAG: Input-Aware Backdoor Attack on VLM-Based Visual Grounding</span>

Junxian Li, Beining Xu, Simin Chen, Jiatong Li, Jingdi Lei, Haodong Zhao, <span class="author-highlight">Di Zhang<sup>‡</sup></span>.

Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition, 2026, pages 27872-27883.

<p class="paper-links"><a href="https://huggingface.co/papers/2508.09456">HF Paper</a></p>
</div>
</div>

<div class='paper-box'><div class='paper-box-image'><div><div class="badge">AAAI 2025</div><img src='images/papers/chemvlm.webp' alt="ChemVLM" width="760" height="410" loading="lazy" decoding="async"></div></div>
<div class='paper-box-text' markdown="1">

<span class="paper-title">ChemVLM: Exploring the Power of Multimodal Large Language Models in Chemistry Area</span>

Junxian Li, <span class="author-highlight">Di Zhang</span>, Xunzhi Wang, Zeying Hao, Jingdi Lei, Qian Tan, Cai Zhou, Wei Liu, Yaotian Yang, Xinrui Xiong, and others.

Proceedings of the AAAI Conference on Artificial Intelligence, 39(1), 415-423, 2025.

<p class="paper-links"><a href="https://huggingface.co/papers/2408.07246">HF Paper</a></p>
</div>
</div>

<div class='paper-box'><div class='paper-box-image'><div><div class="badge">arXiv 2024</div><img src='images/papers/mctsr.webp' alt="MCTSr" width="760" height="410" loading="lazy" decoding="async"></div></div>
<div class='paper-box-text' markdown="1">

<span class="paper-title">Accessing GPT-4 Level Mathematical Olympiad Solutions via Monte Carlo Tree Self-Refine with Llama-3 8B</span>

<span class="author-highlight">Di Zhang</span>, Xiaoshui Huang, Dongzhan Zhou, Yuqiang Li, Wanli Ouyang.

arXiv preprint arXiv:2406.07394, 2024.

<p class="paper-links"><a href="https://huggingface.co/papers/2406.07394">HF Paper</a></p>
</div>
</div>

<div class='paper-box'><div class='paper-box-image'><div><div class="badge">TKDE 2026</div><img src='images/papers/molreflect.webp' alt="MolReflect" width="760" height="410" loading="lazy" decoding="async"></div></div>
<div class='paper-box-text' markdown="1">

<span class="paper-title">MolReflect: Towards In-Context Fine-Grained Alignments Between Molecules and Texts</span>

Jiatong Li, Yunqing Liu, Wei Liu, Jingdi Lei, <span class="author-highlight">Di Zhang</span>, Wenqi Fan, Dongzhan Zhou, Yuqiang Li, Qing Li.

IEEE Transactions on Knowledge and Data Engineering, 2026.

<p class="paper-links"><a href="https://huggingface.co/papers/2411.14721">HF Paper</a></p>
</div>
</div>

## Publications

### 2026

<ol class="publication-list">
  <li><span class="publication-title">On the Scaling of PEFT: Towards Million Personal Models of Trillion Parameters.</span><br>Mind Lab, Song Cao, Vic Cao, Kaijie Chen, Bunny Fan, Hera Feng, Huan Feng, Arthur Fu, Jun Gao, Hongquan Gu, and others. <span class="venue">arXiv preprint arXiv:2606.02437, 2026.</span> <a href="https://huggingface.co/papers/2606.02437">HF Paper</a></li>
  <li><span class="publication-title">MinT: Managed Infrastructure for Training and Serving Millions of LLMs.</span><br>Mind Lab, Song Cao, Vic Cao, Andrew Chen, Kaijie Chen, Cleon Cheng, Steven Chiang, Kaixuan Fan, Hera Feng, Huan Feng, and others. <span class="venue">arXiv preprint arXiv:2605.13779, 2026.</span> <a href="https://huggingface.co/papers/2605.13779">HF Paper</a></li>
  <li><span class="publication-title">delta-mem: Efficient Online Memory for Large Language Models.</span><br>Jingdi Lei, <span class="author-highlight">Di Zhang</span>, Junxian Li, Weida Wang, Kaixuan Fan, Xiang Liu, Qihan Liu, Xiaoteng Ma, Baian Chen, Soujanya Poria. <span class="venue">arXiv preprint arXiv:2605.12357, 2026.</span> <a href="https://huggingface.co/papers/2605.12357">HF Paper</a></li>
  <li><span class="publication-title">Golden Goose: A Simple Trick to Synthesize Unlimited RLVR Tasks from Unverifiable Internet Text.</span><br>Ximing Lu, David Acuna, Jaehun Jung, Jian Hu, <span class="author-highlight">Di Zhang</span>, Shizhe Diao, Yunheng Zou, Shaokun Zhang, Brandon Cui, Mingjie Liu, and others. <span class="venue">arXiv preprint arXiv:2601.22975, 2026.</span> <a href="https://arxiv.org/abs/2601.22975">arXiv</a></li>
  <li><span class="publication-title">Retrieval Is Not Enough: Enhancing RAG Through Test-Time Critique and Optimization.</span><br>Jiaqi Wei, Hao Zhou, Xiang Zhang, <span class="author-highlight">Di Zhang</span>, Zijie Qiu, Noah Wei, Jinzhe Li, Wanli Ouyang, Siqi Sun. <span class="venue">Advances in Neural Information Processing Systems, 38:21484-21520, 2026.</span> <a href="https://openreview.net/forum?id=cnUq7GkS6d">OpenReview</a></li>
  <li><span class="publication-title">IAG: Input-Aware Backdoor Attack on VLM-Based Visual Grounding.</span><br>Junxian Li, Beining Xu, Simin Chen, Jiatong Li, Jingdi Lei, Haodong Zhao, <span class="author-highlight">Di Zhang<sup>‡</sup></span>. <span class="venue">Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition, 27872-27883, 2026.</span> <a href="https://huggingface.co/papers/2508.09456">HF Paper</a></li>
  <li><span class="publication-title">MolReflect: Towards In-Context Fine-Grained Alignments Between Molecules and Texts.</span><br>Jiatong Li, Yunqing Liu, Wei Liu, Jingdi Lei, <span class="author-highlight">Di Zhang</span>, Wenqi Fan, Dongzhan Zhou, Yuqiang Li, Qing Li. <span class="venue">IEEE Transactions on Knowledge and Data Engineering, 2026.</span> <a href="https://huggingface.co/papers/2411.14721">HF Paper</a></li>
</ol>

### 2025

<ol class="publication-list">
  <li><span class="publication-title">TinyEye: Sharpening Visual Reasoning of Tiny Models with Offline Policy Optimization.</span><br><span class="author-highlight">Di Zhang</span>, Junxian Li, Shihao Wang, Weida Wang, Guo Chen, Hao Zhang, Shizhe Diao, Mingjie Liu, Ximing Lu, Jaehun Jung, and others. <span class="venue">OpenReview, 2025.</span> <a href="https://openreview.net/forum?id=7HT5i6w6qU">OpenReview</a></li>
  <li><span class="publication-title">Error-Free Linear Attention Is a Free Lunch: Exact Solution from Continuous-Time Dynamics.</span><br>Jingdi Lei, <span class="author-highlight">Di Zhang</span>, Soujanya Poria. <span class="venue">arXiv preprint arXiv:2512.12602, 2025.</span> <a href="https://arxiv.org/abs/2512.12602">arXiv</a></li>
  <li><span class="publication-title">Chem-R: Learning to Reason as a Chemist.</span><br>Weida Wang, Benteng Chen, <span class="author-highlight">Di Zhang</span>, Wanhao Liu, Shuchen Pu, Ben Gao, Jin Zeng, Xiaoyong Wei, Tianshu Yu, Shuzhou Sun, and others. <span class="venue">arXiv preprint arXiv:2510.16880, 2025.</span> <a href="https://arxiv.org/abs/2510.16880">arXiv</a></li>
  <li><span class="publication-title">NVIDIA Nemotron Nano V2 VL.</span><br>Amala Sanjay Deshmukh, Kateryna Chumachenko, Tuomas Rintamaki, Matthieu Le, Tyler Poon, Danial Mohseni Taheri, Ilia Karmanov, Guilin Liu, Jarno Seppanen, Guo Chen, and others. <span class="venue">arXiv preprint arXiv:2511.03929, 2025.</span> <a href="https://arxiv.org/abs/2511.03929">arXiv</a></li>
  <li><span class="publication-title">NVIDIA Isaac GR00T N1.6.</span><br>NVIDIA. <span class="venue">NVIDIA News, 2025.</span> <a href="https://nvidianews.nvidia.com/news/nvidia-accelerates-robotics-research-and-development-with-new-open-models-and-simulation-libraries">News</a></li>
  <li><span class="publication-title">CMPhysBench: A Benchmark for Evaluating Large Language Models in Condensed Matter Physics.</span><br>Weida Wang, Dongchen Huang, Jiatong Li, Tengchao Yang, Ziyang Zheng, <span class="author-highlight">Di Zhang</span>, Dong Han, Benteng Chen, Binzhao Luo, Zhiyu Liu, and others. <span class="venue">arXiv preprint arXiv:2508.18124, 2025.</span> <a href="https://arxiv.org/abs/2508.18124">arXiv</a></li>
  <li><span class="publication-title">Your Reward Function for RL Is Your Best PRM for Search: Unifying RL and Search-Based TTS.</span><br>Can Jin, Yang Zhou, Qixin Zhang, Hongwu Peng, <span class="author-highlight">Di Zhang</span>, Zihan Dong, Marco Pavone, Ligong Han, Zhang-Wei Hong, Tong Che, and others. <span class="venue">arXiv preprint arXiv:2508.14313, 2025.</span> <a href="https://arxiv.org/abs/2508.14313">arXiv</a></li>
  <li><span class="publication-title">Mol-R1: Towards Explicit Long-CoT Reasoning in Molecule Discovery.</span><br>Jiatong Li, Weida Wang, Qinggang Zhang, Junxian Li, <span class="author-highlight">Di Zhang</span>, Changmeng Zheng, Shufei Zhang, Xiaoyong Wei, Qing Li. <span class="venue">arXiv preprint arXiv:2508.08401, 2025.</span> <a href="https://arxiv.org/abs/2508.08401">arXiv</a></li>
  <li><span class="publication-title">Scaling Up RL: Unlocking Diverse Reasoning in LLMs via Prolonged Training.</span><br>Mingjie Liu, Shizhe Diao, Jian Hu, Ximing Lu, Xin Dong, Hao Zhang, Alexander Bukharin, Shaokun Zhang, Jiaqi Zeng, Makesh Narsimhan Sreedhar, and others. <span class="venue">arXiv preprint arXiv:2507.12507, 2025.</span> <a href="https://arxiv.org/abs/2507.12507">arXiv</a></li>
  <li><span class="publication-title">SELT: Self-Evaluation Tree Search for LLMs with Task Decomposition.</span><br>Mengsong Wu, <span class="author-highlight">Di Zhang</span>, Yuqiang Li, Dongzhan Zhou, Wenliang Chen. <span class="venue">arXiv preprint arXiv:2506.07557, 2025.</span> <a href="https://arxiv.org/abs/2506.07557">arXiv</a></li>
  <li><span class="publication-title">Control-R: Towards Controllable Test-Time Scaling.</span><br><span class="author-highlight">Di Zhang</span>, Weida Wang, Junxian Li, Xunzhi Wang, Jiatong Li, Jianbo Wu, Jingdi Lei, Haonan He, Peng Ye, Shufei Zhang, and others. <span class="venue">arXiv preprint arXiv:2506.00189, 2025.</span> <a href="https://huggingface.co/papers/2506.00189">HF Paper</a></li>
  <li><span class="publication-title">Exploring the Application of Model Context Protocol for Enhanced Reasoning in Large Language Models.</span><br>Jianbo Wu, <span class="author-highlight">Di Zhang</span>, Wei Shu, Jie Liu. <span class="venue">ICML 2025 Workshop NewInML Poster, 2025.</span> <a href="https://icml.cc/virtual/2025/50697">ICML</a></li>
  <li><span class="publication-title">ChemAgent: Enhancing LLMs for Chemistry and Materials Science Through Tree-Search Based Tool Learning.</span><br>Mengsong Wu, YaFei Wang, <span class="author-highlight">Di Zhang</span>, Yidong Ming, Yuqi An, Yuwei Wan, Wenliang Chen, Binbin Lin, Yuqiang Li, Tong Xie, Dongzhan Zhou. <span class="venue">OpenReview, 2025.</span> <a href="https://huggingface.co/papers/2506.07551">HF Paper</a></li>
  <li><span class="publication-title">LoRA-Chem: Modular Machine Learning for Multitask Prediction in Organic Reactions.</span><br>Ben Gao, Penghui Li, <span class="author-highlight">Di Zhang</span>, Qian Tan, Wanhao Liu, Xunzhi Wang, Junxian Li, Shufei Zhang, Dongzhan Zhou, Yuqiang Li, and others. <span class="venue">CCS Chemistry, 1-9, 2025.</span> <a href="https://doi.org/10.31635/ccschem.025.202506542">DOI</a></li>
  <li><span class="publication-title">MOOSE-Chem3: Toward Experiment-Guided Hypothesis Ranking via Simulated Experimental Feedback.</span><br>Wanhao Liu, Zonglin Yang, Jue Wang, Lidong Bing, <span class="author-highlight">Di Zhang</span>, Dongzhan Zhou, Yuqiang Li, Houqiang Li, Erik Cambria, Wanli Ouyang. <span class="venue">NeurIPS 2025 AI for Science Workshop, 2025.</span> <a href="https://arxiv.org/abs/2505.17873">arXiv</a></li>
  <li><span class="publication-title">Critic-V: VLM Critics Help Catch VLM Errors in Multimodal Reasoning.</span><br><span class="author-highlight">Di Zhang</span>, Jingdi Lei, Junxian Li, Xunzhi Wang, Yujie Liu, Zonglin Yang, Jiatong Li, Weida Wang, Suorong Yang, Jianbo Wu, and others. <span class="venue">Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition, 9050-9061, 2025.</span> <a href="https://huggingface.co/papers/2411.18203">HF Paper</a></li>
  <li><span class="publication-title">Llama-Berry: Pairwise Optimization for Olympiad-Level Mathematical Reasoning via o1-like Monte Carlo Tree Search.</span><br><span class="author-highlight">Di Zhang</span>, Jianbo Wu, Jingdi Lei, Tong Che, Jiatong Li, Tong Xie, Xiaoshui Huang, Shufei Zhang, Marco Pavone, Yuqiang Li, and others. <span class="venue">Proceedings of the 2025 Conference of the Nations of the Americas Chapter of the Association for Computational Linguistics: Human Language Technologies, Long Papers, 7315-7337.</span> <a href="https://huggingface.co/papers/2410.02884">HF Paper</a></li>
  <li><span class="publication-title">ChemVLM: Exploring the Power of Multimodal Large Language Models in Chemistry Area.</span><br>Junxian Li, <span class="author-highlight">Di Zhang</span>, Xunzhi Wang, Zeying Hao, Jingdi Lei, Qian Tan, Cai Zhou, Wei Liu, Yaotian Yang, Xinrui Xiong, and others. <span class="venue">Proceedings of the AAAI Conference on Artificial Intelligence, 39(1):415-423, 2025.</span> <a href="https://huggingface.co/papers/2408.07246">HF Paper</a></li>
</ol>

### 2024 and Earlier

<ol class="publication-list">
  <li><span class="publication-title">Biology Instructions: A Dataset and Benchmark for Multi-Omics Sequence Understanding Capability of Large Language Models.</span><br>Haonan He, Yuchen Ren, Yining Tang, Ziyang Xu, Junxian Li, Minghao Yang, <span class="author-highlight">Di Zhang</span>, Dong Yuan, Tao Chen, Shufei Zhang, and others. <span class="venue">EMNLP 2025 Findings.</span> <a href="https://huggingface.co/papers/2412.19191">HF Paper</a></li>
  <li><span class="publication-title">Accessing GPT-4 Level Mathematical Olympiad Solutions via Monte Carlo Tree Self-Refine with Llama-3 8B.</span><br><span class="author-highlight">Di Zhang</span>, Xiaoshui Huang, Dongzhan Zhou, Yuqiang Li, Wanli Ouyang. <span class="venue">arXiv preprint arXiv:2406.07394, 2024.</span> <a href="https://huggingface.co/papers/2406.07394">HF Paper</a></li>
  <li><span class="publication-title">ChemLLM: A Chemical Large Language Model.</span><br>D. Zhang, W. Liu, Q. Tan, J. Chen, H. Yan, Y. Yan, J. Li, W. Huang, X. Yue, D. Zhou. <span class="venue">arXiv preprint arXiv:2402.06852, 2024.</span> <a href="https://huggingface.co/papers/2402.06852">HF Paper</a></li>
  <li><span class="publication-title">Sentiment Analysis Dataset for Service-Oriented Places Like Electric Power Supply Offices.</span><br>Bo Zhang, Chenguang Li, <span class="author-highlight">Di Zhang</span>, Bin Lu, Kaibao Zhou, Jing Zhang, Qiming Zhu, Xiaoping Chen. <span class="venue">Journal of Computer Applications, 42(S1):37-42, 2022.</span> <a href="https://sns.wanfangdata.com.cn/sns/perio/jsjyy/?isSync=0&issueNum=z1&page=1&publishYear=2022&tabId=article">Wanfang</a></li>
  <li><span class="publication-title">Target Selection Model for Robot Interaction and Robot Interaction System.</span><br>Bo Zhang, Bin Lyu, Huizhou Liu, Yu Ouyang, Qian Zhao, <span class="author-highlight">Di Zhang</span>, Rongya Chen, Xiaoping Chen, Liang Tang, Songlin Zuo, and others. <span class="venue">CN Patent CN114,399,529 B, 2022.</span> <a href="https://patents.google.com/patent/CN114399529B/en">Patent</a></li>
  <li><span class="publication-title">Design and Implementation of Safety and Robustness of Mobile Service Robot Navigation in Complex Pedestrian Scenarios.</span><br><span class="author-highlight">Di Zhang</span>. <span class="venue">Master thesis, University of Science and Technology of China, 2022.</span></li>
  <li><span class="publication-title">Juvenile State Hypothesis: What We Can Learn from Lottery Ticket Hypothesis Researches?</span><br><span class="author-highlight">Di Zhang</span>. <span class="venue">arXiv preprint arXiv:2109.03862, 2021.</span> <a href="https://arxiv.org/abs/2109.03862">arXiv</a></li>
  <li><span class="publication-title">Water Supply Engineering Design Scheme 2 of Municipal Services District of C City.</span><br><span class="author-highlight">Di Zhang</span>. <span class="venue">Thesis, Hefei Technology University, 2019.</span></li>
</ol>

<span class='anchor' id='-experience'></span>

## Experience

- **MindLab**, Research Residency, Head of Agent Model, 2026-present.
- **NVIDIA Research**, Research Intern, 2025-2026.
- **Shanghai AI Lab**, Research Intern, 2023-2025.
- **Alibaba Inc.**, Machine Learning Developer, 2022-2023.
- **Ant Group**, Intern, 2021.
- **MIT Han Lab**, Intern, 2021-2022.

<span class='anchor' id='-education'></span>

## Education

- **Fudan University**, PhD Candidate, 2023-present.
- **University of Science and Technology of China**, Master of Engineering, Robotics Lab, 2019-2022.
