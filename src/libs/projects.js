const ai_m = "/images/App/AI/main.png";
const ai_01 = "/images/App/AI/1.png";
const ai_02 = "/images/App/AI/2.png";

const kids_m = "/images/App/Kids/main.png";
const kids_01 = "/images/App/Kids/1.png";
const kids_02 = "/images/App/Kids/2.png";

const dev_m = "/images/App/Dev/main.png";
const dev_01 = "/images/App/Dev/1.png";
const dev_02 = "/images/App/Dev/2.png";

const pay_m = "/images/App/Pay/main.png";
const pay_01 = "/images/App/Pay/1.png";
const pay_02 = "/images/App/Pay/2.png";

//Web
const w_m = "/images/Web/Weather/main.jpg";
const w_01 = "/images/Web/Weather/1.jpg";
const w_02 = "/images/Web/Weather/2.jpg";

const mo_m = "/images/Web/Movie/main.jpg";
const mo_01 = "/images/Web/Movie/1.png";
const mo_02 = "/images/Web/Movie/2.png";

const l1_m = "/images/Web/Land01/main.jpg";
const l1_01 = "/images/Web/Land01/main.jpg";
const l1_02 = "/images/Web/Land01/main.jpg";

const l2_m = "/images/Web/Land02/main.jpg";
const l2_01 = "/images/Web/Land02/main.jpg";
const l2_02 = "/images/Web/Land02/main.jpg";

const l3_m = "/images/Web/Land03/main.jpg";
const l3_01 = "/images/Web/Land03/main.jpg";
const l3_02 = "/images/Web/Land03/main.jpg";

//Graphic
const f_m = "/images/Graphic/Fisher/main.jpg";
const f_01 = "/images/Graphic/Fisher/1.png";
const f_02 = "/images/Graphic/Fisher/2.png";

const z_m = "/images/Graphic/Zebulun/main.jpg";
const z_01 = "/images/Graphic/Zebulun/1.png";
const z_02 = "/images/Graphic/Zebulun/2.png";

const y_m = "/images/Graphic/Yolo/main.jpg";
const y_01 = "/images/Graphic/Yolo/1.png";
const y_02 = "/images/Graphic/Yolo/2.png";

const p_m = "/images/Graphic/Poster/main.jpg";
const p_01 = "/images/Graphic/Poster/1.png";
const p_02 = "/images/Graphic/Poster/2.png";

export const projects = [
  {
    id: 1,
    category: "APP",
    items: [
      {
        id: 1,
        title: "AI English",
        info: "UI Design",
        URL: {
          figma: null,
          github: null,
          web: null,
        },
        images: [ai_m, ai_01, ai_02],
      },
      {
        id: 2,
        title: "Device Check UI",
        info: "UI Redesign",
        URL: {
          figma:
            "https://www.figma.com/file/HMcLsWaecjpFvjU8bJjCn7/Device-Check-UI?type=design&node-id=0%3A1&mode=design&t=0RHG84KgyX0CECcY-1",
          github: null,
          web: null,
        },
        images: [dev_m, dev_01, dev_02],
      },
      {
        id: 3,
        title: "Payment UI",
        info: "UI Design",
        URL: {
          figma: null,
          github: null,
          web: null,
        },
        images: [pay_m, pay_01, pay_02],
      },
      {
        id: 4,
        title: "Kids English",
        info: "UI Design",
        URL: {
          figma: null,
          github: null,
          web: null,
        },
        images: [kids_m, kids_01, kids_02],
      },
    ],
  },
  {
    id: 2,
    category: "WebPage",
    items: [
      {
        id: 1,
        title: "Movie Finder",
        info: "ReactJS RWD API",
        URL: {
          figma:
            "https://www.figma.com/file/akpQOTlVUP3IDUDgNt2Bv9/MovieFinder?type=design&node-id=460%3A401&mode=design&t=mU4KEwJsjFbrJVcU-1",
          github: "https://github.com/Danielkai0107/movie-final.git",
          web: "https://danielkai0107.github.io/movie-final/",
        },
        images: [mo_m, mo_01, mo_02],
      },
      {
        id: 2,
        title: "Weather Forecast",
        info: "ReactJS API",
        URL: {
          figma:
            "https://www.figma.com/file/DkAa0lG987eAv43Vwft8BK/Weather-Forecast?type=design&node-id=0%3A1&mode=design&t=TNvFB8P0HOIsPAqG-1",
          github: "https://github.com/Danielkai0107/Weather-API-UI.git",
          web: "https://weather-api-ui.vercel.app/",
        },
        images: [w_m, w_01, w_02],
      },
      {
        id: 3,
        title: "Landing Page",
        info: "Figma Design",
        URL: {
          figma:
            "https://www.figma.com/file/G6ns5Ic06hAcAUb5I0evs8/Landing?type=design&node-id=0%3A1&mode=design&t=fCpSKatzOnWKmTkg-1",
          github: null,
          web: null,
        },
        images: [l1_m, l1_01, l1_02],
      },
      {
        id: 4,
        title: "Landing Page",
        info: "Figma Design",
        URL: {
          figma:
            "https://www.figma.com/file/G6ns5Ic06hAcAUb5I0evs8/Landing?type=design&node-id=0%3A1&mode=design&t=fCpSKatzOnWKmTkg-1",
          github: null,
          web: "https://danielkai0107.github.io/Practice-copycat-03/",
        },
        images: [l2_m, l2_01, l2_02],
      },
      {
        id: 5,
        title: "Landing Page",
        info: "Figma Design",
        URL: {
          figma:
            "https://www.figma.com/file/G6ns5Ic06hAcAUb5I0evs8/Landing?type=design&node-id=0%3A1&mode=design&t=fCpSKatzOnWKmTkg-1",
          github: null,
          web: null,
        },
        images: [l3_m, l3_01, l3_02],
      },
    ],
  },
  {
    id: 3,
    category: "Graphic",
    items: [
      {
        id: 1,
        title: "FISHER WHARF",
        info: "Fisher Wharf",
        URL: {
          figma: null,
          github: null,
          web: null,
        },
        images: [f_m, f_01, f_02],
      },
      {
        id: 2,
        title: "ZEBULUN",
        info: "ZEBULUN",
        URL: {
          figma: null,
          github: null,
          web: null,
        },
        images: [z_m, z_01, z_02],
      },
      {
        id: 3,
        title: "YOLO SPORT",
        info: "YOLO SPORT",
        URL: {
          figma: null,
          github: null,
          web: null,
        },
        images: [y_m, y_01, y_02],
      },
      {
        id: 4,
        title: "Poster Design",
        info: "Poster Design",
        URL: {
          figma: null,
          github: null,
          web: null,
        },
        images: [p_m, p_01, p_02],
      },
    ],
  },
];
