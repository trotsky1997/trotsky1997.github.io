---
permalink: /
title: ""
excerpt: "Di Zhang is a PhD candidate at Fudan University working on LLM reasoning, scientific intelligence, agentic learning, and foundation models for scientific discovery."
keywords: "Di Zhang, 张迪, Fudan University, LLM reasoning, scientific intelligence, agentic learning, chemical AI, test-time scaling"
author_profile: true
redirect_from:
  - /about/
  - /about.html
---

<span class='anchor' id='about-me'></span>

# Di Zhang

I am a PhD candidate at Fudan University, working on chemical AI, multimodal reasoning, test-time search, reinforcement learning, and foundation models for scientific discovery. My recent work includes ChemLLM, ChemVLM, MCTSr, Llama-Berry, Critic-V, Chem-R, and related systems for reasoning and chemistry.

I am a Research Resident and Head of Agent Model at MindLab starting in 2026. Previously, I interned at NVIDIA Research from 2025 to 2026 and Shanghai AI Lab from 2023 to 2025, worked full-time as a machine learning developer at Alibaba from 2022 to 2023, and received my Master of Engineering from the USTC Robotics Lab from 2019 to 2022. I also interned at Ant Group and MIT Han Lab.

<div class="profile-links">
  <a href="{{ site.author.cv | relative_url }}">CV</a>
  <a href="mailto:di.zhang@ustc.edu">Email</a>
  <a href="https://scholar.google.com/citations?user=vxAO250AAAAJ&hl=en">Google Scholar</a>
  <a href="https://www.linkedin.com/in/di-zhang-740238330/?locale=en">LinkedIn</a>
  <a href="https://huggingface.co/di-zhang-fdu">HuggingFace</a>
  <a href="https://x.com/di_zhang_fdu">X/Twitter</a>
  <a href="https://di-zhang-fdu.medium.com">Medium Blog</a>
</div>

<span class='anchor' id='-research'></span>

# Research

My current research is centered on the work I have pursued since 2025:

- **LLM reasoning**: test-time scaling, reinforcement learning, tree search, self-evaluation, critic models, and controllable reasoning, represented by Llama-Berry, Control-R, SELT, Chem-R, Critic-V, and TinyEye.
- **Scientific intelligence**: foundation models and reasoning systems for chemistry, materials science, molecules, and scientific discovery, represented by ChemVLM, Mol-R1, MolReflect, ChemAgent, MOOSE-Chem3, CMPhysBench, and LoRA-Chem.
- **Agentic learning**: tool-using agents, memory, retrieval-time critique, scalable training/serving infrastructure, and protocols for agentic model development, represented by MinT, delta-mem, Retrieval Is Not Enough, and MCP-based reasoning.

<span class='anchor' id='-publications'></span>

# Selected Publications

Visit [Google Scholar](https://scholar.google.com/citations?user=vxAO250AAAAJ&hl=en) for the complete publication list.

<div class='paper-box'><div class='paper-box-image'><div><div class="badge">NAACL 2025</div><img src='images/papers/llama-berry.png' alt="Llama-Berry" width="100%"></div></div>
<div class='paper-box-text' markdown="1">

**Llama-Berry: Pairwise Optimization for Olympiad-Level Mathematical Reasoning via o1-like Monte Carlo Tree Search**

**Di Zhang**, Jianbo Wu, Jingdi Lei, Tong Che, Jiatong Li, Tong Xie, Xiaoshui Huang, Shufei Zhang, Marco Pavone, Yuqiang Li, and others.

Proceedings of NAACL-HLT 2025, Long Papers, pages 7315-7337.

<p class="paper-links"><a href="https://huggingface.co/papers/2410.02884">HF Paper</a><a href="https://arxiv.org/abs/2410.02884">arXiv</a><a href="https://arxiv.org/pdf/2410.02884">PDF</a></p>
</div>
</div>

<div class='paper-box'><div class='paper-box-image'><div><div class="badge">CVPR 2025</div><img src='images/papers/critic-v.png' alt="Critic-V" width="100%"></div></div>
<div class='paper-box-text' markdown="1">

**Critic-V: VLM Critics Help Catch VLM Errors in Multimodal Reasoning**

**Di Zhang**, Jingdi Lei, Junxian Li, Xunzhi Wang, Yujie Liu, Zonglin Yang, Jiatong Li, Weida Wang, Suorong Yang, Jianbo Wu, and others.

Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition, 2025, pages 9050-9061.

<p class="paper-links"><a href="https://huggingface.co/papers/2411.18203">HF Paper</a><a href="https://arxiv.org/abs/2411.18203">arXiv</a><a href="https://openaccess.thecvf.com/content/CVPR2025/papers/Zhang_Critic-V_VLM_Critics_Help_Catch_VLM_Errors_in_Multimodal_Reasoning_CVPR_2025_paper.pdf">CVF PDF</a></p>
</div>
</div>

<div class='paper-box'><div class='paper-box-image'><div><div class="badge">CVPR 2026</div><img src='images/papers/iag.png' alt="IAG" width="100%"></div></div>
<div class='paper-box-text' markdown="1">

**IAG: Input-Aware Backdoor Attack on VLM-Based Visual Grounding**

Junxian Li, Beining Xu, Simin Chen, Jiatong Li, Jingdi Lei, Haodong Zhao, **Di Zhang<sup>‡</sup>**.

Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition, 2026, pages 27872-27883.

<p class="paper-links"><a href="https://huggingface.co/papers/2508.09456">HF Paper</a><a href="https://arxiv.org/abs/2508.09456">arXiv</a><a href="https://arxiv.org/pdf/2508.09456">PDF</a></p>
</div>
</div>

<div class='paper-box'><div class='paper-box-image'><div><div class="badge">AAAI 2025</div><img src='images/papers/chemvlm.png' alt="ChemVLM" width="100%"></div></div>
<div class='paper-box-text' markdown="1">

**ChemVLM: Exploring the Power of Multimodal Large Language Models in Chemistry Area**

Junxian Li, **Di Zhang**, Xunzhi Wang, Zeying Hao, Jingdi Lei, Qian Tan, Cai Zhou, Wei Liu, Yaotian Yang, Xinrui Xiong, and others.

Proceedings of the AAAI Conference on Artificial Intelligence, 39(1), 415-423, 2025.

<p class="paper-links"><a href="https://huggingface.co/papers/2408.07246">HF Paper</a><a href="https://arxiv.org/abs/2408.07246">arXiv</a><a href="https://ojs.aaai.org/index.php/AAAI/article/download/32020/34175">AAAI PDF</a><a href="https://github.com/AI4Chem/ChemVlm">Code</a><a href="https://huggingface.co/AI4Chem/ChemVLM-26B">Model</a></p>
</div>
</div>

<div class='paper-box'><div class='paper-box-image'><div><div class="badge">arXiv 2024</div><img src='images/papers/mctsr.png' alt="MCTSr" width="100%"></div></div>
<div class='paper-box-text' markdown="1">

**Accessing GPT-4 Level Mathematical Olympiad Solutions via Monte Carlo Tree Self-Refine with Llama-3 8B**

**Di Zhang**, Xiaoshui Huang, Dongzhan Zhou, Yuqiang Li, Wanli Ouyang.

arXiv preprint arXiv:2406.07394, 2024.

<p class="paper-links"><a href="https://huggingface.co/papers/2406.07394">HF Paper</a><a href="https://arxiv.org/abs/2406.07394">arXiv</a><a href="https://arxiv.org/pdf/2406.07394">PDF</a></p>
</div>
</div>

<div class='paper-box'><div class='paper-box-image'><div><div class="badge">TKDE 2026</div><img src='images/papers/molreflect.png' alt="MolReflect" width="100%"></div></div>
<div class='paper-box-text' markdown="1">

**MolReflect: Towards In-Context Fine-Grained Alignments Between Molecules and Texts**

Jiatong Li, Yunqing Liu, Wei Liu, Jingdi Lei, **Di Zhang**, Wenqi Fan, Dongzhan Zhou, Yuqiang Li, Qing Li.

IEEE Transactions on Knowledge and Data Engineering, 2026.

<p class="paper-links"><a href="https://huggingface.co/papers/2411.14721">HF Paper</a><a href="https://arxiv.org/abs/2411.14721">arXiv</a><a href="https://arxiv.org/pdf/2411.14721">PDF</a><a href="https://github.com/phenixace/MolReFlect">Code</a></p>
</div>
</div>

## Publications

### 2026

<ol class="publication-list">
  <li><strong>MinT: Managed Infrastructure for Training and Serving Millions of LLMs.</strong><br>Mind Lab, Song Cao, Vic Cao, Andrew Chen, Kaijie Chen, Cleon Cheng, Steven Chiang, Kaixuan Fan, Hera Feng, Huan Feng, and others. <span class="venue">arXiv preprint arXiv:2605.13779, 2026.</span> <a href="https://huggingface.co/papers/2605.13779">HF Paper</a> / <a href="https://arxiv.org/abs/2605.13779">arXiv</a> / <a href="https://arxiv.org/pdf/2605.13779">PDF</a></li>
  <li><strong>delta-mem: Efficient Online Memory for Large Language Models.</strong><br>Jingdi Lei, <strong>Di Zhang</strong>, Junxian Li, Weida Wang, Kaixuan Fan, Xiang Liu, Qihan Liu, Xiaoteng Ma, Baian Chen, Soujanya Poria. <span class="venue">arXiv preprint arXiv:2605.12357, 2026.</span> <a href="https://huggingface.co/papers/2605.12357">HF Paper</a> / <a href="https://arxiv.org/abs/2605.12357">arXiv</a> / <a href="https://arxiv.org/pdf/2605.12357">PDF</a></li>
  <li><strong>Golden Goose: A Simple Trick to Synthesize Unlimited RLVR Tasks from Unverifiable Internet Text.</strong><br>Ximing Lu, David Acuna, Jaehun Jung, Jian Hu, <strong>Di Zhang</strong>, Shizhe Diao, Yunheng Zou, Shaokun Zhang, Brandon Cui, Mingjie Liu, and others. <span class="venue">arXiv preprint arXiv:2601.22975, 2026.</span> <a href="https://arxiv.org/abs/2601.22975">arXiv</a> / <a href="https://arxiv.org/pdf/2601.22975">PDF</a> / <a href="https://www.cs.toronto.edu/~davidj/publication/goldengoose/">Project</a></li>
  <li><strong>Retrieval Is Not Enough: Enhancing RAG Through Test-Time Critique and Optimization.</strong><br>Jiaqi Wei, Hao Zhou, Xiang Zhang, <strong>Di Zhang</strong>, Zijie Qiu, Noah Wei, Jinzhe Li, Wanli Ouyang, Siqi Sun. <span class="venue">Advances in Neural Information Processing Systems, 38:21484-21520, 2026.</span> <a href="https://openreview.net/forum?id=cnUq7GkS6d">OpenReview</a> / <a href="https://proceedings.neurips.cc/paper_files/paper/2025/file/1f09e1ee5035a4c3fe38a5681cae5815-Paper-Conference.pdf">PDF</a></li>
  <li><strong>IAG: Input-Aware Backdoor Attack on VLM-Based Visual Grounding.</strong><br>Junxian Li, Beining Xu, Simin Chen, Jiatong Li, Jingdi Lei, Haodong Zhao, <strong>Di Zhang<sup>‡</sup></strong>. <span class="venue">Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition, 27872-27883, 2026.</span> <a href="https://huggingface.co/papers/2508.09456">HF Paper</a> / <a href="https://arxiv.org/abs/2508.09456">arXiv</a> / <a href="https://arxiv.org/pdf/2508.09456">PDF</a></li>
  <li><strong>MolReflect: Towards In-Context Fine-Grained Alignments Between Molecules and Texts.</strong><br>Jiatong Li, Yunqing Liu, Wei Liu, Jingdi Lei, <strong>Di Zhang</strong>, Wenqi Fan, Dongzhan Zhou, Yuqiang Li, Qing Li. <span class="venue">IEEE Transactions on Knowledge and Data Engineering, 2026.</span> <a href="https://huggingface.co/papers/2411.14721">HF Paper</a> / <a href="https://arxiv.org/abs/2411.14721">arXiv</a> / <a href="https://arxiv.org/pdf/2411.14721">PDF</a> / <a href="https://github.com/phenixace/MolReFlect">Code</a></li>
</ol>

### 2025

<ol class="publication-list">
  <li><strong>TinyEye: Sharpening Visual Reasoning of Tiny Models with Offline Policy Optimization.</strong><br><strong>Di Zhang</strong>, Junxian Li, Shihao Wang, Weida Wang, Guo Chen, Hao Zhang, Shizhe Diao, Mingjie Liu, Ximing Lu, Jaehun Jung, and others. <span class="venue">OpenReview, 2025.</span> <a href="https://openreview.net/forum?id=7HT5i6w6qU">OpenReview</a> / <a href="https://openreview.net/pdf?id=7HT5i6w6qU">PDF</a></li>
  <li><strong>Error-Free Linear Attention Is a Free Lunch: Exact Solution from Continuous-Time Dynamics.</strong><br>Jingdi Lei, <strong>Di Zhang</strong>, Soujanya Poria. <span class="venue">arXiv preprint arXiv:2512.12602, 2025.</span> <a href="https://arxiv.org/abs/2512.12602">arXiv</a> / <a href="https://arxiv.org/pdf/2512.12602">PDF</a></li>
  <li><strong>Chem-R: Learning to Reason as a Chemist.</strong><br>Weida Wang, Benteng Chen, <strong>Di Zhang</strong>, Wanhao Liu, Shuchen Pu, Ben Gao, Jin Zeng, Xiaoyong Wei, Tianshu Yu, Shuzhou Sun, and others. <span class="venue">arXiv preprint arXiv:2510.16880, 2025.</span> <a href="https://arxiv.org/abs/2510.16880">arXiv</a> / <a href="https://arxiv.org/pdf/2510.16880">PDF</a></li>
  <li><strong>NVIDIA Nemotron Nano V2 VL.</strong><br>Amala Sanjay Deshmukh, Kateryna Chumachenko, Tuomas Rintamaki, Matthieu Le, Tyler Poon, Danial Mohseni Taheri, Ilia Karmanov, Guilin Liu, Jarno Seppanen, Guo Chen, and others. <span class="venue">arXiv preprint arXiv:2511.03929, 2025.</span> <a href="https://arxiv.org/abs/2511.03929">arXiv</a> / <a href="https://research.nvidia.com/labs/adlr/files/NVIDIA-Nemotron-Nano-V2-VL-report.pdf">PDF</a> / <a href="https://huggingface.co/nvidia/NVIDIA-Nemotron-Nano-12B-v2-VL-BF16">Model</a></li>
  <li><strong>NVIDIA Isaac GR00T N1.6.</strong><br>NVIDIA. <span class="venue">NVIDIA News, 2025.</span> <a href="https://nvidianews.nvidia.com/news/nvidia-accelerates-robotics-research-and-development-with-new-open-models-and-simulation-libraries">News</a></li>
  <li><strong>CMPhysBench: A Benchmark for Evaluating Large Language Models in Condensed Matter Physics.</strong><br>Weida Wang, Dongchen Huang, Jiatong Li, Tengchao Yang, Ziyang Zheng, <strong>Di Zhang</strong>, Dong Han, Benteng Chen, Binzhao Luo, Zhiyu Liu, and others. <span class="venue">arXiv preprint arXiv:2508.18124, 2025.</span> <a href="https://arxiv.org/abs/2508.18124">arXiv</a> / <a href="https://arxiv.org/pdf/2508.18124">PDF</a> / <a href="https://github.com/CMPhysBench/CMPhysBench">Code</a></li>
  <li><strong>Your Reward Function for RL Is Your Best PRM for Search: Unifying RL and Search-Based TTS.</strong><br>Can Jin, Yang Zhou, Qixin Zhang, Hongwu Peng, <strong>Di Zhang</strong>, Zihan Dong, Marco Pavone, Ligong Han, Zhang-Wei Hong, Tong Che, and others. <span class="venue">arXiv preprint arXiv:2508.14313, 2025.</span> <a href="https://arxiv.org/abs/2508.14313">arXiv</a> / <a href="https://arxiv.org/pdf/2508.14313">PDF</a></li>
  <li><strong>Mol-R1: Towards Explicit Long-CoT Reasoning in Molecule Discovery.</strong><br>Jiatong Li, Weida Wang, Qinggang Zhang, Junxian Li, <strong>Di Zhang</strong>, Changmeng Zheng, Shufei Zhang, Xiaoyong Wei, Qing Li. <span class="venue">arXiv preprint arXiv:2508.08401, 2025.</span> <a href="https://arxiv.org/abs/2508.08401">arXiv</a> / <a href="https://arxiv.org/pdf/2508.08401">PDF</a></li>
  <li><strong>Scaling Up RL: Unlocking Diverse Reasoning in LLMs via Prolonged Training.</strong><br>Mingjie Liu, Shizhe Diao, Jian Hu, Ximing Lu, Xin Dong, Hao Zhang, Alexander Bukharin, Shaokun Zhang, Jiaqi Zeng, Makesh Narsimhan Sreedhar, and others. <span class="venue">arXiv preprint arXiv:2507.12507, 2025.</span> <a href="https://arxiv.org/abs/2507.12507">arXiv</a> / <a href="https://arxiv.org/pdf/2507.12507">PDF</a></li>
  <li><strong>SELT: Self-Evaluation Tree Search for LLMs with Task Decomposition.</strong><br>Mengsong Wu, <strong>Di Zhang</strong>, Yuqiang Li, Dongzhan Zhou, Wenliang Chen. <span class="venue">arXiv preprint arXiv:2506.07557, 2025.</span> <a href="https://arxiv.org/abs/2506.07557">arXiv</a> / <a href="https://arxiv.org/pdf/2506.07557">PDF</a> / <a href="https://github.com/fairyshine/SELT">Code</a></li>
  <li><strong>Control-R: Towards Controllable Test-Time Scaling.</strong><br><strong>Di Zhang</strong>, Weida Wang, Junxian Li, Xunzhi Wang, Jiatong Li, Jianbo Wu, Jingdi Lei, Haonan He, Peng Ye, Shufei Zhang, and others. <span class="venue">arXiv preprint arXiv:2506.00189, 2025.</span> <a href="https://huggingface.co/papers/2506.00189">HF Paper</a> / <a href="https://arxiv.org/abs/2506.00189">arXiv</a> / <a href="https://arxiv.org/pdf/2506.00189">PDF</a></li>
  <li><strong>Exploring the Application of Model Context Protocol for Enhanced Reasoning in Large Language Models.</strong><br>Jianbo Wu, <strong>Di Zhang</strong>, Wei Shu, Jie Liu. <span class="venue">ICML 2025 Workshop NewInML Poster, 2025.</span> <a href="https://icml.cc/virtual/2025/50697">ICML</a></li>
  <li><strong>ChemAgent: Enhancing LLMs for Chemistry and Materials Science Through Tree-Search Based Tool Learning.</strong><br>Mengsong Wu, YaFei Wang, <strong>Di Zhang</strong>, Yidong Ming, Yuqi An, Yuwei Wan, Wenliang Chen, Binbin Lin, Yuqiang Li, Tong Xie, Dongzhan Zhou. <span class="venue">OpenReview, 2025.</span> <a href="https://huggingface.co/papers/2506.07551">HF Paper</a> / <a href="https://arxiv.org/abs/2506.07551">arXiv</a> / <a href="https://arxiv.org/pdf/2506.07551">PDF</a> / <a href="https://github.com/AI4Chem/ChemistryAgent">Code</a></li>
  <li><strong>LoRA-Chem: Modular Machine Learning for Multitask Prediction in Organic Reactions.</strong><br>Ben Gao, Penghui Li, <strong>Di Zhang</strong>, Qian Tan, Wanhao Liu, Xunzhi Wang, Junxian Li, Shufei Zhang, Dongzhan Zhou, Yuqiang Li, and others. <span class="venue">CCS Chemistry, 1-9, 2025.</span> <a href="https://doi.org/10.31635/ccschem.025.202506542">DOI</a> / <a href="https://github.com/flyben97/LoRA-Chem">Code</a> / <a href="https://huggingface.co/Flyben/LoRA-Chem">Model</a></li>
  <li><strong>MOOSE-Chem3: Toward Experiment-Guided Hypothesis Ranking via Simulated Experimental Feedback.</strong><br>Wanhao Liu, Zonglin Yang, Jue Wang, Lidong Bing, <strong>Di Zhang</strong>, Dongzhan Zhou, Yuqiang Li, Houqiang Li, Erik Cambria, Wanli Ouyang. <span class="venue">NeurIPS 2025 AI for Science Workshop, 2025.</span> <a href="https://arxiv.org/abs/2505.17873">arXiv</a> / <a href="https://arxiv.org/pdf/2505.17873">PDF</a> / <a href="https://openreview.net/forum?id=UKF21hrLLR">OpenReview</a> / <a href="https://neurips.cc/virtual/2025/125906">NeurIPS</a></li>
  <li><strong>Critic-V: VLM Critics Help Catch VLM Errors in Multimodal Reasoning.</strong><br><strong>Di Zhang</strong>, Jingdi Lei, Junxian Li, Xunzhi Wang, Yujie Liu, Zonglin Yang, Jiatong Li, Weida Wang, Suorong Yang, Jianbo Wu, and others. <span class="venue">Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition, 9050-9061, 2025.</span> <a href="https://huggingface.co/papers/2411.18203">HF Paper</a> / <a href="https://arxiv.org/abs/2411.18203">arXiv</a> / <a href="https://openaccess.thecvf.com/content/CVPR2025/papers/Zhang_Critic-V_VLM_Critics_Help_Catch_VLM_Errors_in_Multimodal_Reasoning_CVPR_2025_paper.pdf">CVF PDF</a></li>
  <li><strong>Llama-Berry: Pairwise Optimization for Olympiad-Level Mathematical Reasoning via o1-like Monte Carlo Tree Search.</strong><br><strong>Di Zhang</strong>, Jianbo Wu, Jingdi Lei, Tong Che, Jiatong Li, Tong Xie, Xiaoshui Huang, Shufei Zhang, Marco Pavone, Yuqiang Li, and others. <span class="venue">Proceedings of the 2025 Conference of the Nations of the Americas Chapter of the Association for Computational Linguistics: Human Language Technologies, Long Papers, 7315-7337.</span> <a href="https://huggingface.co/papers/2410.02884">HF Paper</a> / <a href="https://arxiv.org/abs/2410.02884">arXiv</a> / <a href="https://arxiv.org/pdf/2410.02884">PDF</a></li>
  <li><strong>ChemVLM: Exploring the Power of Multimodal Large Language Models in Chemistry Area.</strong><br>Junxian Li, <strong>Di Zhang</strong>, Xunzhi Wang, Zeying Hao, Jingdi Lei, Qian Tan, Cai Zhou, Wei Liu, Yaotian Yang, Xinrui Xiong, and others. <span class="venue">Proceedings of the AAAI Conference on Artificial Intelligence, 39(1):415-423, 2025.</span> <a href="https://huggingface.co/papers/2408.07246">HF Paper</a> / <a href="https://arxiv.org/abs/2408.07246">arXiv</a> / <a href="https://ojs.aaai.org/index.php/AAAI/article/download/32020/34175">AAAI PDF</a> / <a href="https://github.com/AI4Chem/ChemVlm">Code</a> / <a href="https://huggingface.co/AI4Chem/ChemVLM-26B">Model</a></li>
</ol>

### 2024 and Earlier

<ol class="publication-list">
  <li><strong>Biology Instructions: A Dataset and Benchmark for Multi-Omics Sequence Understanding Capability of Large Language Models.</strong><br>Haonan He, Yuchen Ren, Yining Tang, Ziyang Xu, Junxian Li, Minghao Yang, <strong>Di Zhang</strong>, Dong Yuan, Tao Chen, Shufei Zhang, and others. <span class="venue">EMNLP 2025 Findings.</span> <a href="https://huggingface.co/papers/2412.19191">HF Paper</a> / <a href="https://arxiv.org/abs/2412.19191">arXiv</a> / <a href="https://aclanthology.org/2025.findings-emnlp.978.pdf">ACL PDF</a></li>
  <li><strong>Accessing GPT-4 Level Mathematical Olympiad Solutions via Monte Carlo Tree Self-Refine with Llama-3 8B.</strong><br><strong>Di Zhang</strong>, Xiaoshui Huang, Dongzhan Zhou, Yuqiang Li, Wanli Ouyang. <span class="venue">arXiv preprint arXiv:2406.07394, 2024.</span> <a href="https://huggingface.co/papers/2406.07394">HF Paper</a> / <a href="https://arxiv.org/abs/2406.07394">arXiv</a> / <a href="https://arxiv.org/pdf/2406.07394">PDF</a></li>
  <li><strong>ChemLLM: A Chemical Large Language Model.</strong><br>D. Zhang, W. Liu, Q. Tan, J. Chen, H. Yan, Y. Yan, J. Li, W. Huang, X. Yue, D. Zhou. <span class="venue">arXiv preprint arXiv:2402.06852, 2024.</span> <a href="https://huggingface.co/papers/2402.06852">HF Paper</a> / <a href="https://arxiv.org/abs/2402.06852">arXiv</a> / <a href="https://arxiv.org/pdf/2402.06852">PDF</a> / <a href="https://huggingface.co/AI4Chem/ChemLLM-7B-Chat">Model</a></li>
  <li><strong>Sentiment Analysis Dataset for Service-Oriented Places Like Electric Power Supply Offices.</strong><br>Bo Zhang, Chenguang Li, <strong>Di Zhang</strong>, Bin Lu, Kaibao Zhou, Jing Zhang, Qiming Zhu, Xiaoping Chen. <span class="venue">Journal of Computer Applications, 42(S1):37-42, 2022.</span> <a href="https://sns.wanfangdata.com.cn/sns/perio/jsjyy/?isSync=0&issueNum=z1&page=1&publishYear=2022&tabId=article">Wanfang</a></li>
  <li><strong>Target Selection Model for Robot Interaction and Robot Interaction System.</strong><br>Bo Zhang, Bin Lyu, Huizhou Liu, Yu Ouyang, Qian Zhao, <strong>Di Zhang</strong>, Rongya Chen, Xiaoping Chen, Liang Tang, Songlin Zuo, and others. <span class="venue">CN Patent CN114,399,529 B, 2022.</span> <a href="https://patents.google.com/patent/CN114399529B/en">Patent</a></li>
  <li><strong>Design and Implementation of Safety and Robustness of Mobile Service Robot Navigation in Complex Pedestrian Scenarios.</strong><br><strong>Di Zhang</strong>. <span class="venue">Master thesis, University of Science and Technology of China, 2022.</span></li>
  <li><strong>Juvenile State Hypothesis: What We Can Learn from Lottery Ticket Hypothesis Researches?</strong><br><strong>Di Zhang</strong>. <span class="venue">arXiv preprint arXiv:2109.03862, 2021.</span> <a href="https://arxiv.org/abs/2109.03862">arXiv</a> / <a href="https://arxiv.org/pdf/2109.03862">PDF</a></li>
  <li><strong>Water Supply Engineering Design Scheme 2 of Municipal Services District of C City.</strong><br><strong>Di Zhang</strong>. <span class="venue">Thesis, Hefei Technology University, 2019.</span></li>
</ol>

<span class='anchor' id='-experience'></span>

# Experience

- **MindLab**, Research Residency, Head of Agent Model, 2026-present.
- **NVIDIA Research**, Research Intern, 2025-2026.
- **Shanghai AI Lab**, Research Intern, 2023-2025.
- **Alibaba Inc.**, Machine Learning Developer, 2022-2023.
- **Ant Group**, Intern, 2021.
- **MIT Han Lab**, Intern, 2021-2022.

<span class='anchor' id='-education'></span>

# Education

- **Fudan University**, PhD Candidate, 2023-present.
- **University of Science and Technology of China**, Master of Engineering, Robotics Lab, 2019-2022.
