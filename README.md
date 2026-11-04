# PixelSpline project page

Static, build-free project page for **PixelSpline: Continuous Space-Time Video Super-Resolution via Endpoint-Anchored Shared Pixel Trajectories** (WACV 2027), by Wanqi Yuan and Nianyi Li, Clemson University.

## Preview

Open `index.html` in a browser, or serve this folder with a local HTTP server:

```powershell
python -m http.server 8000
```

Then visit http://localhost:8000/. No package installation or build step is required. All page assets are local and paths are relative, including under the GitHub Pages `/PixelSpline/` subpath.

## Content

- Title, authors, abstract, and method summary from the supplied LaTeX source.
- Pipeline, visual reconstruction comparison, space-time profiles, and latency–quality figure. Source PNGs retain transparency and are shown on explicit white backgrounds. The latency plot sits beside the efficiency table.
- Reconstruction quality, end-to-end efficiency, temporal consistency, and Vid4 boundary-case tables from `Resources/Paper/sec/4_experiment.tex`.
- Seven video comparisons containing all 16 video files extracted from supplementary PPT slides 3–5, 7–8, and 10–11. The final two comparisons include V³. Source shape names and slide relationships establish the method labels.
- All 16 videos displayed in dataset groups, automatic muted playback on a shared clock, continuous looping, global pause/replay controls, and copyable BibTeX.

`static/css/index.css` and `static/js/index.js` control the layout and interactions. The page uses no external runtime scripts, analytics, or font services. Existing unused template assets remain untouched.

## Add next

1. **Final paper PDF:** place at `static/pdfs/pixelspline.pdf`, replace the disabled Paper resource in `index.html` with a link, and add `citation_pdf_url` when the published URL is known.
2. **arXiv URL:** replace the disabled arXiv resource with the real abstract URL.
3. **Research code repository:** replace the disabled Code resource with the actual model repository. The project-page repository is not presented as model code.
4. **Author links:** names are intentionally plain text for now.
5. **Final proceedings metadata:** extend the BibTeX with pages/DOI once available.
6. **Optional additional media:** a narrated overview video, extra datasets/scales, and checkpoint/download links can be added when supplied.

No paper PDF was found in `Resources/Paper` or `Resources/WACV27.zip`; these contain LaTeX source. The 122.9 MB supplementary PPTX stays outside this repository. Its embedded videos have been exported as web-ready H.264 MP4 files with fast-start metadata (about 63 MB total), without copying the oversized PPTX into the site.

## Video provenance

| Sequence | Supplementary slide | Original media → displayed method |
| --- | --- | --- |
| Adobe240 GOPR9653 | 3 | media1 → Ours; media2 → GT |
| Adobe240 IMG_0016 | 4 | media3 → Ours; media4 → GT |
| Adobe240 IMG_0024 | 5 | media5 → Ours; media6 → GT |
| GoPro GOPR0384_11_05 | 7 | media7 → Ours; media8 → GT |
| GoPro GOPR0385_11_01 | 8 | media9 → Ours; media10 → GT |
| GoPro GOPR0871_11_00 | 10 | media11 → GT; media12 → Ours; media13 → V³ |
| GoPro GOPR0881_11_01 | 11 | media14 → GT; media15 → Ours; media16 → V³ |

Video encodes retain the source frame rate and 1280×720 resolution, use H.264 / YUV420p, CRF 20, and remove audio. Original files remain in the supplied PPTX.

## Publishing

This folder is ready for GitHub Pages using the repository root as the publishing source. `.nojekyll` is retained. This task changes local files only; no Git staging, commit, push, or deployment was performed.

## Acknowledgments and website license

Structure inspired by [BF-STVSR](https://eunjnnn.github.io/bfstvsr_site/). Based on the [Academic Project Page Template](https://github.com/eliahuhorwitz/Academic-project-page-template) and [Nerfies](https://nerfies.github.io/). Website template: [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). This statement concerns the website template and does not assign a new license to the paper, research code, or datasets.
