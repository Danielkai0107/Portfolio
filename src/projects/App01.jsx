import React from 'react'
// import { Link } from 'react-router-dom'

const App01 = () => {
  return (
    <main className='project1'>
      <article className='project1_title'>
        <h1>AI English UI</h1>
        <p>這款APP運用AI語音分析技術，專為提升英文口語能力設計。
          結合多樣化的職場情境主題，用戶可以實戰練習英語口說，同時APP會提供詳細的評分和反饋，
          幫助用戶識別並加強需要改善的單詞或發音，有效提升溝通技能。</p>
      </article>

      <img className='project1_img' src="/assets/images/AIEnglish/1.png" alt="" />

      <article className='project1_sub'>
        <h2>風格指南</h2>
        <h3>Style Guideline</h3>
      </article>

      <ul className='project1_style'>
        <li>
          <figure></figure>
          <p>Noto Sans</p>
        </li>
        <li>
          <div className='color'></div>
          <p>#0B416B</p>
        </li>
        <li>
          <div className='color'></div>
          <p>#6C3594</p>
        </li>
        <li>
          <div className='color'></div>
          <p>#F3A32A</p>
        </li>
      </ul>

      <article className='project1_sub'>
        <h2>設備檢查介面</h2>
        <h3>Device Check Interface</h3>
      </article>

      <article className='project1_cnt'>
        <img src="/assets/images/AIEnglish/c1.png" alt="" />
        <ul>
          <li>
            <h4>步驟指示器</h4>
            <p>畫面上方有一個進度指示器，清晰地顯示用戶目前處於流程中的哪個步驟，並且每完成一個步驟後，會出現一個綠色的勾選標記，表示完成。</p>
          </li>
          <li>
            <h4>簡潔清新的設計</h4>
            <p>UI設計簡潔，給用戶一種專業且無負擔的體驗。</p>
          </li>
          <li>
            <h4>導航按鈕</h4>
            <p>畫面底部有“下一步”按鈕，讓用戶在完成當前步驟後，可以直覺地進行到下一步。此外，還有一個“跳過”選項，提供給那些不想進行設備檢查的用戶。</p>
          </li>
        </ul>
      </article>

      <img className='project1_img' src="/assets/images/AIEnglish/2.png" alt="" />

      <article className='project1_sub'>
        <h2>首頁介面</h2>
        <h3>Home Page Interface</h3>
      </article>

      <article className='project1_cnt'>
        <img src="/assets/images/AIEnglish/c2.png" alt="" />
        <ul>
          <li>
            <h4>最佳成績</h4>
            <p>中央顯眼位置展示了用戶的最佳成績，並指出該成績是在過去7天內達成的，這激勵用戶持續使用APP以打破自己的記錄。</p>
          </li>
          <li>
            <h4>學習進度追蹤</h4>
            <p>下方展示了用戶在過去7天內的學習情況，包括練習內容及學習時間，這有助於用戶了解自己的學習活動和時間管理。</p>
          </li>
          <li>
            <h4>課程推薦</h4>
            <p>畫面中展示了學習進度，這有助於鼓勵用戶繼續他們的學習旅程並直接跳轉到他們正在進行的課程。</p>
          </li>
        </ul>
      </article>

      <article className='project1_sub'>
        <h2>語音測驗介面</h2>
        <h3>Voice Test Interface</h3>
      </article>

      <article className='project1_cnt'>
        <img src="/assets/images/AIEnglish/c3.png" alt="" />
        <img src="/assets/images/AIEnglish/c4.png" alt="" />
      </article>

      <img className='project1_img' src="/assets/images/AIEnglish/3.png" alt="" />

      <article className='project1_sub'>
        <h2>AI評測報告介面</h2>
        <h3>AI Evaluation Report Interface</h3>
      </article>

      <article className='project1_cnt'>
        <img src="/assets/images/AIEnglish/c5.png" alt="" />
        <ul>
          <li>
            <h4>評分結果</h4>
            <p>中央位置顯示了用戶的語音評價，使用戶有更多的學習動力。</p>
          </li>
          <li>
            <h4>流暢度和音量</h4>
            <p>顯示了用戶的語音流暢度（Fluency）和音量（Volume），為用戶提供了發音和語調的具體反饋。</p>
          </li>
          <li>
            <h4>發音指導</h4>
            <p>每個關鍵詞下方都有國際音標（IPA）表示，幫助用戶學習正確的發音。音頻播放按鈕，用戶可以聽到母語者的標準發音，對比你的聲音 ，從而學習和改進。</p>
          </li>
        </ul>
      </article>

      <img className='project1_img' src="/assets/images/AIEnglish/4.png" alt="" />

      <article className='project1_sub'>
        <h2>低中高級距介面</h2>
        <h3>Level Interface</h3>
      </article>

      <img className='project1_img' src="/assets/images/AIEnglish/5.png" alt="" />

      <article className='project1_sub'>
        <h2>場景模擬介面</h2>
        <h3>Scene Simulation Interface</h3>
      </article>

      <article className='project1_cnt project1_cnt--row '>
        <img className='row' src="/assets/images/AIEnglish/c6.png" alt="" />
        <ul>
          <li>
            <h4>評分結果</h4>
            <p>中央位置顯示了用戶的語音評價，使用戶有更多的學習動力。</p>
          </li>
          <li>
            <h4>流暢度和音量</h4>
            <p>顯示了用戶的語音流暢度（Fluency）和音量（Volume），為用戶提供了發音和語調的具體反饋。</p>
          </li>
          <li>
            <h4>發音指導</h4>
            <p>每個關鍵詞下方都有國際音標（IPA）表示，幫助用戶學習正確的發音。音頻播放按鈕，用戶可以聽到母語者的標準發音，對比你的聲音 ，從而學習和改進。</p>
          </li>
        </ul>
      </article>

      <article className='project1_sub'>
        <h2>練習介面流程</h2>
        <h3>Practice Process UI Flow </h3>
      </article>

      <img className='project1_img' src="/assets/images/AIEnglish/6.png" alt="" />
    </main>

  )
}

export default App01
