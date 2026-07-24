import { useEffect, useRef, useState } from "react";
import PlanetScene from "./PlanetScene";

const routes = ["/", "/about", "/projects", "/contact"] as const;
const labels = ["首页", "关于", "业务", "联系"];

type DetailContent = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
};

function DetailOverlay({
  detail,
  onClose,
}: {
  detail: DetailContent | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!detail) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [detail, onClose]);

  if (!detail) return null;

  return (
    <div
      className="detail-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="detail-panel"
        role="dialog"
        aria-modal="true"
        aria-label={detail.title}
      >
        <header>
          <span>{detail.eyebrow}</span>
          <button type="button" onClick={onClose} aria-label="关闭详情">
            <i />
          </button>
        </header>
        <div className="detail-copy">
          <h2>{detail.title}</h2>
          {detail.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>
    </div>
  );
}

function HomePanel() {
  const [showDetail, setShowDetail] = useState(false);
  const introduction =
    "依托大阪本地区位资源与深耕中日市场的行业经验，我们打通货源采购、报关清关、国际物流、线上电商销售、售后保障全链路服务，助力中国优质商品出海日本、日本精工产品引进中国，持续为双边中小企业赋能，打造靠谱、专业、可持续的中日跨境贸易合作平台。";

  return (
    <section className="scene scene-home">
      <div className="scene-media media-home" aria-hidden="true"><PlanetScene /></div>
      <header className="topline">
        <span>KUMOHIRO</span>
        <span>OSAKA / SHANGHAI</span>
      </header>
      <div className="page-content home-content">
        <div className="page-heading">
          <p className="kicker">中日跨境贸易 / 大阪</p>
          <h1>
            链接中日商贸
            <br />
            深耕大阪跨境
            <br />
            一站式进出口与电商服务
          </h1>
        </div>
        <div className="home-intro">
          <span className="section-index">KUMOHIRO / 00</span>
          <p>{introduction}</p>
          <button className="text-action" type="button" onClick={() => setShowDetail(true)}>
            查看完整介绍 <span>↗</span>
          </button>
        </div>
      </div>
      <DetailOverlay
        detail={
          showDetail
            ? {
                eyebrow: "首页 / 企业定位",
                title: "链接中日商贸，深耕大阪跨境",
                paragraphs: [introduction],
              }
            : null
        }
        onClose={() => setShowDetail(false)}
      />
    </section>
  );
}

const aboutParagraphs = [
  {
    title: "企业定位",
    summary: "坐落于日本大阪，立足关西商贸腹地，辐射全日本及中国全域市场。",
    body: "本商事企业坐落于日本大阪市，是一家集中日进出口贸易、跨境电子商务、国际供应链服务、双边商贸合作于一体的综合性外贸企业。企业立足关西核心商贸腹地，辐射全日本及中国全域市场，专注深耕中日跨境贸易赛道，专注搭建高效互通的双边商贸渠道。",
  },
  {
    title: "经营理念",
    summary: "以信立商、以质立业、互利共生、长期共赢。",
    body: "自运营以来，企业始终坚守「以信立商、以质立业、互利共生、长期共赢」的经营理念，摒弃传统贸易繁琐流程，结合现代化电商运营模式，融合传统外贸的稳定性与跨境电商的灵活性，打造适配新时代的中日贸易服务体系。",
  },
  {
    title: "渠道与能力",
    summary: "成熟货源、标准化进出口流程、国际物流与专业双语服务团队。",
    body: "经过长期市场深耕，企业已建立成熟的中日货源渠道、标准化的进出口作业流程、完善的国际物流配套以及专业的双语运营服务团队，积累了海量中日上下游合作资源，服务覆盖生产工厂、贸易公司、跨境电商卖家、实体商户等各类客户群体，在中日跨境贸易领域树立了良好的行业口碑与品牌信誉。",
  },
];

function AboutPanel() {
  const [activeDetail, setActiveDetail] = useState<number | null>(null);

  return (
    <section className="scene scene-about">
      <div className="scene-media media-about" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <header className="topline">
        <span>KUMOHIRO</span>
        <span>关于 / 01</span>
      </header>
      <div className="page-content about-content">
        <div className="page-heading compact-heading">
          <p className="kicker">企业概况</p>
          <h1>
            立足大阪，
            <br />
            搭建高效互通的
            <br />
            中日商贸渠道。
          </h1>
        </div>
        <div className="about-grid">
          {aboutParagraphs.map((item, index) => (
            <button
              className="copy-card interactive-card"
              type="button"
              key={item.title}
              onClick={() => setActiveDetail(index)}
            >
              <span>0{index + 1}</span>
              <div>
                <h2>{item.title}</h2>
                <p>{item.summary}</p>
              </div>
              <b>阅读详情 ↗</b>
            </button>
          ))}
        </div>
      </div>
      <DetailOverlay
        detail={
          activeDetail === null
            ? null
            : {
                eyebrow: `关于 / 0${activeDetail + 1}`,
                title: aboutParagraphs[activeDetail].title,
                paragraphs: [aboutParagraphs[activeDetail].body],
              }
        }
        onClose={() => setActiveDetail(null)}
      />
    </section>
  );
}

const services = [
  {
    title: "中日双向进出口贸易业务",
    summary: "双向大宗货物进出口，全流程代办，支持长期供货与定制采购。",
    body: [
      "作为核心主营业务，承接中国→日本、日本→中国双向大宗货物进出口业务，涵盖货物采购、验货质检、进出口备案、海关报关、关税申报、清关放行、国内配送全流程代办服务。",
      "业务覆盖日用家居、轻工制品、文创礼品、包装制品、正规预包装食品、美妆日用品、工业辅助材料等常规合规品类。可为国内工厂提供日本市场出口渠道，为日本本土商家对接中国优质源头货源，支持批量订货、长期供货、定制化采购，全程合规操作，单证齐全、可溯源。",
    ],
  },
  {
    title: "中日跨境电子商务业务",
    summary: "双向跨境零售与批发，并为中小商家提供轻量化电商配套。",
    body: [
      "依托自主线上电商平台及主流跨境渠道，开展中日双向跨境电商零售与批发业务。面向日本消费者销售中国高性价比优质国货；面向中国市场引进日本本土精工好物与特色商品。",
      "同时为中日中小商家提供电商代运营、货源一件代发、货源对接、产品上架优化、订单履约、售后对接等配套服务，降低入局门槛，无需囤货、无需对接复杂物流报关，轻松开展跨境生意。",
    ],
  },
  {
    title: "国际物流与仓储配套服务",
    summary: "整合海运、空运、国际快递与大阪本地仓储转运资源。",
    body: [
      "依托大阪关西物流枢纽优势，整合海运、空运、国际快递、专线物流等多元渠道，提供中日双向国际物流代办服务，涵盖整柜运输、拼箱散货、小件快递、电商专线等多种物流方案。",
      "同时提供大阪本地仓储分拣、货物暂存、打包贴标、集货转运服务，实现货物集中管理与高效周转，有效降低物流仓储成本，保障货物时效稳定、全程可追踪。",
    ],
  },
  {
    title: "中日商贸对接与咨询服务",
    summary: "市场、政策、合规与上下游资源对接，为企业定制合作方案。",
    body: [
      "凭借多年中日市场深耕经验，为双边企业提供市场调研、行业政策解读、贸易合规咨询、上下游资源对接、合作方案定制等增值服务。",
      "针对初次开展中日贸易的企业，提供全程流程指导，规避关税、报关、合规等常见贸易风险，量身定制进出口与跨境电商合作方案，助力企业快速开拓海外市场。",
    ],
  },
];

function ProjectsPanel() {
  const [activeDetail, setActiveDetail] = useState<number | null>(null);

  return (
    <section className="scene scene-projects">
      <div className="scene-media media-projects" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <header className="topline">
        <span>KUMOHIRO</span>
        <span>业务 / 02</span>
      </header>
      <div className="page-content services-content">
        <div className="services-intro">
          <p className="kicker">核心业务</p>
          <h1>中日双向贸易<br />与跨境电子商务</h1>
          <p>
            本公司核心业务围绕中日双向进出口贸易与跨境电子商务两大核心展开，
            覆盖 B2B 企业贸易、B2C 跨境零售、供应链配套、贸易增值服务四大板块，
            全流程覆盖货源、报关、物流、销售、售后全链条。
          </p>
        </div>
        <div className="services-grid">
          {services.map((service, index) => (
            <button
              className="service-card interactive-card"
              type="button"
              key={service.title}
              onClick={() => setActiveDetail(index)}
            >
              <header>
                <span>0{index + 1}</span>
                <h2>{service.title}</h2>
              </header>
              <p>{service.summary}</p>
              <b>查看完整服务内容 ↗</b>
            </button>
          ))}
        </div>
      </div>
      <DetailOverlay
        detail={
          activeDetail === null
            ? null
            : {
                eyebrow: `核心业务 / 0${activeDetail + 1}`,
                title: services[activeDetail].title,
                paragraphs: services[activeDetail].body,
              }
        }
        onClose={() => setActiveDetail(null)}
      />
    </section>
  );
}

function ContactPanel() {
  return (
    <section className="scene scene-contact">
      <div className="scene-media media-contact" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <header className="topline">
        <span>KUMOHIRO</span>
        <span>联系 / 03</span>
      </header>
      <div className="page-content contact-content">
        <div className="contact-title">
          <p className="kicker">联系 KUMOHIRO</p>
          <h1>雲尋株式会社</h1>
          <span>Kumohiro Co., Ltd.</span>
        </div>
        <div className="contact-details">
          <section>
            <span className="detail-label">本店所在地 / 大阪本店</span>
            <p>〒533-0033</p>
            <p>大阪市淀川区西宫原2-6-16<br />432室 新大阪コーポビアネーズ</p>
          </section>
          <section>
            <span className="detail-label">联系方式</span>
            <p>服务热线：—</p>
            <a href="mailto:yungoy@gmail.com">yungoy@gmail.com</a>
            <p>周一至周五 09:00–18:00</p>
          </section>
          <section className="contact-services">
            <span className="detail-label">业务范围</span>
            <p>中日进出口贸易 / 跨境电商运营 / 国际物流代办 / 商贸资源对接</p>
          </section>
          <section className="contact-note">
            <span className="detail-label">合作洽谈</span>
            <p>如需咨询业务详情、索取企业资料与报价方案，可通过邮箱留言。</p>
            <a className="letter-link" href="mailto:yungoy@gmail.com">发送邮件</a>
          </section>
        </div>
      </div>
    </section>
  );
}

const panels = [HomePanel, AboutPanel, ProjectsPanel, ContactPanel];

export function Experience({ initialIndex = 0 }: { initialIndex?: number }) {
  const [active, setActive] = useState(initialIndex);
  const [previous, setPrevious] = useState<number | null>(null);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const [open, setOpen] = useState(false);
  const timers = useRef<number[]>([]);
  const activeRef = useRef(initialIndex);
  const rootRef = useRef<HTMLElement>(null);
  const pointerFrame = useRef<number | null>(null);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const onPop = () => {
      const index = Math.max(
        0,
        routes.indexOf(window.location.pathname as (typeof routes)[number]),
      );
      if (index !== activeRef.current) changeScene(index, false);
    };
    window.addEventListener("popstate", onPop);
    return () => {
      window.removeEventListener("popstate", onPop);
      timers.current.forEach(clearTimeout);
    };
  }, []);

  function changeScene(target: number, updateHistory = true) {
    const current = activeRef.current;
    if (target === current) {
      setOpen(false);
      return;
    }
    const nextDirection = target > current ? "forward" : "backward";
    setOpen(false);
    timers.current.push(
      window.setTimeout(() => {
        setDirection(nextDirection);
        setPrevious(current);
        setActive(target);
        activeRef.current = target;
        if (updateHistory) window.history.pushState({}, "", routes[target]);
        timers.current.push(window.setTimeout(() => setPrevious(null), 920));
      }, 260),
    );
  }

  function moveBackground(event: React.PointerEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    if (pointerFrame.current) cancelAnimationFrame(pointerFrame.current);
    pointerFrame.current = requestAnimationFrame(() => {
      rootRef.current?.style.setProperty("--mx", x.toFixed(3));
      rootRef.current?.style.setProperty("--my", y.toFixed(3));
    });
  }

  function resetBackground() {
    rootRef.current?.style.setProperty("--mx", "0");
    rootRef.current?.style.setProperty("--my", "0");
  }

  return (
    <main
      ref={rootRef}
      className="experience"
      onPointerMove={moveBackground}
      onPointerLeave={resetBackground}
    >
      {panels.map((Panel, index) => {
        const isActive = index === active;
        const isPrevious = index === previous;
        const className =
          isActive && previous !== null
            ? `scene-wrap enter-${direction}`
            : isPrevious
              ? `scene-wrap exit-${direction}`
              : `scene-wrap${isActive ? " current" : ""}`;
        return (
          <div className={className} key={index} aria-hidden={!isActive}>
            <Panel />
          </div>
        );
      })}
      <div className={`floating-menu ${open ? "is-open" : ""}`}>
        <div className="menu-side menu-left">
          {labels.slice(0, 2).map((label, index) => (
            <button
              key={label}
              className={active === index ? "active" : ""}
              onClick={() => changeScene(index)}
              style={{ "--order": index } as React.CSSProperties}
            >
              <span>{label}</span>
              <span>{label}</span>
            </button>
          ))}
        </div>
        <button
          className="menu-toggle"
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? "关闭导航" : "打开导航"}
        >
          <span className="explore-label">菜单</span>
          <span className="close-mark" />
        </button>
        <div className="menu-side menu-right">
          {labels.slice(2).map((label, index) => (
            <button
              key={label}
              className={active === index + 2 ? "active" : ""}
              onClick={() => changeScene(index + 2)}
              style={{ "--order": index } as React.CSSProperties}
            >
              <span>{label}</span>
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
