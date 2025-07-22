import { analytics } from "../firebase/config";
import { logEvent } from "firebase/analytics";

class AnalyticsService {
  constructor() {
    this.sessionStartTime = Date.now();
    this.pageStartTime = Date.now();
    this.currentPage = null;
    this.currentProject = null;
    this.projectStartTime = null;

    // 本地統計數據 (用於 Admin 面板顯示)
    this.localStats = this.loadLocalStats();

    // 初始化會話
    this.initializeSession();
  }

  // 載入本地統計數據
  loadLocalStats() {
    const saved = localStorage.getItem("portfolio_analytics_stats");
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      totalPageViews: 0,
      projectViews: {}, // { projectId: { title: string, views: number, totalTime: number } }
      externalClicks: {
        figma: 0,
        github: 0,
        web: 0,
      },
      lastUpdated: Date.now(),
    };
  }

  // 保存本地統計數據
  saveLocalStats() {
    this.localStats.lastUpdated = Date.now();
    localStorage.setItem(
      "portfolio_analytics_stats",
      JSON.stringify(this.localStats)
    );
  }

  // 初始化會話
  initializeSession() {
    try {
      logEvent(analytics, "session_start", {
        timestamp: new Date().toISOString(),
        user_agent: navigator.userAgent,
        screen_resolution: `${window.screen.width}x${window.screen.height}`,
        language: navigator.language,
      });

      console.log("📊 Analytics Session Started");
    } catch (error) {
      console.error("Analytics initialization error:", error);
    }
  }

  // 追蹤頁面瀏覽
  trackPageView(pageName, pageTitle = "") {
    try {
      // Firebase Analytics 追蹤
      logEvent(analytics, "page_view", {
        page_title: pageTitle || pageName,
        page_location: window.location.href,
        page_path: window.location.pathname,
        page_name: pageName,
        timestamp: new Date().toISOString(),
      });

      // 更新本地統計
      this.localStats.totalPageViews++;
      this.saveLocalStats();

      this.currentPage = pageName;
      this.pageStartTime = Date.now();

      console.log(
        `📊 Page viewed: ${pageName} (總瀏覽: ${this.localStats.totalPageViews})`
      );
    } catch (error) {
      console.error("Page view tracking error:", error);
    }
  }

  // 追蹤項目瀏覽
  trackProjectView(projectData) {
    try {
      const projectId = projectData.id;
      const projectTitle = projectData.title;

      // Firebase Analytics 追蹤
      logEvent(analytics, "project_view", {
        project_id: projectId,
        project_title: projectTitle,
        project_category: projectData.category || "unknown",
        timestamp: new Date().toISOString(),
        has_figma: !!projectData.URL?.figma,
        has_github: !!projectData.URL?.github,
        has_web: !!projectData.URL?.web,
      });

      // 更新本地統計
      if (!this.localStats.projectViews[projectId]) {
        this.localStats.projectViews[projectId] = {
          title: projectTitle,
          views: 0,
          totalTime: 0,
        };
      }
      this.localStats.projectViews[projectId].views++;
      this.saveLocalStats();

      // 記錄當前項目和開始時間
      this.currentProject = { id: projectId, title: projectTitle };
      this.projectStartTime = Date.now();

      console.log(
        `📊 Project viewed: ${projectTitle} (瀏覽次數: ${this.localStats.projectViews[projectId].views})`
      );
    } catch (error) {
      console.error("Project view tracking error:", error);
    }
  }

  // 追蹤項目停留時間
  trackProjectTimeSpent(projectId, projectTitle, timeSpent) {
    try {
      const timeSpentSeconds = Math.round(timeSpent / 1000);

      if (timeSpentSeconds > 2) {
        // Firebase Analytics 追蹤
        logEvent(analytics, "project_time_spent", {
          project_id: projectId,
          project_title: projectTitle,
          time_spent_seconds: timeSpentSeconds,
          timestamp: new Date().toISOString(),
        });

        // 更新本地統計
        if (this.localStats.projectViews[projectId]) {
          this.localStats.projectViews[projectId].totalTime += timeSpentSeconds;
          this.saveLocalStats();
        }

        console.log(
          `📊 Project time spent: ${timeSpentSeconds}s on ${projectTitle}`
        );
      }
    } catch (error) {
      console.error("Project time spent tracking error:", error);
    }
  }

  // 追蹤外部連結點擊
  trackExternalLinkClick(projectId, linkType, url = "") {
    try {
      // Firebase Analytics 追蹤
      logEvent(analytics, "external_link_click", {
        project_id: projectId,
        link_type: linkType, // 'figma', 'github', 'web'
        target_url: url,
        timestamp: new Date().toISOString(),
      });

      // 更新本地統計
      if (this.localStats.externalClicks[linkType] !== undefined) {
        this.localStats.externalClicks[linkType]++;
        this.saveLocalStats();
      }

      console.log(
        `📊 External link clicked: ${linkType} (總點擊: ${this.localStats.externalClicks[linkType]})`
      );
    } catch (error) {
      console.error("External link tracking error:", error);
    }
  }

  // 當項目切換時調用
  onProjectChange() {
    if (this.currentProject && this.projectStartTime) {
      const timeSpent = Date.now() - this.projectStartTime;
      this.trackProjectTimeSpent(
        this.currentProject.id,
        this.currentProject.title,
        timeSpent
      );
    }
  }

  // 獲取本地統計數據 (用於 Admin 面板)
  getLocalStats() {
    return {
      ...this.localStats,
      // 計算最受歡迎的項目
      mostPopularProjects: Object.entries(this.localStats.projectViews)
        .map(([id, data]) => ({
          id,
          title: data.title,
          views: data.views,
          averageTime:
            data.views > 0 ? Math.round(data.totalTime / data.views) : 0,
        }))
        .sort((a, b) => b.views - a.views)
        .slice(0, 10),

      // 計算停留時間最長的項目
      longestViewProjects: Object.entries(this.localStats.projectViews)
        .map(([id, data]) => ({
          id,
          title: data.title,
          views: data.views,
          averageTime:
            data.views > 0 ? Math.round(data.totalTime / data.views) : 0,
        }))
        .sort((a, b) => b.averageTime - a.averageTime)
        .slice(0, 10),
    };
  }

  // 重置統計數據
  resetStats() {
    this.localStats = {
      totalPageViews: 0,
      projectViews: {},
      externalClicks: {
        figma: 0,
        github: 0,
        web: 0,
      },
      lastUpdated: Date.now(),
    };
    this.saveLocalStats();
    console.log("📊 Analytics stats reset");
  }
}

// 創建單例實例
const analyticsService = new AnalyticsService();

// 監聽頁面卸載事件
window.addEventListener("beforeunload", () => {
  analyticsService.onProjectChange();
});

// 監聽頁面可見性變化
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    analyticsService.onProjectChange();
  } else if (!document.hidden && analyticsService.currentProject) {
    analyticsService.projectStartTime = Date.now();
  }
});

export default analyticsService;
