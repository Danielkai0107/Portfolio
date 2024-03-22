//APP
import ai_m from "../images/App/AI/main.png";
import ai_01 from "../images/App/AI/1.png";
import ai_02 from "../images/App/AI/2.png";

import kids_m from "../images/App/Kids/main.png";
import kids_01 from "../images/App/Kids/1.png";
import kids_02 from "../images/App/Kids/2.png";

import dev_m from "../images/App/Dev/main.png";
import dev_01 from "../images/App/Dev/1.png";
import dev_02 from "../images/App/Dev/2.png";

import pay_m from "../images/App/Pay/main.png";
import pay_01 from "../images/App/Pay/1.png";
import pay_02 from "../images/App/Pay/2.png";


//Web
import w_m from "../images/Web/Weather/main.jpg";
import w_01 from "../images/Web/Weather/1.jpg";
import w_02 from "../images/Web/Weather/2.jpg";

import mo_m from "../images/Web/Movie/main.jpg";
import mo_01 from "../images/Web/Movie/1.png";
import mo_02 from "../images/Web/Movie/2.png";

//Graphic

import f_m from "../images/Graphic/Fisher/main.jpg";
import f_01 from "../images/Graphic/Fisher/1.png";
import f_02 from "../images/Graphic/Fisher/2.png";

import z_m from "../images/Graphic/Zebulun/main.jpg";
import z_01 from "../images/Graphic/Zebulun/1.png";
import z_02 from "../images/Graphic/Zebulun/2.png";

import y_m from "../images/Graphic/Yolo/main.jpg";
import y_01 from "../images/Graphic/Yolo/1.png";
import y_02 from "../images/Graphic/Yolo/2.png";

import p_m from "../images/Graphic/Poster/main.jpg";
import p_01 from "../images/Graphic/Poster/1.png";
import p_02 from "../images/Graphic/Poster/2.png";

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
          figma: "https://www.figma.com/file/HMcLsWaecjpFvjU8bJjCn7/Device-Check-UI?type=design&node-id=0%3A1&mode=design&t=0RHG84KgyX0CECcY-1",
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
    category: "Web",
    items: [
      {
        id: 1,
        title: "Movie Finder",
        info: "ReactJS RWD API",
        URL: {
          figma: "https://www.figma.com/file/akpQOTlVUP3IDUDgNt2Bv9/MovieFinder?type=design&node-id=460%3A401&mode=design&t=mU4KEwJsjFbrJVcU-1",
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
          figma: "https://www.figma.com/file/DkAa0lG987eAv43Vwft8BK/Weather-Forecast?type=design&node-id=0%3A1&mode=design&t=TNvFB8P0HOIsPAqG-1",
          github: "https://github.com/Danielkai0107/Weather-API-UI.git",
          web: "https://weather-api-ui.vercel.app/",
        },
        images: [w_m, w_01, w_02],
      },
      // {
      //   id: 3,
      //   title: "WebPage Layout",
      //   info: "HTML CSS JavaScript",
      //   URL: {
      //     figma: null,
      //     github: null,
      //     web: null,
      //   },
      //   images: [app_kids_01, app_kids_02, app_kids_03],
      // }
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
