# 師大物理教育團隊 網站維護手冊 (NTNU Physics Education Team Website)

🌐 **網站網址 (Website)**: [https://chensgroup.github.io/site/](https://chensgroup.github.io/site/)

---

## 📖 本專案簡介 (Overview)

本專案為託管於 **GitHub Pages** 的靜態網站。為方便後續實驗室成員維護，全站全面採用 **資料驅動（Data-Driven）** 架構：
* 日常新增、修改或刪除資料，**只需要編輯對應的資料檔**（`.json` 或 `.txt`）。
* **無需手動修改繁瑣的 HTML 結構**。
* 中文版與英文版共用同一份資料來源，同步更新不漏接。

---

## 💻 本地端預覽 (Local Preview)

因為瀏覽器安全性限制（CORS），透過資料檔（`.json`）動態讀取內容時，建議透過本地 Web Server 預覽：

### 方法一：使用 Python（推薦）
在專案根目錄開啟終端機（Terminal）執行：
```bash
python3 -m http.server 8000
# 若在 Windows 上為：python -m http.server 8000
```
接著打開瀏覽器訪問 `http://localhost:8000` 即可預覽。

### 方法二：使用 VS Code Live Server 套件
1. 安裝 VS Code 延伸模組 **Live Server**。
2. 在 `index.html` 按右鍵，選擇 **"Open with Live Server"**。

---

## 📁 專案架構概覽 (Architecture)

```text
site/
├── index.html / index_en.html           # 首頁
├── member.html / member_en.html         # 成員頁
├── simulation.html / simulation_en.html # 實驗模擬頁
├── course.html / course_en.html         # 課程頁
├── resource.html / resource_en.html     # 資源頁
├── event.html / event_en.html           # 活動頁
├── research.html / research_en.html     # 研究成果頁
│
├── index/
│   ├── images.json                      # 首頁輪播圖清單
│   ├── news.json                        # 首頁最新消息清單
│   └── *.avif / *.jpg                   # 輪播圖片
├── members/
│   ├── members.json                     # 現任成員與前成員清單
│   └── [成員姓名]/
│       ├── info.txt                     # 個人資料 (key=value)
│       └── image.avif                   # 個人大頭照
├── simulations/
│   ├── simulations.json                 # 實驗模擬清單
│   └── *.html                           # 互動實驗網頁
├── courses/
│   ├── courses.json                     # 課程資訊、單元影片與講義清單
│   └── *.pdf                            # 課程講義檔案
├── resources/
│   └── resources.json                   # 推薦網站、選修單元與其他資源清單
├── events/
│   └── events.json                      # 過往參與活動清單
└── research/
    └── research.json                    # 研究成果與專書論文清單
```

---

## 🖼️ 各分頁更新教學 (How to Update)

### 1. 首頁 (Home)
* **輪播圖**：圖片放進 [`index/`](index/)，檔名加入 [`index/images.json`](index/images.json)：
  ```json
  [
    "DSC00004.avif",
    "DSC02428.avif",
    "new_photo.avif"
  ]
  ```
* **最新消息**：編輯 [`index/news.json`](index/news.json)：
  ```json
  [
    {
      "date_zh": "2026/06/25",
      "date_en": "Jun 25, 2026",
      "text_zh": "更改網站名稱，首頁新增輪播圖",
      "text_en": "Change website name, add a slideshow on the home page"
    }
  ]
  ```

---

### 2. 成員介紹 (Members)
* **名冊清單**：[`members/members.json`](members/members.json)
* **個人資料**：`members/[姓名]/info.txt` 與 `image.avif`

#### A. 新增成員：
1. 在 `members/` 目錄下新增資料夾（如 `members/New Student/`）。
2. 放入個人照 `image.avif`。
3. 建立 `info.txt`：
   ```ini
   # 基本設定
   photo=image.avif
   office=S719
   email=student@example.com
   phone=(+886)912-345-678
   website=

   # 中文資訊
   name_zh=王小明
   labTitle_zh=碩士生
   jobTitle_zh=碩士班一年級
   degree_zh=國立臺灣師範大學 物理學系學士
   fields_zh=物理教育、AI教學
   expertise_zh=生成式AI、物理探究教材
   experience_zh=師大物理系專題生
   cv_zh=個人詳細經歷...

   # English Info
   name_en=Xiao-Ming Wang
   labTitle_en=Master Student
   jobTitle_en=First Year Master Student
   degree_en=B.S. in Physics, NTNU
   fields_en=Physics Education, AI in Education
   expertise_en=Generative AI, Inquiry-based Pedagogy
   experience_en=Undergraduate Researcher, NTNU Physics
   cv_en=Detailed biography...
   ```
4. 在 [`members/members.json`](members/members.json) 的 `"current"` 加入該資料夾名稱。

#### B. 成員畢業轉為 Alumni：
將名稱由 `"current"` 移至 `"alumni"` 即可。

---

### 3. 實驗模擬 (Simulations)
* **資料檔案**：[`simulations/simulations.json`](simulations/simulations.json)
* **步驟**：將 HTML 模擬檔案放進 `simulations/`，並在 `simulations.json` 新增：
  ```json
  {
    "title_zh": "簡諧運動",
    "title_en": "Simple Harmonic Motion",
    "file": "SHM_lab_v3.html"
  }
  ```

---

### 4. 課程資訊 (Courses)
* **資料檔案**：[`courses/courses.json`](courses/courses.json)
* **講義目錄**：[`courses/`](courses/)
* **步驟**：編輯 `courses/courses.json`，可新增開課、過往課程、各單元 YouTube 影片連結及 PDF 講義：
  ```json
  {
    "activeCourses": [
      {
        "name_zh": "物理教材教法",
        "name_en": "Physics Pedagogy",
        "episodes": [
          {
            "title_zh": "第1集標題",
            "title_en": "Episode 1 Title",
            "url": "https://youtu.be/..."
          }
        ]
      }
    ],
    "pastCourses": [],
    "handouts": [
      {
        "title_zh": "IMRD 是學術論文的基本架構（PDF）",
        "title_en": "IMRD is the Basic Structure of Academic Papers (PDF)",
        "file": "courses/IMRD是學術論文的基本架構.pdf"
      }
    ]
  }
  ```

---

### 5. 資源 (Resources)
* **資料檔案**：[`resources/resources.json`](resources/resources.json)
* **包含項目**：
  * `recommendedSites`：推薦網站連結
  * `physicsUnits`：高中選修物理單元（彈跳選單）
  * `otherResources`：板書、探究式教學等其他資源

---

### 6. 活動 (Events)
* **資料檔案**：[`events/events.json`](events/events.json)
* **步驟**：依年份在 `events.json` 新增活動項目：
  ```json
  [
    {
      "year": "2026",
      "items": [
        {
          "date_zh": "1/17（六）",
          "date_en": "Jan, 17, Sat",
          "text_zh": "<a href=\"https://...\" target=\"_blank\">柑園國中</a>資優課",
          "text_en": "Lesson for Gifted Class at <a href=\"https://...\" target=\"_blank\">Ganyuan Junior High School</a>"
        }
      ]
    }
  ]
  ```

---

### 7. 研究成果 (Research)
* **資料檔案**：[`research/research.json`](research/research.json)
* **步驟**：在 `research.json` 新增已發表的論文或專書章節：
  ```json
  [
    {
      "year": "2025",
      "title_zh": "論文中文標題",
      "title_en": "Paper English Title",
      "link": "https://doi.org/..."
    }
  ]
  ```

---

## 🚀 發布更新 (Publishing)

只要將修改推送到 GitHub 倉庫的 `main` 分支：
```bash
git add .
git commit -m "Update site content"
git push
```
GitHub Pages 會在數十秒內自動重新建置並上線更新！
