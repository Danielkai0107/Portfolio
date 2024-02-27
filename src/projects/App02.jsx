import React from 'react'
// import { Link } from 'react-router-dom'

const data = [
  {
    id: 1,
    subName: 'Home Page',
    BeforeImg: '/assets/images/UIDesign/c1.png',
    b1: {
      title: '視覺效果不符合產品定位',
      p: '標榜智能分析的產品，視覺上卻給帶給用戶廉價感，與科技感AI分析的理念不符。'
    },
    b2: {
      title: '信息過少且廣告過於直接',
      p: '鼓勵用戶給予五星評價的提示占據了大量的空間，並且可能會讓用戶感到被強迫進行評價，這樣的直接請求可能會影響用戶的體驗。'
    },
    b3: {
      title: '功能區塊不明顯',
      p: '底部的功能區塊（如“Dictionary”, “Challenge”）與其他頁面元素的視覺區分不明顯，可能不容易引起用戶的注意。'
    },
    b4: {
      title: '互動元素不明確',
      p: '頁面上的搜索框沒有清晰的呼籲行動或互動提示，用戶可能不清楚可以在這裡進行什麼操作。'
    },
    AfterImg: '/assets/images/UIDesign/c2.png',
    a1: {
      title: '清晰度與專注點',
      p: '修改後的設計提供了更清晰的視覺階層，使用者可以更容易地識別主要功能。'
    },
    a2: {
      title: '功能性與可用性',
      p: '新的設計增加了功能區塊的識別度，如「Pro」的升級按鈕，清楚地突顯了這個選項，從而提高轉化率。此外，進步追蹤的視覺表現提供了即時的學習進度反饋，增加了互動性。'
    },
    a3: {
      title: '視覺吸引力',
      p: '改版後的介面在視覺上更具吸引力，使用了圓角卡片與新穎的顏色搭配，這些現代化的設計元素能夠吸引用戶並提高使用者體驗。'
    },
    a4: {
      title: '個人化設定',
      p: '改版後的設計加入了個人化元素，例如「Alexander, Go for it!」的挑戰提示，這種個人化的交互能夠提高用戶的參與度和忠誠度。'
    },
  },
  {
    id: 2,
    subName: 'Device Check',
    BeforeImg: '/assets/images/UIDesign/c3.png',
    b1: {
      title: '圖示含義不明確',
      p: '圖示雖然有助於快速傳達信息，但如果用戶不熟悉這些圖示代表的含義，可能會感到困惑。特別是車輛圖示可能不是立刻能夠和“安靜的環境”聯系起來。'
    },
    b2: {
      title: '操作指引不夠明顯',
      p: '“Confirm”按鈕與其他元素的視覺重要性不匹配，用戶可能不會立即注意到這是一個需要操作的按鈕。'
    },
    b3: {
      title: '風格不一致',
      p: '頁面上的顏色和圖示風格需要確保與應用的其他部分保持一致性，以便用戶能有一致的體驗。'
    },
    b4: {
      title: '信息密度不好閱讀',
      p: '檢查清單的信息過於密集，缺少足夠的空間來分隔各個建議，使得閱讀起來可能稍嫌吃力。'
    },
    AfterImg: '/assets/images/UIDesign/c4.png',
    a1: {
      title: '頂部欄位',
      p: '顯示當前正在進行的任務或步驟的名稱，讓用戶知道他們正在執行的過程。'
    },
    a2: {
      title: '進度指示器',
      p: '使用線性進度條和勾選標誌來展示用戶完成的步驟，這有助於用戶了解他們在整個過程中的位置。'
    },
    a3: {
      title: '導航按鈕',
      p: '畫面底部有“下一步”按鈕，讓用戶在完成當前步驟後，可以直覺地進行到下一步。此外，還有一個“跳過”選項，提供給那些不想進行設備檢查的用戶。'
    },
    a4: {
      title: '分頁點',
      p: '頁面底部的分頁點指示了多頁設置過程中的當前頁面位置'
    },
  },
  {
    id: 3,
    subName: 'Voice Test',
    BeforeImg: '/assets/images/UIDesign/c5.png',
    b1: {
      title: '信息層次不明顯',
      p: '頁面上的元素如播放按鈕、進度時間和句子沒有清晰的視覺層次，使得用戶可能不清楚哪些是可以互動的元素。'
    },
    b2: {
      title: '控件間距',
      p: '按鈕之間的空間可能太小，容易導致誤點，特別是在觸摸屏上。'
    },
    b3: {
      title: '功能性指示不足',
      p: '雖然下方有麥克風的圖標，但不清楚是否為按鈕或只是一個圖標。如果是可互動的，它應該有更明顯的設計，比如按鈕形狀或陰影效果。'
    },
    b4: {
      title: '視覺反饋不足',
      p: '播放按鈕旁邊的進度時間可能過於簡單，不提供足夠的視覺反饋或動畫來指示錄音或播放的狀態。'
    },
    AfterImg: '/assets/images/UIDesign/c6.png',
    a1: {
      title: '標題＆進度指示器',
      p: '顯示當前正在進行題目類別及進度，讓用戶知道他們正在練習的盡頭和方向。'
    },
    a2: {
      title: '音速控制滑桿',
      p: '滑桿允許用戶調節播放速度，這對於語言學習特別有用，因為它可以幫助學習者適應不同速度的對話。'
    },
    a3: {
      title: '文本區域',
      p: '展示了用戶當前練習的句子。加粗的文字顯示範例音檔目前的位置。'
    },
    a4: {
      title: '麥克風按鈕放大',
      p: '此介面主要功能為錄音，使用戶更直覺操作當前所需要的行為。'
    },
  },
  {
    id: 4,
    subName: 'Report Page',
    BeforeImg: '/assets/images/UIDesign/c7.png',
    b1: {
      title: '不清晰的回饋信息',
      p: '用戶的發音有錯誤，信息太模糊，不足以提供有用的反饋或改進的具體方向。'
    },
    b2: {
      title: '功能布局不清晰',
      p: '雖然有流暢度和音量的評估，但缺乏詳細的指導，告訴用戶如何提高流暢度或調整音量。'
    },
    b3: {
      title: '視覺層次欠缺',
      p: '界面的視覺層次不夠分明，用戶可能需要花費額外的時間來理解不同部分的重要性。'
    },
    b4: {
      title: '紅色提示',
      p: '紅色提示對於學習者會充滿壓力，好像做錯了什麼事情。'
    },
    AfterImg: '/assets/images/UIDesign/c8.png',
    a1: {
      title: '清晰的性能指標',
      p: '直接展示了百分比評分，給用戶提供了明確的績效指標。'
    },
    a2: {
      title: '增加正確率百分比',
      p: '通過上升的百分比，界面提供了積極的反饋，可能會提高用戶的信心和動力。'
    },
    a3: {
      title: '改進的視覺設計',
      p: '使用了更明顯的顏色和圖形來突出顯示評估結果，增強了視覺層次感。'
    },
    a4: {
      title: '拿掉紅色的不安感',
      p: '拿掉紅色提示，重新使用三色分別定義低、中、高提示，使用戶在學習方面無壓力。'
    },
  },
]

const App02 = () => {
  return (
    <main className='project2'>
      <article className='project2_title'>
        <h1>UI Redesign</h1>
        <p>為符合市場期待以及功能的擴充應用，同時提供學習用戶的動力，決定將原有的UI介面進行部分改版更新，並新增付費功能等。</p>
      </article>
      <img className='project1_img' src="/assets/images/UIDesign/1.png" alt="" />
      {data.map((item) =>
      (<article key={item.id} className='project2_item'>
        <section className='project2_sub'>
          <h2>痛點分析</h2>
          <h3>Pain Point</h3>
        </section>
        <section className='project2_cnt'>
          <ul className='title'>
            <h4>Before</h4>
            <h5>{item.subName}</h5>
            <img src={item.BeforeImg} alt="" />
          </ul>
          <ul className='cnt'>
            <li>
              <h4>{item.b1.title}</h4>
              <p>{item.b1.p}</p>
            </li>
            <li>
              <h4>{item.b2.title}</h4>
              <p>{item.b2.p}</p>
            </li>
            <li>
              <h4>{item.b3.title}</h4>
              <p>{item.b3.p}</p>
            </li>
            <li>
              <h4>{item.b4.title}</h4>
              <p>{item.b4.p}</p>
            </li>

          </ul>
        </section>
        <section className='project2_cnt'>
          <ul className='title'>
            <h4>After</h4>
            <h5>{item.subName}</h5>
            <img src={item.AfterImg} alt="" />
          </ul>
          <ul className='cnt'>
            <li>
              <h4>{item.a1.title}</h4>
              <p>{item.a1.p}</p>
            </li>
            <li>
              <h4>{item.a2.title}</h4>
              <p>{item.a2.p}</p>
            </li>
            <li>
              <h4>{item.a3.title}</h4>
              <p>{item.a3.p}</p>
            </li>
            <li>
              <h4>{item.a4.title}</h4>
              <p>{item.a4.p}</p>
            </li>
          </ul>
        </section>
        <span className='line--bt'></span>
      </article>)
      )}
    </main>
  )
}

export default App02
